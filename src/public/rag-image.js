// Comprehensive Image Generation Module
// Supports: generation, variations, editing, outpainting, prompt refinement, conversational iteration

// ============================================
// State Management
// ============================================
const ImageGenState = {
    currentImages: [],
    selectedImageId: null,
    conversationContext: [],
    styleLockedSeed: null,
    isGenerating: false,
    referenceImageB64: null
};

// ============================================
// DOM Elements
// ============================================
const elements = {
    // Generation
    imagePrompt: document.getElementById('image-prompt'),
    imageNegativePrompt: document.getElementById('image-negative-prompt'),
    generateBtn: document.getElementById('generate-image-btn'),
    imageStyleSelect: document.getElementById('image-style-select'),
    aspectRatioSelect: document.getElementById('aspect-ratio'),
    imageCountSelect: document.getElementById('image-count'),
    imageGallery: document.getElementById('image-gallery'),

    // Refinement
    refinePromptBtn: document.getElementById('refine-prompt-btn'),
    refinedPromptDisplay: document.getElementById('refined-prompt-display'),

    // Advanced settings (could be toggled)
    seedInput: document.getElementById('seed-input'),
    qualitySelect: document.getElementById('quality-select'),
    styleLockCheckbox: document.getElementById('style-lock-checkbox'),

    // Conversational
    chatInput: document.getElementById('image-chat-input'),
    sendChatBtn: document.getElementById('send-chat-btn'),
    chatHistory: document.getElementById('image-chat-history'),

    // Presets
    stylePresetsSelect: document.getElementById('style-presets-select'),

    // Reference Image Upload
    referenceUpload: document.getElementById('image-reference-upload'),
    uploadTrigger: document.getElementById('upload-trigger-btn'),
    uploadStatus: document.getElementById('upload-status'),
    previewContainer: document.getElementById('image-preview-container'),
    imagePreview: document.getElementById('image-preview'),
    clearImageBtn: document.getElementById('clear-image-btn')
};

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function showLoading(container, message = 'Processing...') {
    const loading = document.createElement('div');
    loading.className = 'loading-image';
    loading.innerHTML = `
        <div class="spinner"></div>
        <p>${message}</p>
    `;
    container.prepend(loading);
    return loading;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// ============================================
// API Calls
// ============================================
async function callImageAPI(endpoint, body) {
    try {
        const response = await fetch(`/api/image${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        return { success: false, error: error.message };
    }
}

async function getImageAPI(endpoint) {
    try {
        const response = await fetch(`/api/image${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        return { success: false, error: error.message };
    }
}

async function deleteImageAPI(id) {
    try {
        const response = await fetch(`/api/image/${id}`, { method: 'DELETE' });
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        return { success: false, error: error.message };
    }
}

// ============================================
// Prompt Refinement
// ============================================
async function refinePrompt(originalPrompt) {
    const response = await callImageAPI('/refine-prompt', { prompt: originalPrompt });
    if (response.success) {
        return response;
    }
    return null;
}

async function autoRefineAndGenerate() {
    const prompt = elements.imagePrompt.value.trim();
    if (!prompt) return;

    // Show refining state
    const refineStatus = document.createElement('div');
    refineStatus.className = 'status-message';
    refineStatus.textContent = 'Refining prompt...';
    elements.imageGallery.prepend(refineStatus);

    const refined = await refinePrompt(prompt);
    refineStatus.remove();

    if (refined && refined.refinedPrompt) {
        // Show refined prompt
        const refinedDisplay = document.createElement('div');
        refinedDisplay.className = 'refined-prompt-display';
        refinedDisplay.innerHTML = `
            <strong>Refined Prompt:</strong><br>
            ${escapeHtml(refined.refinedPrompt)}<br>
            <small>${refined.suggestions ? 'Suggestion: ' + refined.suggestions[0] : ''}</small>
        `;
        elements.imageGallery.prepend(refinedDisplay);

        // Use refined prompt for generation
        elements.imagePrompt.value = refined.refinedPrompt;
        await generateImages();

        // Remove refined display after a moment
        setTimeout(() => refinedDisplay.remove(), 3000);
    } else {
        await generateImages();
    }
}

// ============================================
// Image Generation
// ============================================
async function generateImages(overrides = {}) {
    if (ImageGenState.isGenerating) return;

    const prompt = elements.imagePrompt.value.trim();
    if (!prompt) {
        showError('Please enter a prompt');
        return;
    }

    ImageGenState.isGenerating = true;
    elements.generateBtn.disabled = true;
    elements.generateBtn.innerHTML = '<span class="spinner"></span> Generating...';

    // Clear empty state
    const emptyState = elements.imageGallery.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    const loading = showLoading(elements.imageGallery, `Generating ${overrides.batchSize || elements.imageCountSelect.value} image(s)...`);

    const params = {
        prompt: prompt,
        negativePrompt: elements.imageNegativePrompt.value.trim() || undefined,
        style: elements.imageStyleSelect.value,
        aspectRatio: elements.aspectRatioSelect.value,
        format: 'png',
        batchSize: overrides.batchSize || parseInt(elements.imageCountSelect.value),
        quality: overrides.quality || 90,
        seed: overrides.seed || (elements.seedInput?.value ? parseInt(elements.seedInput.value) : undefined),
        styleLock: overrides.styleLock || elements.styleLockCheckbox?.checked || false,
        styleReferenceId: overrides.styleReferenceId || ImageGenState.selectedImageId || undefined,
        referenceImage: ImageGenState.referenceImageB64 // Add the base64 image
    };

    // Remove undefined values
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

    console.log('Sending image generation request:', params);
    const result = await callImageAPI('/generate', params);
    console.log('Image generation response:', result);
    loading.remove();

    if (result.success && result.images) {
        result.images.forEach(img => {
            ImageGenState.currentImages.push(img);
            displayGeneratedImage(img);
        });

        // Store batch ID if provided
        if (result.batchId) {
            console.log('Batch ID:', result.batchId);
        }

        if (result.promptUsed !== prompt) {
            console.log('Prompt used:', result.promptUsed);
        }

        if (result.cost) {
            console.log('Total cost:', result.cost);
        }
    } else {
        showError(result.error || 'Generation failed');
    }

    ImageGenState.isGenerating = false;
    elements.generateBtn.disabled = false;
    elements.generateBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="21 15 16 10 5 21" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Generate Image
    `;
}

// ============================================
// Display Generated Images
// ============================================
function displayGeneratedImage(imageData) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'generated-image';
    imgDiv.dataset.id = imageData.id;

    if (ImageGenState.selectedImageId === imageData.id) {
        imgDiv.classList.add('selected');
    }

    imgDiv.innerHTML = `
        <div class="image-wrapper">
            <img src="${imageData.url}" alt="${escapeHtml(imageData.prompt)}" loading="lazy" />
            <div class="image-overlay">
                <div class="image-info">
                    <div class="image-prompt-preview">${escapeHtml(imageData.prompt.substring(0, 100))}${imageData.prompt.length > 100 ? '...' : ''}</div>
                    <div class="image-meta">
                        ${imageData.width}x${imageData.height} | ${imageData.format} | Seed: ${imageData.seed}
                    </div>
                </div>
                <div class="image-actions">
                    <button class="action-btn" title="Select for style lock" data-action="select">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Create Variations" data-action="variations">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <rect x="7" y="7" width="3" height="3"/>
                            <rect x="14" y="7" width="3" height="3"/>
                            <rect x="7" y="14" width="3" height="3"/>
                            <rect x="14" y="14" width="3" height="3"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Edit (Inpaint)" data-action="edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                            <path d="M2 2l7.586 7.586"/>
                            <circle cx="11" cy="11" r="2"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Outpaint (Expand)" data-action="outpaint">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 3 21 3 21 9"/>
                            <polyline points="9 21 3 21 3 15"/>
                            <line x1="21" y1="3" x2="14" y2="10"/>
                            <line x1="3" y1="21" x2="10" y2="14"/>
                        </svg>
                    </button>
                    <button class="action-btn" title="Download" data-action="download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </button>
                    <button class="action-btn delete" title="Delete" data-action="delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="image-actions-bar">
            <button class="small-btn" data-action="variations">Variations</button>
            <button class="small-btn" data-action="edit">Edit</button>
            <button class="small-btn" data-action="outpaint">Expand</button>
        </div>
    `;

    // Add click handler for selection
    imgDiv.addEventListener('click', (e) => {
        const action = e.target.closest('button')?.dataset.action;

        if (!action) {
            // Select image
            document.querySelectorAll('.generated-image').forEach(el => el.classList.remove('selected'));
            imgDiv.classList.add('selected');
            ImageGenState.selectedImageId = imageData.id;
        }
    });

    // Add action handlers
    imgDiv.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            await handleImageAction(action, imageData);
        });
    });

    elements.imageGallery.appendChild(imgDiv);
}

// ============================================
// Image Actions
// ============================================
async function handleImageAction(action, imageData) {
    switch (action) {
        case 'select':
            document.querySelectorAll('.generated-image').forEach(el => el.classList.remove('selected'));
            imageData.element.classList.add('selected');
            ImageGenState.selectedImageId = imageData.id;
            // Set style lock
            elements.imageStyleSelect.value = imageData.params.style || 'photorealistic';
            break;

        case 'variations':
            await createVariations(imageData.id);
            break;

        case 'edit':
            await promptForEdit(imageData.id);
            break;

        case 'outpaint':
            await promptForOutpaint(imageData.id);
            break;

        case 'download':
            downloadImage(imageData);
            break;

        case 'delete':
            await deleteImage(imageData.id);
            break;
    }
}

async function createVariations(sourceId) {
    const count = 3;
    const loading = showLoading(elements.imageGallery, `Creating ${count} variations...`);

    const result = await callImageAPI(`/${sourceId}/variations`, {
        count,
        preserveComposition: true,
        keepStyle: true
    });

    loading.remove();

    if (result.success) {
        result.variations.forEach(img => {
            ImageGenState.currentImages.push(img);
            displayGeneratedImage(img);
        });
    } else {
        showError(result.error || 'Failed to create variations');
    }
}

async function promptForEdit(imageId) {
    const instructions = prompt('Describe the edit (e.g., "change background to night", "remove object", "change dress color to red"):');
    if (!instructions) return;

    const loading = showLoading(elements.imageGallery, 'Applying edit...');

    const result = await callImageAPI(`/${imageId}/edit`, {
        instructions,
        editType: 'custom'
    });

    loading.remove();

    if (result.success) {
        ImageGenState.currentImages.push(result.editedImage);
        displayGeneratedImage(result.editedImage);
    } else {
        showError(result.error || 'Failed to edit image');
    }
}

async function promptForOutpaint(imageId) {
    const direction = prompt('Expand direction (left, right, top, bottom, all):', 'all');
    if (!direction) return;

    const expandBy = prompt('Expand by pixels (e.g., 256):', '256');
    if (!expandBy) return;

    const loading = showLoading(elements.imageGallery, 'Expanding image...');

    const result = await callImageAPI(`/${imageId}/outpaint`, {
        direction,
        expandBy: parseInt(expandBy)
    });

    loading.remove();

    if (result.success) {
        ImageGenState.currentImages.push(result.outpaintedImage);
        displayGeneratedImage(result.outpaintedImage);
    } else {
        showError(result.error || 'Failed to outpaint image');
    }
}

function downloadImage(imageData) {
    const format = prompt('Download format (png, jpg, webp):', 'png');
    if (!['png', 'jpg', 'webp'].includes(format)) {
        showError('Invalid format');
        return;
    }

    const link = document.createElement('a');
    link.href = `${imageData.url}?format=${format}`;
    link.download = `moonu-image-${imageData.id}.${format}`;
    link.click();
}

async function deleteImage(imageId) {
    if (!confirm('Delete this image?')) return;

    const result = await deleteImageAPI(imageId);
    if (result.success) {
        const imgElement = document.querySelector(`.generated-image[data-id="${imageId}"]`);
        if (imgElement) imgElement.remove();

        ImageGenState.currentImages = ImageGenState.currentImages.filter(img => img.id !== imageId);
        if (ImageGenState.selectedImageId === imageId) {
            ImageGenState.selectedImageId = null;
        }
    } else {
        showError(result.error || 'Failed to delete image');
    }
}

// ============================================
// Conversational Iteration
// ============================================
async function handleChatInstruction(instruction) {
    if (!ImageGenState.selectedImageId) {
        showError('Please select an image first (click on it)');
        return;
    }

    const selectedImage = ImageGenState.currentImages.find(img => img.id === ImageGenState.selectedImageId);
    if (!selectedImage) {
        showError('Selected image not found');
        return;
    }

    // Add to chat history
    ImageGenState.conversationContext.push({
        role: 'user',
        content: instruction,
        timestamp: new Date()
    });

    // Parse instruction
    const lowerInstr = instruction.toLowerCase();

    let action = null;
    let params = {};

    if (lowerInstr.includes('darker') || lowerInstr.includes('dark')) {
        action = 'edit';
        params = { instructions: `Make it darker, more shadows, moody lighting` };
    } else if (lowerInstr.includes('lighter') || lowerInstr.includes('bright')) {
        action = 'edit';
        params = { instructions: `Make it brighter, more light, well-lit` };
    } else if (lowerInstr.includes('background') && lowerInstr.includes('night')) {
        action = 'edit';
        params = { instructions: `Change background to night time, dark sky, stars` };
    } else if (lowerInstr.includes('background') && lowerInstr.includes('day')) {
        action = 'edit';
        params = { instructions: `Change background to day time, sunny, bright sky` };
    } else if (lowerInstr.includes('cinematic')) {
        action = 'regenerate';
        params = { style: 'cinematic', lighting: 'dramatic' };
    } else if (lowerInstr.includes('variation') || lowerInstr.includes('different')) {
        action = 'variation';
    } else if (lowerInstr.includes('bigger') || lowerInstr.includes('wider') || lowerInstr.includes('expand')) {
        action = 'outpaint';
        params = { direction: 'all', expandBy: 256 };
    } else {
        // Treat as new prompt with context
        action = 'regenerate';
        params = { prompt: `${selectedImage.prompt}. ${instruction}` };
    }

    // Execute action
    const loading = showLoading(elements.imageGallery, 'Applying change...');

    if (action === 'edit') {
        const result = await callImageAPI(`/${selectedImage.id}/edit`, {
            ...params,
            editType: 'custom'
        });
        loading.remove();

        if (result.success) {
            ImageGenState.currentImages.push(result.editedImage);
            displayGeneratedImage(result.editedImage);
        } else {
            showError(result.error);
        }
    } else if (action === 'variation') {
        loading.remove();
        await createVariations(selectedImage.id);
    } else if (action === 'outpaint') {
        const result = await callImageAPI(`/${selectedImage.id}/outpaint`, params);
        loading.remove();
        if (result.success) {
            ImageGenState.currentImages.push(result.outpaintedImage);
            displayGeneratedImage(result.outpaintedImage);
        } else {
            showError(result.error);
        }
    } else if (action === 'regenerate') {
        loading.remove();
        if (params.prompt) {
            elements.imagePrompt.value = params.prompt;
        } else {
            // Modify current params
            const currentStyle = elements.imageStyleSelect.value;
            if (params.style) elements.imageStyleSelect.value = params.style;
        }
        await generateImages({
            styleReferenceId: selectedImage.id,
            styleLock: true
        });
    }
}

// ============================================
// Load Style Presets
// ============================================
async function loadStylePresets() {
    const response = await getImageAPI('/styles/presets');
    if (response.success && response.presets) {
        elements.stylePresetsSelect.innerHTML = '<option value="">Select a preset...</option>';
        response.presets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.id;
            option.textContent = preset.name;
            option.title = preset.description;
            elements.stylePresetsSelect.appendChild(option);
        });
    }
}

elements.stylePresetsSelect?.addEventListener('change', (e) => {
    const presetId = e.target.value;
    if (!presetId) return;

    // Find preset and apply
    const presets = {
        'photorealistic': { style: 'photorealistic', quality: 90 },
        'cinematic': { style: 'cinematic', lighting: 'dramatic', quality: 95 },
        'anime': { style: 'anime', quality: 85 },
        'digital-art': { style: 'digital-art', quality: 90 },
        'painting': { style: 'painting', quality: 90 },
        '3d-render': { style: '3d-render', quality: 95 },
        'fantasy': { style: 'fantasy', mood: 'mysterious', lighting: 'dramatic' },
        'retro': { style: 'retro', lighting: 'soft' }
    };

    if (presets[presetId]) {
        Object.assign(elements.imageStyleSelect.dataset, presets[presetId]);
        elements.imageStyleSelect.value = presets[presetId].style;
    }
});

// ============================================
// Event Listeners
// ============================================
function initializeEventListeners() {
    // Generate button
    if (elements.generateBtn) {
        elements.generateBtn.addEventListener('click', async () => {
            await generateImages();
        });
    }

    // Prompt enter key
    if (elements.imagePrompt) {
        elements.imagePrompt.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                elements.generateBtn?.click();
            }
        });
    }

    // Load presets on startup
    loadStylePresets();

    // Reference Image Upload handling
    if (elements.uploadTrigger && elements.referenceUpload) {
        elements.uploadTrigger.addEventListener('click', () => {
            elements.referenceUpload.click();
        });

        elements.referenceUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64 = event.target.result;
                    ImageGenState.referenceImageB64 = base64;

                    // Show preview
                    elements.imagePreview.src = base64;
                    elements.previewContainer.style.display = 'flex';
                    elements.uploadStatus.textContent = file.name;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (elements.clearImageBtn) {
        elements.clearImageBtn.addEventListener('click', () => {
            ImageGenState.referenceImageB64 = null;
            elements.referenceUpload.value = '';
            elements.previewContainer.style.display = 'none';
            elements.uploadStatus.textContent = 'No image chosen';
        });
    }
}

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();

    // Load existing images
    loadExistingImages();
});

async function loadExistingImages() {
    const result = await getImageAPI('/');
    if (result.success && result.images) {
        result.images.forEach(img => {
            ImageGenState.currentImages.push(img);
            displayGeneratedImage(img);
        });
    }
}

// Export for debugging
window.ImageGen = {
    state: ImageGenState,
    generate: generateImages,
    refresh: loadExistingImages
};
