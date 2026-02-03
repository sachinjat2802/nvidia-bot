import express from 'express';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { loadConfig, getAvailableModels } from './config';
import { NVIDIAClient } from './nvidia-client';
import { ChatSession } from './chat';
import { extractTextFromFile, isImageFile, UploadedFile } from './file-processor';
import { WorkflowEngine } from './workflow-engine';
import { WorkflowDefinition } from './workflow';
import { ChatHistoryManager } from './chat-history';
import {
    RAGManager,
    SimpleVectorStore,
    FileSystemDataSource,
    MockSQLDataSource,
    MockCMSDataSource,
    PineconeVectorStore,
    PostgresDataSource
} from './rag';
import { EventBus, Scheduler, Trigger } from './events';
import { ImageGenerationService } from './image-generation/ImageGenerationService';
import {
    GenerationParams,
    GeneratedImage,
    ImageVariationParams,
    ImageEditParams,
    OutpaintParams,
    PromptRefinementParams,
    StylePreset,
    ImageFormat
} from './image-generation/types';

// Indian name aliases for AI models based on their specializations
const MODEL_ALIASES: Record<string, { alias: string; description: string }> = {

};

// Helper function to get model alias
function getModelAlias(modelId: string): { alias: string; description: string } | null {
    return MODEL_ALIASES[modelId] || null;
}

const config = loadConfig();
const client = new NVIDIAClient(config);

// Ensure data directories exist
const PROJECT_ROOT = process.cwd();
const WORKFLOW_DATA_DIR = path.join(PROJECT_ROOT, 'workflow-data');
const GENERATED_IMAGES_DIR = path.join(PROJECT_ROOT, 'generated-images');
const UPLOADS_DIR = path.join(PROJECT_ROOT, 'uploads');
const PUBLIC_DIR = fs.existsSync(path.join(PROJECT_ROOT, 'client', 'dist'))
    ? path.join(PROJECT_ROOT, 'client', 'dist')
    : fs.existsSync(path.join(PROJECT_ROOT, 'src', 'public'))
        ? path.join(PROJECT_ROOT, 'src', 'public')
        : path.join(PROJECT_ROOT, 'public');

[WORKFLOW_DATA_DIR, GENERATED_IMAGES_DIR, UPLOADS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const workflowEngine = new WorkflowEngine(client, {
    enablePersistence: true,
    persistenceDir: WORKFLOW_DATA_DIR,
    onStepStart: (execution, step) => {
        console.log(`[Workflow ${execution.id}] Step ${step.id} started`);
    },
    onStepComplete: (execution, step, result) => {
        console.log(`[Workflow ${execution.id}] Step ${step.id} completed in ${result.durationMs}ms`);
    },
    onStepFailed: (execution, step, result) => {
        console.error(`[Workflow ${execution.id}] Step ${step.id} failed: ${result.error}`);
    },
    onWorkflowComplete: (execution) => {
        console.log(`[Workflow ${execution.id}] Completed`);
    },
    onWorkflowFailed: (execution) => {
        console.error(`[Workflow ${execution.id}] Failed: ${execution.error}`);
    }
});

// Initialize RAG System
let vectorStore;
if (process.env.PINECONE_API_KEY && process.env.PINECONE_INDEX) {
    console.log('Using Pinecone Vector Store');
    vectorStore = new PineconeVectorStore(process.env.PINECONE_API_KEY, process.env.PINECONE_INDEX);
} else {
    console.log('Using In-Memory Simple Vector Store (Mock)');
    vectorStore = new SimpleVectorStore();
}

const ragManager = new RAGManager(vectorStore);

// Register Data Sources
// 1. File System Source (scanning the examples directory for demo purposes)
ragManager.registerSource(new FileSystemDataSource(path.join(__dirname, '..', 'examples')));

// 2. Mock SQL Database
ragManager.registerSource(new MockSQLDataSource('postgres://user:pass@localhost:5432/enterprise_data'));

// 3. Mock CMS (e.g. Contentful, Strapi)
ragManager.registerSource(new MockCMSDataSource('https://api.cms.example.com', 'api-key-123'));

// 4. Real PostgreSQL (if configured)
if (process.env.PG_HOST) {
    ragManager.registerSource(new PostgresDataSource({
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        port: Number(process.env.PG_PORT) || 5432,
        tableName: 'products', // Example table
        columns: {
            id: 'id',
            content: 'description',
            metadata: ['name', 'price']
        }
    }));
}

// Initialize Image Generation Service
const imageService = new ImageGenerationService(config, GENERATED_IMAGES_DIR);

const app = express();
const PORT = process.env.PORT || 3001;

// Workflow Registry (Simple In-Memory Store for Demo)
// In production, use DB
const workflowRegistry = new Map<string, WorkflowDefinition>();

// Initialize Event System
const eventBus = new EventBus(workflowEngine);
const scheduler = new Scheduler(eventBus);

// Listen for workflow triggers
eventBus.on('workflow_trigger', async ({ workflowId, event }) => {
    const definition = workflowRegistry.get(workflowId);
    if (definition) {
        console.log(`[WebServer] Automatically starting workflow ${workflowId} due to event`);
        // Inject event payload into workflow context
        const context = {
            event: event.payload,
            triggerSource: event.source
        };
        // Merge event context into definition (create a runtime copy)
        const runtimeDefinition = {
            ...definition,
            globalContext: {
                ...definition.globalContext,
                ...context
            }
        };
        await workflowEngine.execute(runtimeDefinition);
    } else {
        console.warn(`[WebServer] Triggered workflow ${workflowId} not found in registry`);
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use('/generated-images', express.static(GENERATED_IMAGES_DIR));

const uploadDir = UPLOADS_DIR;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'text/plain',
            'text/markdown',
            'application/json',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp'
        ];
        if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith('text/')) {
            cb(null, true);
        } else {
            cb(new Error('File type not allowed'));
        }
    }
});

app.get('/api/models', async (req, res) => {
    try {
        const models = await client.listModels();
        const modelsWithAliases = models.map(model => ({
            id: model,
            alias: getModelAlias(model),
            displayName: getModelAlias(model) ? getModelAlias(model)!.alias : model
        }));
        res.json({
            models: modelsWithAliases,
            default: config.defaultModel,
            defaultAlias: getModelAlias(config.defaultModel)
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/chat', async (req, res) => {
    const { messages, model, stream = true, useRag = true } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    // RAG Integration: Retrieve context if enabled
    if (useRag && messages.length > 0) {
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage.role === 'user') {
            try {
                const retrievedDocs = await ragManager.retrieve(lastUserMessage.content);
                if (retrievedDocs.length > 0) {
                    console.log(`[RAG] Retrieved ${retrievedDocs.length} documents for query: "${lastUserMessage.content.substring(0, 50)}..."`);

                    const contextBlock = `
\n---
RAG CONTEXT (The following information is retrieved from the knowledge base. Use it to answer the user's question if relevant):
${retrievedDocs.map(doc => `[Source: ${doc.source} - ${doc.metadata.filename || doc.metadata.table || 'Unknown'}]\n${doc.content.substring(0, 500)}...`).join('\n\n')}
---
`;
                    // Append context to the last message content
                    lastUserMessage.content += contextBlock;
                }
            } catch (error) {
                console.error('[RAG] Retrieval failed:', error);
            }
        }
    }

    const selectedModel = model || config.defaultModel;

    if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        try {
            await client.chat(
                messages,
                selectedModel,
                (chunk) => {
                    res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
                }
            );
            res.write('data: [DONE]\n\n');
            res.end();
        } catch (error: any) {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    } else {
        try {
            const response = await client.chat(messages, selectedModel);
            res.json({ response, model: selectedModel });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
});

app.get('/api/config', (req, res) => {
    res.json({
        defaultModel: config.defaultModel,
        chatHistoryLimit: config.chatHistoryLimit,
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Workflow Management API

app.post('/api/workflows', async (req, res) => {
    try {
        const definition: WorkflowDefinition = req.body;

        // Validate required fields
        if (!definition.id || !definition.name || !definition.steps) {
            return res.status(400).json({
                error: 'Invalid workflow definition. Required: id, name, steps'
            });
        }

        // Save to registry (so it can be triggered by events)
        workflowRegistry.set(definition.id, definition);

        // If 'executeImmediate' is false, we just save it. Default is true for backward compatibility behavior
        const executeImmediate = req.body.executeImmediate !== false;

        if (executeImmediate) {
            const execution = await workflowEngine.execute(definition);
            res.status(202).json({
                success: true,
                executionId: execution.id,
                status: execution.status,
                workflowId: definition.id,
                message: 'Workflow registered and execution started'
            });
        } else {
            res.json({
                success: true,
                workflowId: definition.id,
                message: 'Workflow registered successfully'
            });
        }
    } catch (error: any) {
        console.error('Workflow execution error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/workflows/:executionId', async (req, res) => {
    try {
        const { executionId } = req.params;
        const execution = workflowEngine.getExecution(executionId);

        if (!execution) {
            return res.status(404).json({ error: 'Execution not found' });
        }

        res.json({
            id: execution.id,
            workflowId: execution.workflowId,
            status: execution.status,
            context: execution.context,
            stepResults: execution.stepResults,
            currentStepId: execution.currentStepId,
            queuedSteps: execution.queuedSteps,
            completedSteps: Array.from(execution.completedSteps),
            startedAt: execution.startedAt,
            completedAt: execution.completedAt,
            error: execution.error
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/workflows', async (req, res) => {
    try {
        const executions = workflowEngine.listExecutions();
        const summary = executions.map(e => ({
            id: e.id,
            workflowId: e.workflowId,
            status: e.status,
            startedAt: e.startedAt,
            completedAt: e.completedAt,
            error: e.error,
            stepCount: e.stepResults.length
        }));
        res.json({ executions: summary });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/workflows/:executionId/stop', async (req, res) => {
    try {
        const { executionId } = req.params;
        const stopped = await workflowEngine.stop(executionId);

        if (!stopped) {
            return res.status(404).json({ error: 'Execution not found' });
        }

        res.json({ success: true, message: 'Workflow stopped' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/workflows/cleanup', async (req, res) => {
    try {
        const { maxAgeDays = 7 } = req.body;
        const cleaned = await workflowEngine.cleanupOldExecutions(maxAgeDays);
        res.json({ success: true, cleanedCount: cleaned });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Event & Trigger APIs

app.post('/api/triggers', (req, res) => {
    try {
        const trigger: Trigger = req.body;
        if (!trigger.id || !trigger.type || !trigger.workflowId) {
            return res.status(400).json({ error: 'Invalid trigger definition' });
        }

        eventBus.registerTrigger(trigger);

        if (trigger.type === 'schedule') {
            scheduler.scheduleTrigger(trigger);
        }

        res.json({ success: true, message: 'Trigger registered' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhooks/:triggerId', (req, res) => {
    try {
        const { triggerId } = req.params;
        const payload = req.body;

        console.log(`[Webhook] Received request for trigger ${triggerId}`);

        eventBus.emitEvent({
            id: `wh_${Date.now()}`,
            type: 'webhook',
            source: triggerId,
            payload: payload,
            timestamp: new Date()
        });

        res.json({ success: true, message: 'Webhook received' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/rag/ingest', async (req, res) => {
    try {
        await ragManager.ingestAll();
        res.json({ success: true, message: 'Data ingestion started/completed successfully.' });
    } catch (error: any) {
        console.error('Ingestion error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/rag/query', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: 'Query is required' });

        const results = await ragManager.retrieve(query);
        res.json({ results });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const extractedText = await extractTextFromFile(req.file.path, req.file.mimetype);

        res.json({
            success: true,
            file: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path
            },
            extractedText: extractedText
        });
    } catch (error: any) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: error.message || 'Failed to process uploaded file'
        });
    }
});

// Serve generated images as static files
const generatedImagesDir = path.join(__dirname, 'generated-images');
if (!fs.existsSync(generatedImagesDir)) {
    fs.mkdirSync(generatedImagesDir, { recursive: true });
}
app.use('/api/images/static', express.static(generatedImagesDir));

// Image Generation API Endpoints

// POST /api/images/generate - Generate new images from text prompt
app.post('/api/images/generate', async (req, res) => {
    try {
        const params: GenerationParams = {
            prompt: req.body.prompt,
            negativePrompt: req.body.negativePrompt,
            style: req.body.style,
            mood: req.body.mood,
            lighting: req.body.lighting,
            cameraAngle: req.body.cameraAngle,
            aspectRatio: req.body.aspectRatio || '1:1',
            width: req.body.width,
            height: req.body.height,
            format: req.body.format || 'png',
            quality: req.body.quality,
            seed: req.body.seed,
            styleLock: req.body.styleLock,
            styleReferenceId: req.body.styleReferenceId,
            referenceImages: req.body.referenceImages,
            steps: req.body.steps,
            cfgScale: req.body.cfgScale,
            batchSize: req.body.batchSize || 1,
        };

        if (!params.prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await imageService.generate(params);

        if (result.success) {
            res.json({
                success: true,
                images: result.images.map(img => ({
                    id: img.id,
                    url: img.url,
                    prompt: img.prompt,
                    width: img.width,
                    height: img.height,
                    format: img.format,
                    seed: img.seed,
                    createdAt: img.createdAt,
                })),
                batchId: result.batchId,
                promptUsed: result.promptUsed,
                cost: result.cost,
                warnings: result.warnings
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Generation failed',
                warnings: result.warnings
            });
        }
    } catch (error: any) {
        console.error('Image generation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/images - List all generated images
app.get('/api/images', async (req, res) => {
    try {
        const images = imageService.listImages();
        res.json({
            images: images.map(img => ({
                id: img.id,
                url: img.url,
                prompt: img.prompt,
                width: img.width,
                height: img.height,
                format: img.format,
                seed: img.seed,
                createdAt: img.createdAt,
                batchId: img.metadata.styleLockedFrom ? undefined : undefined
            })),
            count: images.length
        });
    } catch (error: any) {
        console.error('List images error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/images/:id - Get specific image details
app.get('/api/images/:id', async (req, res) => {
    try {
        const image = imageService.getImage(req.params.id);
        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json({
            id: image.id,
            url: image.url,
            prompt: image.prompt,
            negativePrompt: image.negativePrompt,
            params: image.params,
            width: image.width,
            height: image.height,
            format: image.format,
            seed: image.seed,
            createdAt: image.createdAt,
            metadata: image.metadata
        });
    } catch (error: any) {
        console.error('Get image error:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/images/:id/variations - Create variations of an image
app.post('/api/images/:id/variations', async (req, res) => {
    try {
        const sourceImageId = req.params.id;
        const params: ImageVariationParams = {
            sourceImageId,
            count: req.body.count || 3,
            preserveComposition: req.body.preserveComposition !== false,
            changeDetails: req.body.changeDetails || [],
            keepStyle: req.body.keepStyle !== false,
            seed: req.body.seed,
        };

        const result = await imageService.createVariations(params);

        if (result.success) {
            res.json({
                success: true,
                variations: result.variations.map(img => ({
                    id: img.id,
                    url: img.url,
                    prompt: img.prompt,
                    width: img.width,
                    height: img.height,
                    format: img.format,
                    seed: img.seed,
                    createdAt: img.createdAt,
                })),
                sourceImageId: result.sourceImageId
            });
        } else {
            res.status(500).json({ success: false, error: 'Variation generation failed' });
        }
    } catch (error: any) {
        console.error('Image variation error:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/images/:id/edit - Edit specific region of an image (inpainting)
app.post('/api/images/:id/edit', async (req, res) => {
    try {
        const sourceImageId = req.params.id;
        const params: ImageEditParams = {
            sourceImageId,
            editType: req.body.editType || 'custom',
            region: req.body.region,
            instructions: req.body.instructions,
            negativePrompt: req.body.negativePrompt,
            seed: req.body.seed,
        };

        if (!params.instructions) {
            return res.status(400).json({ error: 'Edit instructions are required' });
        }

        const result = await imageService.editImage(params);

        res.json({
            success: true,
            editedImage: {
                id: result.editedImage.id,
                url: result.editedImage.url,
                prompt: result.editedImage.prompt,
                width: result.editedImage.width,
                height: result.editedImage.height,
                format: result.editedImage.format,
                seed: result.editedImage.seed,
                createdAt: result.editedImage.createdAt,
            },
            sourceImageId: result.sourceImageId,
            editMask: result.editMask
        });
    } catch (error: any) {
        console.error('Image edit error:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/images/:id/outpaint - Extend image beyond original borders
app.post('/api/images/:id/outpaint', async (req, res) => {
    try {
        const sourceImageId = req.params.id;
        const params: OutpaintParams = {
            sourceImageId,
            direction: req.body.direction || 'all',
            expandBy: req.body.expandBy || 256,
            prompt: req.body.prompt,
            negativePrompt: req.body.negativePrompt,
            seed: req.body.seed,
        };

        const result = await imageService.outpaint(params);

        res.json({
            success: true,
            outpaintedImage: {
                id: result.outpaintedImage.id,
                url: result.outpaintedImage.url,
                prompt: result.outpaintedImage.prompt,
                width: result.outpaintedImage.width,
                height: result.outpaintedImage.height,
                format: result.outpaintedImage.format,
                seed: result.outpaintedImage.seed,
                createdAt: result.outpaintedImage.createdAt,
            },
            sourceImageId: result.sourceImageId,
            expandedDimensions: result.expandedDimensions
        });
    } catch (error: any) {
        console.error('Image outpaint error:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST /api/images/refine-prompt - Refine/enhance a text prompt
app.post('/api/images/refine-prompt', async (req, res) => {
    try {
        const params: PromptRefinementParams = {
            originalPrompt: req.body.prompt,
            targetLength: req.body.targetLength,
            enhanceStyle: req.body.enhanceStyle,
            addDetails: req.body.addDetails,
            specifyLighting: req.body.specifyLighting,
            specifyCamera: req.body.specifyCamera,
            customInstructions: req.body.customInstructions,
        };

        if (!params.originalPrompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await imageService.refinePrompt(params);
        res.json(result);
    } catch (error: any) {
        console.error('Prompt refinement error:', error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/images/:id - Delete an image
app.delete('/api/images/:id', async (req, res) => {
    try {
        const deleted = imageService.deleteImage(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.json({ success: true });
    } catch (error: any) {
        console.error('Delete image error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/images/:id/download - Download image in specific format
app.get('/api/images/:id/download', async (req, res) => {
    try {
        const image = imageService.getImage(req.params.id);
        if (!image || !image.localPath) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const format = (req.query.format as ImageFormat) || image.format;
        // In a full implementation, you'd convert the image to the requested format
        // For now, just serve the original file
        res.download(image.localPath, `image.${image.format}`);
    } catch (error: any) {
        console.error('Download image error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET /api/styles/presets - Get available style presets for style locking
app.get('/api/styles/presets', async (req, res) => {
    try {
        const presets: StylePreset[] = [
            {
                id: 'photorealistic',
                name: 'Photorealistic',
                description: 'Ultra-realistic, photographic quality',
                params: { style: 'photorealistic', quality: 90 }
            },
            {
                id: 'cinematic',
                name: 'Cinematic',
                description: 'Movie-like with dramatic lighting',
                params: { style: 'cinematic', lighting: 'dramatic', quality: 95 }
            },
            {
                id: 'anime',
                name: 'Anime',
                description: 'Japanese animation style',
                params: { style: 'anime', quality: 85 }
            },
            {
                id: 'digital-art',
                name: 'Digital Art',
                description: 'Modern digital painting',
                params: { style: 'digital-art', quality: 90 }
            },
            {
                id: 'painting',
                name: 'Painting',
                description: 'Classical painting style',
                params: { style: 'painting', quality: 90 }
            },
            {
                id: '3d-render',
                name: '3D Render',
                description: 'CGI and 3D graphics',
                params: { style: '3d-render', quality: 95 }
            },
            {
                id: 'fantasy',
                name: 'Fantasy',
                description: 'Magical and fantastical elements',
                params: { style: 'fantasy', mood: 'mysterious', lighting: 'dramatic' }
            },
            {
                id: 'retro',
                name: 'Retro',
                description: 'Vintage and nostalgic look',
                params: { style: 'retro', lighting: 'soft' }
            },
        ];
        res.json({ presets });
    } catch (error: any) {
        console.error('Get presets error:', error);
        res.status(500).json({ error: error.message });
    }
});

const chatHistoryManager = new ChatHistoryManager(path.join(__dirname, 'chat-data'));



// Chat History API
app.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await chatHistoryManager.listSessions();
        res.json({ sessions });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/sessions', async (req, res) => {
    try {
        const { title, messages } = req.body;
        const session = await chatHistoryManager.createSession(title || 'New Chat', messages || []);
        res.json(session);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const session = await chatHistoryManager.getSession(id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { messages } = req.body;
        const success = await chatHistoryManager.updateSessionMessages(id, messages);
        if (!success) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const success = await chatHistoryManager.deleteSession(id);
        if (!success) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// RAG API Endpoints
app.post('/api/rag/search', async (req, res) => {
    try {
        const { query, topK = 5 } = req.body;

        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        const results = await ragManager.retrieve(query);
        res.json({ success: true, results });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/rag/index', async (req, res) => {
    try {
        const { documents } = req.body;

        if (!documents || !Array.isArray(documents)) {
            return res.status(400).json({ error: 'Documents array is required' });
        }

        // Index documents directly into vector store
        const docsToAdd: import('./rag/types').Document[] = documents.map((doc: any) => ({
            id: doc.id || `doc_${Date.now()}_${Math.random()}`,
            content: doc.content,
            metadata: doc.metadata || {},
            source: doc.source || 'api',
            createdAt: new Date()
        }));

        await ragManager['vectorStore'].addDocuments(docsToAdd);

        res.json({ success: true, indexed: documents.length });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Image Generation API Endpoints
app.post('/api/image/generate', async (req, res) => {
    try {
        const params: GenerationParams = req.body;

        if (!params.prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const result = await imageService.generate(params);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/image/variations', async (req, res) => {
    try {
        const params: ImageVariationParams = req.body;

        if (!params.sourceImageId) {
            return res.status(400).json({ error: 'Source image ID is required' });
        }

        const result = await imageService.createVariations(params);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/image/edit', async (req, res) => {
    try {
        const params: ImageEditParams = req.body;

        if (!params.sourceImageId) {
            return res.status(400).json({ error: 'Source image ID is required' });
        }

        const result = await imageService.editImage(params);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/image/outpaint', async (req, res) => {
    try {
        const params: OutpaintParams = req.body;

        if (!params.sourceImageId) {
            return res.status(400).json({ error: 'Source image ID is required' });
        }

        const result = await imageService.outpaint(params);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.post('/api/image/refine-prompt', async (req, res) => {
    try {
        const params: PromptRefinementParams = req.body;

        if (!params.originalPrompt) {
            return res.status(400).json({ error: 'Original prompt is required' });
        }

        const result = await imageService.refinePrompt(params);

        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`NVIDIA Bot Web Server running at http://localhost:${PORT}`);
    console.log(`Serving frontend from ${PUBLIC_DIR}`);
});
