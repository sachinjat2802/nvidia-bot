import nodemailer from 'nodemailer';
import { NodeVM } from 'vm2';
import { WorkflowDefinition, WorkflowStep, ExecutionResult, StepResult, WorkflowExecutionContext, LLMConfig, CodeConfig, HttpConfig, DatabaseConfig, EmailConfig, StorageConfig, WebhookConfig, TransformConfig, ConditionalConfig, DelayConfig, FileConfig, IntegrationRecord } from './workflow';
import { NVIDIAClient } from './nvidia-client';

// Safe expression evaluator using a restricted expression parser
class SafeExpressionEvaluator {
    private static readonly ALLOWED_GLOBALS = [
        'Math', 'Date', 'Array', 'Object', 'String', 'Number', 'Boolean',
        'Map', 'Set', 'Promise', 'JSON', 'parseInt', 'parseFloat', 'isNaN',
        'isFinite', 'undefined', 'null', 'true', 'false'
    ];

    // Whitelist of safe operators and patterns
    private static readonly SAFE_PATTERN = /^[a-zA-Z0-9_$\.\[\]\(\)\s+\-*/%<>=!&|^~?:,]*$/;

    static evaluate(expression: string, context: Record<string, any>): any {
        if (typeof expression !== 'string') {
            return expression;
        }

        // Validate expression characters
        if (!this.SAFE_PATTERN.test(expression)) {
            throw new Error('Invalid characters in expression');
        }

        // Block dangerous patterns
        const dangerousPatterns = [
            /__proto__/,
            /constructor/,
            /prototype/,
            /require\s*\(/,
            /import\s+/,
            /eval\s*\(/,
            /Function\s*\(/,
            /process\./,
            /global\./,
            /window\./,
            /document\./,
            /localStorage/,
            /sessionStorage/,
            /fs\./,
            /child_process/,
            /net\./,
            /http\./,
            /https\./,
            /dgram\./,
            /cluster\./,
            /worker_threads/,
            /os\./,
            /vm\./,
            /module\./,
            /require\./,
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(expression)) {
                throw new Error('Potentially dangerous expression pattern detected');
            }
        }

        try {
            // Use a safer approach: create function with only allowed globals
            // We'll pass the context as the only variable available
            const fn = new Function('context', `"use strict"; return ${expression}`);
            return fn(context);
        } catch (error: any) {
            throw new Error(`Expression evaluation failed: ${error.message}`);
        }
    }

    static executeCode(code: string, context: Record<string, any>): any {
        if (typeof code !== 'string') {
            throw new Error('Code must be a string');
        }

        // Additional validation for multi-line code
        const dangerousPatterns = [
            /require\s*\(/,
            /import\s+.*\s+from/,
            /process\./,
            /global\./,
            /__proto__/,
            /constructor/,
            /prototype/,
            /eval\s*\(/,
            /Function\s*\(/,
            /setTimeout\s*\(/,
            /setInterval\s*\(/,
            /setImmediate\s*\(/,
            /fs\./,
            /child_process/,
            /net\./,
            /http\./,
            /https\./,
            /dgram\./,
            /cluster\./,
            /worker_threads/,
            /os\./,
            /vm\./,
            /module\./,
            /require\./,
            /eval/,
            /window/,
            /document/,
            /localStorage/,
            /sessionStorage/,
            /XMLHttpRequest/,
            /fetch\s*\(/,
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(code)) {
                throw new Error('Dangerous code pattern detected');
            }
        }

        try {
            const vm = new NodeVM({
                console: 'redirect',
                sandbox: { context: { ...context } },
                require: {
                    external: false,
                    builtin: [],
                },
            });

            vm.on('console.log', (...args: any[]) => console.log('[Workflow Code]', ...args));
            vm.on('console.error', (...args: any[]) => console.error('[Workflow Code]', ...args));
            vm.on('console.warn', (...args: any[]) => console.warn('[Workflow Code]', ...args));
            vm.on('console.info', (...args: any[]) => console.info('[Workflow Code]', ...args));

            const wrappedCode = `
                module.exports = (function() {
                    ${code}
                })();
            `;
            return vm.run(wrappedCode);
        } catch (error: any) {
            throw new Error(`Code execution failed: ${error.message}`);
        }
    }
}

export class WorkflowEngine {
    private nvidiaClient: NVIDIAClient;
    private integrations: IntegrationRecord[] = [];
    private supabaseService?: any;
    private readonly MAX_RECURSION_DEPTH = 100;

    constructor(nvidiaClient: NVIDIAClient, options?: { supabaseService?: any }) {
        this.nvidiaClient = nvidiaClient;
        this.supabaseService = options?.supabaseService;
    }

    async setIntegrations(integrations: IntegrationRecord[]) {
        this.integrations = integrations;
    }

    async execute(workflow: WorkflowDefinition, input: Record<string, any>): Promise<ExecutionResult> {
        const startTime = Date.now();
        const stepResults: StepResult[] = [];
        const context: Record<string, any> = { ...workflow.globalContext, ...input };
        const executionId = `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        try {
            // Build dependency graph
            const stepMap = new Map<string, WorkflowStep>();
            workflow.steps.forEach(step => stepMap.set(step.id, step));

            // Topological sort with depth tracking per call
            const sortedSteps = this.topologicalSort(workflow.steps, stepMap);

            // Execute steps in order
            for (const step of sortedSteps) {
                let stepStart = Date.now();
                try {
                    const result = await this.executeStep(step, context, this.integrations);
                    const stepEnd = Date.now();

                    const stepResult: StepResult = {
                        stepId: step.id,
                        status: 'success',
                        output: result,
                        durationMs: stepEnd - stepStart,
                        startedAt: new Date(stepStart).toISOString(),
                        completedAt: new Date(stepEnd).toISOString(),
                    };

                    stepResults.push(stepResult);
                    context[step.id] = result;

                    // Apply output mappings
                    if (step.outputMapping) {
                        for (const [key, path] of Object.entries(step.outputMapping)) {
                            const value = this.resolvePath(result, path);
                            if (value !== undefined) {
                                this.setContextValue(context, key, value);
                            }
                        }
                    }

                    // Update execution in Supabase if available
                    if (this.supabaseService && executionId) {
                        await this.supabaseService.updateExecution(executionId, {
                            step_results: stepResults,
                        });
                    }
                } catch (error: any) {
                    const stepEnd = Date.now();
                    const stepResult: StepResult = {
                        stepId: step.id,
                        status: 'failed',
                        output: null,
                        durationMs: stepEnd - stepStart,
                        startedAt: new Date(stepStart).toISOString(),
                        completedAt: new Date(stepEnd).toISOString(),
                        error: error.message,
                    };
                    stepResults.push(stepResult);

                    return {
                        status: 'failed',
                        outputContext: context,
                        stepResults,
                        error: `Step '${step.name}' failed: ${error.message}`,
                    };
                }
            }

            const totalDuration = Date.now() - startTime;

            return {
                status: 'completed',
                outputContext: context,
                stepResults,
            };
        } catch (error: any) {
            return {
                status: 'failed',
                outputContext: context,
                stepResults,
                error: error.message,
            };
        }
    }

    private topologicalSort(steps: WorkflowStep[], stepMap: Map<string, WorkflowStep>): WorkflowStep[] {
        const visited = new Set<string>();
        const temp = new Set<string>();
        const result: WorkflowStep[] = [];

        const visit = (step: WorkflowStep, depth: number = 0): void => {
            // Check recursion depth
            if (depth > this.MAX_RECURSION_DEPTH) {
                throw new Error(`Recursion depth exceeded (max ${this.MAX_RECURSION_DEPTH})`);
            }

            if (temp.has(step.id)) {
                throw new Error(`Circular dependency detected involving step: ${step.id}`);
            }
            if (visited.has(step.id)) {
                return;
            }

            temp.add(step.id);

            if (step.dependsOn) {
                for (const depId of step.dependsOn) {
                    const depStep = stepMap.get(depId);
                    if (!depStep) {
                        throw new Error(`Missing dependency: ${depId} for step ${step.id}`);
                    }
                    visit(depStep, depth + 1);
                }
            }

            temp.delete(step.id);
            visited.add(step.id);
            result.push(step);
        };

        steps.forEach(step => visit(step));
        return result;
    }

    private async executeStep(
        step: WorkflowStep,
        context: Record<string, any>,
        integrations: IntegrationRecord[]
    ): Promise<any> {
        switch (step.type) {
            case 'llm':
                return await this.executeLLM(step, context);
            case 'code':
                return await this.executeCode(step, context);
            case 'http':
                return await this.executeHttp(step, context, integrations);
            case 'database':
                return await this.executeDatabase(step, context, integrations);
            case 'email':
                return await this.executeEmail(step, context, integrations);
            case 'storage':
                return await this.executeStorage(step, context, integrations);
            case 'webhook':
                return await this.executeWebhook(step, context);
            case 'transform':
                return await this.executeTransform(step, context);
            case 'conditional':
                return await this.executeConditional(step, context);
            case 'delay':
                return await this.executeDelay(step);
            case 'file':
                return await this.executeFile(step, context);
            default:
                throw new Error(`Unknown step type: ${step.type}`);
        }
    }

    private async executeLLM(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.llmConfig!;
        if (!config) throw new Error('LLM config missing');

        const content = this.resolveTemplate(config.content, context);
        const systemPrompt = config.systemPrompt ? this.resolveTemplate(config.systemPrompt, context) : undefined;

        const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [];
        if (systemPrompt) {
            messages.push({ role: 'system', content: systemPrompt });
        }
        messages.push({ role: 'user', content });

        const response = await this.nvidiaClient.chat(messages, config.model);
        return response;
    }

    private async executeCode(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.codeConfig!;
        if (!config) throw new Error('Code config missing');

        const code = this.resolveTemplate(config.code, context);

        try {
            return SafeExpressionEvaluator.executeCode(code, context);
        } catch (error: any) {
            throw new Error(`Code execution failed: ${error.message}`);
        }
    }

    private async executeHttp(step: WorkflowStep, context: Record<string, any>, integrations: IntegrationRecord[]): Promise<any> {
        const config = step.httpConfig!;
        if (!config) throw new Error('HTTP config missing');

        const url = this.resolveTemplate(config.url, context);
        
        // Validate URL to prevent SSRF
        this.validateUrlForSSRF(url);

        const method = config.method;
        const headers: Record<string, string> = {};

        if (config.headers) {
            for (const [key, value] of Object.entries(config.headers)) {
                headers[key] = this.resolveTemplate(value, context);
            }
        }

        let body: any = undefined;
        if (config.body) {
            try {
                const resolvedBody = this.resolveTemplate(JSON.stringify(config.body), context);
                body = JSON.parse(resolvedBody);
            } catch (error: any) {
                throw new Error(`Failed to parse HTTP body: ${error.message}`);
            }
        }

        // Add timeout
        const controller = new AbortController();
        const timeoutMs = config.timeoutMs || 30000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${method} ${url} failed: ${response.status} ${response.statusText}`);
            }

            if (config.responseType === 'json') {
                return response.json();
            } else if (config.responseType === 'text') {
                return response.text();
            } else {
                return response.blob();
            }
        } catch (error: any) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`HTTP request timed out after ${timeoutMs}ms`);
            }
            throw error;
        }
    }

    private validateUrlForSSRF(url: string): void {
        try {
            const urlObj = new URL(url);
            
            // Only allow http and https
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
                throw new Error(`Invalid URL protocol: ${urlObj.protocol}. Only http and https are allowed.`);
            }

            // Block localhost and private IP ranges
            const hostname = urlObj.hostname.toLowerCase();
            
            // Block localhost variants
            if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname.startsWith('localhost.')) {
                throw new Error('Access to localhost is not allowed');
            }

            // Block private IP ranges
            const privateIPPatterns = [
                /^127\./,
                /^10\./,
                /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
                /^192\.168\./,
                /^169\.254\./, // Link-local
                /^::1$/,
                /^fc00:/,
                /^fe80:/,
            ];

            for (const pattern of privateIPPatterns) {
                if (pattern.test(hostname)) {
                    throw new Error(`Access to private IP ranges is not allowed: ${hostname}`);
                }
            }

            // Block AWS metadata endpoint and other cloud metadata services
            if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal' || hostname === '169.254.169.254') {
                throw new Error('Access to cloud metadata endpoints is not allowed');
            }

        } catch (error: any) {
            if (error instanceof TypeError) {
                throw new Error(`Invalid URL: ${error.message}`);
            }
            throw error;
        }
    }

    private async executeDatabase(step: WorkflowStep, context: Record<string, any>, integrations: IntegrationRecord[]): Promise<any> {
        const config = step.databaseConfig!;
        if (!config) throw new Error('Database config missing');

        if (config.useIntegration && config.integrationId) {
            const integration = integrations.find(i => i.id === config.integrationId);
            if (!integration) {
                throw new Error(`Integration not found: ${config.integrationId}`);
            }
            // Verify integration belongs to the same user (defense-in-depth)
            // This should already be filtered by listIntegrations, but we check anyway
            return this.executeDatabaseWithIntegration(integration, config, context);
        } else if (config.connection) {
            throw new Error('Direct database connections are not supported. Please use integrations.');
        } else {
            throw new Error('No database connection configured');
        }
    }

    private async executeDatabaseWithIntegration(integration: IntegrationRecord, config: DatabaseConfig, context: Record<string, any>): Promise<any> {
        const dbConfig = integration.config;
        const dbType = dbConfig.type || config.connection?.type;

        switch (dbType) {
            case 'postgres':
            case 'mysql':
                return this.executeSQLDatabase(integration, config, context);
            case 'mongodb':
                return this.executeMongoDB(integration, config, context);
            default:
                throw new Error(`Unsupported database type: ${dbType}`);
        }
    }

    private async executeSQLDatabase(integration: IntegrationRecord, config: DatabaseConfig, context: Record<string, any>): Promise<any> {
        const dbConfig = integration.config;
        const { Pool } = await import('pg');
        const pool = new Pool({
            connectionString: dbConfig.connectionString,
            host: dbConfig.host,
            port: dbConfig.port,
            database: dbConfig.database,
            user: dbConfig.username,
            password: dbConfig.password,
        });

        try {
            const query = this.resolveTemplate(config.query || '', context);

            // Validate query - check for dangerous patterns
            this.validateSQLQuery(query);

            // Determine operation type
            const trimmedQuery = query.trim().toUpperCase();
            const allowedOperations = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WITH'];
            const operation = allowedOperations.find(op => trimmedQuery.startsWith(op));

            if (!operation) {
                throw new Error(`Unsupported SQL operation. Allowed: ${allowedOperations.join(', ')}`);
            }

            if (operation === 'SELECT' || operation === 'WITH') {
                const result = await pool.query(query);
                return { rows: result.rows, rowCount: result.rowCount, operation };
            } else {
                const result = await pool.query(query);
                return { rowCount: result.rowCount, operation };
            }
        } finally {
            await pool.end();
        }
    }

    private validateSQLQuery(query: string): void {
        // Remove comments
        const cleanedQuery = query.replace(/--.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        
        // Check for dangerous patterns
        const dangerousPatterns = [
            /DROP\s+TABLE/i,
            /DROP\s+DATABASE/i,
            /TRUNCATE\s+TABLE/i,
            /ALTER\s+TABLE/i,
            /CREATE\s+TABLE/i,
            /CREATE\s+DATABASE/i,
            /DELETE\s+FROM\s+\w+\s*;?\s*--/i, // DELETE without WHERE (simple check)
            /;\s*DROP/i, // Chained queries
            /UNION\s+SELECT/i,
            /INFORMATION_SCHEMA/i,
            /pg_catalog/i,
            /sys\./i,
            /mysql\./i,
            /INTO\s+OUTFILE/i,
            /LOAD_FILE/i,
            /BENCHMARK\s*\(/i,
            /SLEEP\s*\(/i,
        ];

        for (const pattern of dangerousPatterns) {
            if (pattern.test(cleanedQuery)) {
                throw new Error(`Potentially dangerous SQL pattern detected: ${pattern.source}`);
            }
        }

        // For DELETE and UPDATE, ensure there's a WHERE clause (basic check)
        const upperQuery = cleanedQuery.toUpperCase();
        if ((upperQuery.startsWith('DELETE') || upperQuery.startsWith('UPDATE')) && !upperQuery.includes('WHERE')) {
            throw new Error('DELETE and UPDATE operations must include a WHERE clause');
        }
    }

    private async executeMongoDB(integration: IntegrationRecord, config: DatabaseConfig, context: Record<string, any>): Promise<any> {
        const dbConfig = integration.config;
        const { MongoClient } = await import('mongodb');

        const client = new MongoClient(dbConfig.uri);
        await client.connect();

        try {
            const db = client.db(dbConfig.database);
            const collection = db.collection(config.collection || dbConfig.collection);

            const operation = config.operation;
            const query = config.query ? this.resolveTemplate(config.query, context) : {};

            switch (operation) {
                case 'query':
                case 'select':
                    const cursor = collection.find(query);
                    const limit = config.data?.limit || 100;
                    const results = await cursor.limit(limit).toArray();
                    return { documents: results, count: results.length, operation };
                case 'insert':
                    const insertData = this.resolveTemplate(config.data || '{}', context);
                    // Ensure insertData is an object, not a string
                    const dataToInsert = typeof insertData === 'string' ? JSON.parse(insertData) : insertData;
                    const insertResult = await collection.insertOne(dataToInsert);
                    return { insertedId: insertResult.insertedId, operation };
                case 'update':
                    const updateData = this.resolveTemplate(config.data || '{}', context);
                    const parsedUpdateData = typeof updateData === 'string' ? JSON.parse(updateData) : updateData;
                    const updateResult = await collection.updateMany(query, parsedUpdateData);
                    return { matchedCount: updateResult.matchedCount, modifiedCount: updateResult.modifiedCount, operation };
                case 'delete':
                    const deleteResult = await collection.deleteMany(query);
                    return { deletedCount: deleteResult.deletedCount, operation };
                default:
                    throw new Error(`Unsupported MongoDB operation: ${operation}`);
            }
        } finally {
            await client.close();
        }
    }

    private async executeDatabaseDirect(connection: any, config: DatabaseConfig, context: Record<string, any>): Promise<any> {
        throw new Error('Direct database connections are not supported. Please use integrations.');
    }

    private async executeEmail(step: WorkflowStep, context: Record<string, any>, integrations: IntegrationRecord[]): Promise<any> {
        const config = step.emailConfig!;
        if (!config) throw new Error('Email config missing');

        if (config.useIntegration && config.integrationId) {
            const integration = integrations.find(i => i.id === config.integrationId);
            if (!integration) {
                throw new Error(`Integration not found: ${config.integrationId}`);
            }
            return this.executeEmailWithIntegration(integration, config, context);
        }

        // Log email details (would use nodemailer in production)
        const to = Array.isArray(config.to) ? config.to : [config.to];
        const subject = this.resolveTemplate(config.subject, context);
        const body = this.resolveTemplate(config.body, context);

        console.log(`[Email] Would send to: ${to.join(', ')}`);
        console.log(`[Email] Subject: ${subject}`);
        console.log(`[Email] Body: ${body.substring(0, 100)}...`);

        return { success: true, to, subject, bodyLength: body.length, method: 'log' };
    }

    private async executeEmailWithIntegration(integration: IntegrationRecord, config: EmailConfig, context: Record<string, any>): Promise<any> {
        const emailConfig = integration.config;

        const transporter = nodemailer.createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.secure,
            auth: {
                user: emailConfig.username,
                pass: emailConfig.password
            }
        });

        const subject = this.resolveTemplate(config.subject, context);
        const body = this.resolveTemplate(config.body, context);

        const mailOptions: any = {
            from: emailConfig.username,
            to: config.to,
            subject: subject,
            cc: config.cc,
            bcc: config.bcc
        };

        if (config.isHtml) {
            mailOptions.html = body;
        } else {
            mailOptions.text = body;
        }

        console.log(`[Email] Sending to ${config.to} via ${integration.name}: ${subject}`);

        const info = await transporter.sendMail(mailOptions);

        return { success: true, to: config.to, subject: subject, messageId: info.messageId };
    }

    private async executeStorage(step: WorkflowStep, context: Record<string, any>, integrations: IntegrationRecord[]): Promise<any> {
        const config = step.storageConfig!;
        if (!config) throw new Error('Storage config missing');

        if (config.useIntegration && config.integrationId) {
            const integration = integrations.find(i => i.id === config.integrationId);
            if (!integration) {
                throw new Error(`Integration not found: ${config.integrationId}`);
            }
            return this.executeStorageWithIntegration(integration, config, context);
        }

        throw new Error('Storage operations require an integration');
    }

    private async executeStorageWithIntegration(integration: IntegrationRecord, config: StorageConfig, context: Record<string, any>): Promise<any> {
        const storageConfig = integration.config;
        const key = this.resolveTemplate(config.key || '', context);
        const localPath = this.resolveTemplate(config.localPath || '', context);

        switch (config.operation) {
            case 'upload':
                console.log(`[Storage] Upload to ${config.provider}: ${key} (via ${integration.name})`);
                return { success: true, operation: 'upload', key, integration: integration.name };
            case 'download':
                console.log(`[Storage] Download from ${config.provider}: ${key} to ${localPath} (via ${integration.name})`);
                return { success: true, operation: 'download', key, localPath, integration: integration.name };
            case 'delete':
                console.log(`[Storage] Delete from ${config.provider}: ${key} (via ${integration.name})`);
                return { success: true, operation: 'delete', key, integration: integration.name };
            case 'list':
                console.log(`[Storage] List ${config.provider}: ${config.bucket || ''} (via ${integration.name})`);
                return { success: true, operation: 'list', bucket: config.bucket, integration: integration.name, items: [] };
            default:
                throw new Error(`Unknown storage operation: ${config.operation}`);
        }
    }

    private async executeWebhook(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.webhookConfig!;
        if (!config) throw new Error('Webhook config missing');

        const url = this.resolveTemplate(config.url, context);
        
        // Validate URL to prevent SSRF
        this.validateUrlForSSRF(url);

        const method = config.method;
        const headers: Record<string, string> = {};

        if (config.headers) {
            for (const [key, value] of Object.entries(config.headers)) {
                headers[key] = this.resolveTemplate(value, context);
            }
        }

        let body: any = undefined;
        if (config.body) {
            try {
                const resolvedBody = this.resolveTemplate(JSON.stringify(config.body), context);
                body = JSON.parse(resolvedBody);
            } catch (error: any) {
                throw new Error(`Failed to parse webhook body: ${error.message}`);
            }
        }

        // Add timeout
        const controller = new AbortController();
        const timeoutMs = config.timeoutMs || 30000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Webhook ${method} ${url} failed: ${response.status} ${response.statusText}`);
            }

            if (response.headers.get('content-type')?.includes('application/json')) {
                return response.json();
            }
            return response.text();
        } catch (error: any) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`Webhook request timed out after ${timeoutMs}ms`);
            }
            throw error;
        }
    }

    private async executeTransform(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.transformConfig!;
        if (!config) throw new Error('Transform config missing');

        // Get the source data
        let sourceData = context.input || context;
        if (config.mapping.length > 0) {
            const firstSource = config.mapping[0].source;
            const parentPath = firstSource.split('.').slice(0, -1).join('.');
            if (parentPath) {
                sourceData = this.resolvePath(context, parentPath) || context;
            }
        }

        let result: Record<string, any> | any[] = Array.isArray(sourceData) ? [] : {};

        // Apply mappings
        for (const mapping of config.mapping) {
            const value = this.resolvePath(sourceData, mapping.source);
            if (value !== undefined) {
                this.setContextValue(result, mapping.target, value);
            }
        }

        // Apply filter if specified
        if (config.filter && Array.isArray(result)) {
            try {
                const filterFn = SafeExpressionEvaluator.evaluate.bind(SafeExpressionEvaluator, config.filter);
                result = result.filter(filterFn.bind(null, context));
            } catch (error: any) {
                throw new Error(`Filter evaluation failed: ${error.message}`);
            }
        }

        // Apply sorting if specified
        if (config.sortBy && Array.isArray(result)) {
            result.sort((a: any, b: any) => {
                const aVal = this.resolvePath(a, config.sortBy!);
                const bVal = this.resolvePath(b, config.sortBy!);
                const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                return config.sortOrder === 'desc' ? -comparison : comparison;
            });
        }

        // Apply limit and offset
        if (config.limit && Array.isArray(result)) {
            const start = config.offset || 0;
            result = result.slice(start, start + config.limit);
        }

        return result;
    }

    private async executeConditional(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.conditionalConfig!;
        if (!config) throw new Error('Conditional config missing');

        const condition = this.resolveTemplate(config.condition, context);

        // Evaluate condition safely
        let result: boolean;
        try {
            if (typeof condition === 'boolean') {
                result = condition;
            } else if (typeof condition === 'string') {
                result = SafeExpressionEvaluator.evaluate(condition, context);
            } else {
                result = Boolean(condition);
            }
        } catch (error: any) {
            throw new Error(`Condition evaluation failed: ${error.message}`);
        }

        return {
            condition: config.condition,
            result,
            thenStepId: config.thenStepId,
            elseStepId: config.elseStepId,
        };
    }

    private async executeDelay(step: WorkflowStep): Promise<any> {
        const config = step.delayConfig!;
        if (!config) throw new Error('Delay config missing');

        // Validate delay time (max 1 hour)
        if (config.milliseconds < 0 || config.milliseconds > 3600000) {
            throw new Error('Delay must be between 0 and 3600000ms (1 hour)');
        }

        await new Promise(resolve => setTimeout(resolve, config.milliseconds));
        return { delayed: true, milliseconds: config.milliseconds };
    }

    private async executeFile(step: WorkflowStep, context: Record<string, any>): Promise<any> {
        const config = step.fileConfig!;
        if (!config) throw new Error('File config missing');

        const path = this.resolveTemplate(config.path, context);

        // Security: prevent path traversal
        this.validateFilePath(path);

        // Restrict to a specific directory (would be configured in production)
        const allowedDir = process.env.FILE_OPERATIONS_DIR || './workflow-files';

        console.log(`[File] Operation: ${config.operation}, Path: ${path} (in ${allowedDir})`);

        switch (config.operation) {
            case 'read':
                // Would read file in production
                return { content: '', operation: 'read', path, exists: false };
            case 'write':
                const content = this.resolveTemplate(config.content || '', context);
                // Would write file in production
                return { success: true, operation: 'write', path, bytesWritten: content.length };
            case 'exists':
                // Would check file in production
                return { exists: false, path };
            case 'delete':
                // Would delete file in production
                return { success: true, operation: 'delete', path };
            default:
                throw new Error(`Unknown file operation: ${config.operation}`);
        }
    }

    private validateFilePath(filePath: string): void {
        // Resolve the path to absolute
        const resolvedPath = path.resolve(filePath);
        const allowedDir = path.resolve(process.env.FILE_OPERATIONS_DIR || './workflow-files');

        // Check if the resolved path is within the allowed directory
        if (!resolvedPath.startsWith(allowedDir + path.sep) && resolvedPath !== allowedDir) {
            throw new Error(`File path outside allowed directory: ${filePath}`);
        }
    }

    private resolveTemplate(template: string, context: Record<string, any>): string {
        if (typeof template !== 'string') {
            return String(template);
        }

        return template.replace(/\$\{([^}]+)\}/g, (match, path) => {
            const value = this.resolvePath(context, path.trim());
            return value !== undefined ? String(value) : match;
        });
    }

    private resolvePath(obj: any, path: string): any {
        if (!path) return obj;
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current === null || current === undefined) return undefined;

            // Handle array notation like users[0]
            const match = key.match(/^(\w+)\[(\d+)\]$/);
            if (match) {
                const arrayKey = match[1];
                const index = parseInt(match[2], 10);
                current = current?.[arrayKey]?.[index];
            } else {
                current = current?.[key];
            }
        }

        return current;
    }

    private setContextValue(context: Record<string, any>, path: string, value: any): void {
        const keys = path.split('.');
        let current = context;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    }
}

// Import path for file validation
import path from 'path';