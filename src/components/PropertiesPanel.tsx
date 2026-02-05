'use client';

import { useState, useEffect } from 'react';
import { WorkflowStep, StepType, LLMConfig, CodeConfig, ConditionalConfig, DelayConfig, HttpConfig, FileConfig, DatabaseConfig, EmailConfig, StorageConfig, WebhookConfig, TransformConfig, TransformMapping } from '@/workflow';

interface PropertiesPanelProps {
    step: WorkflowStep | null;
    onUpdate: (step: WorkflowStep) => void;
    onDelete: (stepId: string) => void;
}

export default function PropertiesPanel({ step, onUpdate, onDelete }: PropertiesPanelProps) {
    const [localStep, setLocalStep] = useState<WorkflowStep | null>(step);

    useEffect(() => {
        setLocalStep(step);
    }, [step]);

    if (!localStep) {
        return (
            <div className="p-6">
                <div className="text-text-secondary text-sm text-center">
                    Select a node to view its properties
                </div>
            </div>
        );
    }

    const handleChange = (updates: Partial<WorkflowStep>) => {
        const newStep = { ...localStep, ...updates };
        setLocalStep(newStep);
        onUpdate(newStep);
    };

    const handleConfigChange = (configUpdates: any) => {
        const configKey = `${localStep.type}Config` as keyof WorkflowStep;
        const currentConfig = localStep[configKey] as Record<string, any> | undefined;
        const newConfig = { ...(currentConfig || {}), ...configUpdates };
        handleChange({ [configKey]: newConfig });
    };

    const handleOutputMappingChange = (mappings: Record<string, string>) => {
        handleChange({ outputMapping: mappings });
    };

    const addMapping = () => {
        const newMappings = { ...(localStep.outputMapping || {}), ['newKey']: '' };
        handleOutputMappingChange(newMappings);
    };

    const updateMapping = (key: string, value: string) => {
        const newMappings = { ...(localStep.outputMapping || {}) };
        if (value) {
            newMappings[key] = value;
        } else {
            delete newMappings[key];
        }
        handleOutputMappingChange(newMappings);
    };

    const deleteMapping = (key: string) => {
        const newMappings = { ...(localStep.outputMapping || {}) };
        delete newMappings[key];
        handleOutputMappingChange(newMappings);
    };

    const renderConfigFields = () => {
        switch (localStep.type) {
            case 'llm':
                return <LLMConfigFields config={localStep.llmConfig} onChange={handleConfigChange} />;
            case 'code':
                return <CodeConfigFields config={localStep.codeConfig} onChange={handleConfigChange} />;
            case 'conditional':
                return <ConditionalConfigFields config={localStep.conditionalConfig} onChange={handleConfigChange} />;
            case 'delay':
                return <DelayConfigFields config={localStep.delayConfig} onChange={handleConfigChange} />;
            case 'http':
                return <HttpConfigFields config={localStep.httpConfig} onChange={handleConfigChange} />;
            case 'file':
                return <FileConfigFields config={localStep.fileConfig} onChange={handleConfigChange} />;
            case 'database':
                return <DatabaseConfigFields config={localStep.databaseConfig} onChange={handleConfigChange} />;
            case 'email':
                return <EmailConfigFields config={localStep.emailConfig} onChange={handleConfigChange} />;
            case 'storage':
                return <StorageConfigFields config={localStep.storageConfig} onChange={handleConfigChange} />;
            case 'webhook':
                return <WebhookConfigFields config={localStep.webhookConfig} onChange={handleConfigChange} />;
            case 'transform':
                return <TransformConfigFields config={localStep.transformConfig} onChange={handleConfigChange} />;
            default:
                return <div className="text-sm text-text-secondary">No configuration available</div>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wide">
                        {localStep.type}
                    </div>
                    <input
                        type="text"
                        value={localStep.name}
                        onChange={(e) => handleChange({ name: e.target.value })}
                        className="text-lg font-bold bg-transparent border-none outline-none text-text-primary w-full mt-1"
                    />
                </div>
                <button
                    onClick={() => onDelete(localStep.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete node"
                >
                    🗑️
                </button>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">
                    Description
                </label>
                <textarea
                    value={localStep.description || ''}
                    onChange={(e) => handleChange({ description: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary resize-none"
                    rows={2}
                    placeholder="Optional description..."
                />
            </div>

            {/* Configuration */}
            <div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-wide mb-3">
                    Configuration
                </div>
                {renderConfigFields()}
            </div>

            {/* Output Mappings */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold text-text-secondary uppercase tracking-wide">
                        Output Mappings
                    </div>
                    <button
                        onClick={addMapping}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                    >
                        + Add Mapping
                    </button>
                </div>
                <div className="space-y-2">
                    {localStep.outputMapping && Object.entries(localStep.outputMapping).map(([key, path]) => (
                        <div key={key} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => {
                                    const newMappings = { ...(localStep.outputMapping || {}) };
                                    delete newMappings[key];
                                    newMappings[e.target.value] = path;
                                    handleOutputMappingChange(newMappings);
                                }}
                                className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                                placeholder="context key"
                            />
                            <span className="text-text-muted">←</span>
                            <input
                                type="text"
                                value={path}
                                onChange={(e) => updateMapping(key, e.target.value)}
                                className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                                placeholder="output path (e.g., response.text)"
                            />
                            <button
                                onClick={() => deleteMapping(key)}
                                className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {(!localStep.outputMapping || Object.keys(localStep.outputMapping).length === 0) && (
                        <div className="text-xs text-text-muted italic">
                            No output mappings. Add one to pass data to other steps.
                        </div>
                    )}
                </div>
                <div className="mt-2 text-xs text-text-muted">
                    Use paths like: <code className="bg-background px-1 rounded">output.field</code> or{' '}
                    <code className="bg-background px-1 rounded">data[0].name</code>
                </div>
            </div>

            {/* Help Text */}
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="text-xs font-semibold text-primary mb-1">
                    💡 Template Variables
                </div>
                <div className="text-xs text-text-secondary">
                    Use <code className="bg-background px-1 rounded">${'{variable}'}</code> in config fields to reference context values.
                    Examples: <code className="bg-background px-1 rounded">${'{input.name}'}</code>,{' '}
                    <code className="bg-background px-1 rounded">${'{stepResults.step1.output}'}</code>
                </div>
            </div>
        </div>
    );
}

// Configuration field components
function LLMConfigFields({ config, onChange }: { config?: LLMConfig; onChange: (updates: any) => void }) {
    const [models] = useState([
        'meta/llama-3.1-70b-instruct',
        'meta/llama-3.1-8b-instruct',
        'nvidia/nemotron-4-340b-instruct',
        'microsoft/phi-3-mini-4k-instruct',
        'google/gemma-7b-it',
        'mistralai/mixtral-8x7b-instruct-v0.1',
    ]);

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Model
                </label>
                <select
                    value={config?.model || ''}
                    onChange={(e) => onChange({ model: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    System Prompt
                </label>
                <textarea
                    value={config?.systemPrompt || ''}
                    onChange={(e) => onChange({ systemPrompt: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary resize-none"
                    rows={2}
                    placeholder="You are a helpful assistant..."
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    User Message
                </label>
                <textarea
                    value={config?.content || ''}
                    onChange={(e) => onChange({ content: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary resize-none"
                    rows={3}
                    placeholder="Enter your message..."
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Temperature
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="2"
                        value={config?.temperature ?? 0.7}
                        onChange={(e) => onChange({ temperature: parseFloat(e.target.value) })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Max Tokens
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="4000"
                        value={config?.maxTokens ?? 500}
                        onChange={(e) => onChange({ maxTokens: parseInt(e.target.value) })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    />
                </div>
            </div>
        </div>
    );
}

function CodeConfigFields({ config, onChange }: { config?: CodeConfig; onChange: (updates: any) => void }) {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Code (JavaScript/TypeScript)
                </label>
                <textarea
                    value={config?.code || ''}
                    onChange={(e) => onChange({ code: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                    rows={6}
                    placeholder="// Access context via 'context' variable
// Return the result
return context.input.data.toUpperCase();"
                />
            </div>
            <div className="text-xs text-text-muted">
                The <code className="bg-background px-1 rounded">context</code> variable contains all workflow context. Return the result.
            </div>
        </div>
    );
}

function ConditionalConfigFields({ config, onChange }: { config?: ConditionalConfig; onChange: (updates: any) => void }) {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Condition (JavaScript expression)
                </label>
                <input
                    type="text"
                    value={config?.condition || ''}
                    onChange={(e) => onChange({ condition: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="context.value > 10"
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Then Step ID (optional)
                    </label>
                    <input
                        type="text"
                        value={config?.thenStepId || ''}
                        onChange={(e) => onChange({ thenStepId: e.target.value })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                        placeholder="step_id"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Else Step ID (optional)
                    </label>
                    <input
                        type="text"
                        value={config?.elseStepId || ''}
                        onChange={(e) => onChange({ elseStepId: e.target.value })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                        placeholder="step_id"
                    />
                </div>
            </div>
        </div>
    );
}

function DelayConfigFields({ config, onChange }: { config?: DelayConfig; onChange: (updates: any) => void }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1">
                Delay (milliseconds)
            </label>
            <input
                type="number"
                min="0"
                value={config?.milliseconds ?? 1000}
                onChange={(e) => onChange({ milliseconds: parseInt(e.target.value) })}
                className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
            />
        </div>
    );
}

function HttpConfigFields({ config, onChange }: { config?: HttpConfig; onChange: (updates: any) => void }) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    URL
                </label>
                <input
                    type="text"
                    value={config?.url || ''}
                    onChange={(e) => onChange({ url: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="https://api.example.com/endpoint"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Method
                    </label>
                    <select
                        value={config?.method || 'GET'}
                        onChange={(e) => onChange({ method: e.target.value as any })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    >
                        {methods.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Response Type
                    </label>
                    <select
                        value={config?.responseType || 'json'}
                        onChange={(e) => onChange({ responseType: e.target.value as any })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    >
                        <option value="json">JSON</option>
                        <option value="text">Text</option>
                        <option value="blob">Blob</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Headers (JSON)
                </label>
                <textarea
                    value={config?.headers ? JSON.stringify(config.headers, null, 2) : '{}'}
                    onChange={(e) => {
                        try {
                            const headers = JSON.parse(e.target.value);
                            onChange({ headers });
                        } catch {
                            // Invalid JSON, ignore
                        }
                    }}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                    rows={3}
                    placeholder='{"Content-Type": "application/json"}'
                />
            </div>

            {config?.method !== 'GET' && (
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Body (JSON)
                    </label>
                    <textarea
                        value={config?.body ? JSON.stringify(config.body, null, 2) : ''}
                        onChange={(e) => {
                            try {
                                const body = JSON.parse(e.target.value);
                                onChange({ body });
                            } catch {
                                // Invalid JSON, ignore
                            }
                        }}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                        rows={4}
                        placeholder='{"key": "value"}'
                    />
                </div>
            )}
        </div>
    );
}

function FileConfigFields({ config, onChange }: { config?: FileConfig; onChange: (updates: any) => void }) {
    const operations = ['read', 'write', 'delete', 'exists'];

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Operation
                </label>
                <select
                    value={config?.operation || 'read'}
                    onChange={(e) => onChange({ operation: e.target.value as any })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {operations.map((op) => (
                        <option key={op} value={op}>
                            {op.charAt(0).toUpperCase() + op.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    File Path
                </label>
                <input
                    type="text"
                    value={config?.path || ''}
                    onChange={(e) => onChange({ path: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="/path/to/file.txt"
                />
            </div>

            {config?.operation === 'write' && (
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Content
                    </label>
                    <textarea
                        value={config?.content || ''}
                        onChange={(e) => onChange({ content: e.target.value })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary resize-none"
                        rows={4}
                    />
                </div>
            )}
        </div>
    );
}

interface DatabaseConfigFieldsProps {
    config?: DatabaseConfig;
    onChange: (updates: any) => void;
}

function DatabaseConfigFields(props: DatabaseConfigFieldsProps) {
    const { config, onChange } = props;
    const dbTypes = ['postgres', 'mysql', 'mongodb', 'mssql', 'sqlite'];
    const operations = ['query', 'select', 'insert', 'update', 'delete'];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="useIntegration"
                    checked={config?.useIntegration || false}
                    onChange={(e) => onChange({ useIntegration: e.target.checked })}
                    className="rounded"
                />
                <label htmlFor="useIntegration" className="text-sm text-text-primary">
                    Use Stored Integration
                </label>
            </div>

            {!config?.useIntegration ? (
                <>
                    <div>
                        <label className="block text-xs font-semibold text-text-secondary mb-1">
                            Database Type
                        </label>
                        <select
                            value={config?.connection?.type || ''}
                            onChange={(e) => onChange({
                                connection: { ...config?.connection, type: e.target.value }
                            })}
                            className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                        >
                            {dbTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {config?.connection?.type !== 'sqlite' ? (
                        <>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                                        Host
                                    </label>
                                    <input
                                        type="text"
                                        value={config?.connection?.host || ''}
                                        onChange={(e) => onChange({
                                            connection: { ...config?.connection, host: e.target.value }
                                        })}
                                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                        placeholder="localhost"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                                        Port
                                    </label>
                                    <input
                                        type="number"
                                        value={config?.connection?.port || ''}
                                        onChange={(e) => onChange({
                                            connection: { ...config?.connection, port: parseInt(e.target.value) || undefined }
                                        })}
                                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                        placeholder="5432"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-text-secondary mb-1">
                                    Database
                                </label>
                                <input
                                    type="text"
                                    value={config?.connection?.database || ''}
                                    onChange={(e) => onChange({
                                        connection: { ...config?.connection, database: e.target.value }
                                    })}
                                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                    placeholder="mydb"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={config?.connection?.username || ''}
                                        onChange={(e) => onChange({
                                            connection: { ...config?.connection, username: e.target.value }
                                        })}
                                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={config?.connection?.password || ''}
                                        onChange={(e) => onChange({
                                            connection: { ...config?.connection, password: e.target.value }
                                        })}
                                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1">
                                Database Path
                            </label>
                            <input
                                type="text"
                                value={config?.connection?.connectionString || ''}
                                onChange={(e) => onChange({
                                    connection: { ...config?.connection, connectionString: e.target.value, type: 'sqlite' }
                                })}
                                className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                                placeholder="/path/to/database.sqlite"
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="p-3 bg-primary/10 border border-primary/30 rounded text-sm text-text-secondary">
                    Integration credentials will be used. Configure integrations in the Integrations page.
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Operation
                </label>
                <select
                    value={config?.operation || 'query'}
                    onChange={(e) => onChange({ operation: e.target.value as any })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {operations.map((op) => (
                        <option key={op} value={op}>
                            {op.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Query
                </label>
                <textarea
                    value={config?.query || ''}
                    onChange={(e) => onChange({ query: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                    rows={3}
                    placeholder="SELECT * FROM users WHERE id = $1"
                />
            </div>
        </div>
    );
}

function EmailConfigFields({ config, onChange }: { config?: EmailConfig; onChange: (updates: any) => void }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="useIntegration"
                    checked={config?.useIntegration || false}
                    onChange={(e) => onChange({ useIntegration: e.target.checked })}
                    className="rounded"
                />
                <label htmlFor="useIntegration" className="text-sm text-text-primary">
                    Use Stored SMTP Integration
                </label>
            </div>

            {!config?.useIntegration && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded text-sm text-yellow-400">
                    SMTP integration required. Create one in the Integrations page.
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    To (comma-separated or array)
                </label>
                <input
                    type="text"
                    value={Array.isArray(config?.to) ? config.to.join(', ') : (config?.to || '')}
                    onChange={(e) => {
                        const to = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        onChange({ to: to.length > 1 ? to : e.target.value });
                    }}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="user@example.com, admin@example.com"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Subject
                </label>
                <input
                    type="text"
                    value={config?.subject || ''}
                    onChange={(e) => onChange({ subject: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="Email subject"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Body
                </label>
                <textarea
                    value={config?.body || ''}
                    onChange={(e) => onChange({ body: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary resize-none"
                    rows={4}
                    placeholder="Email body content..."
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isHtml"
                    checked={config?.isHtml || false}
                    onChange={(e) => onChange({ isHtml: e.target.checked })}
                    className="rounded"
                />
                <label htmlFor="isHtml" className="text-sm text-text-primary">
                    Send as HTML
                </label>
            </div>
        </div>
    );
}

function StorageConfigFields({ config, onChange }: { config?: StorageConfig; onChange: (updates: any) => void }) {
    const providers = ['s3', 'gcs', 'azure-blob', 'ftp', 'sftp'];
    const operations = ['upload', 'download', 'delete', 'list'];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="useIntegration"
                    checked={config?.useIntegration || false}
                    onChange={(e) => onChange({ useIntegration: e.target.checked })}
                    className="rounded"
                />
                <label htmlFor="useIntegration" className="text-sm text-text-primary">
                    Use Stored Integration
                </label>
            </div>

            {!config?.useIntegration && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded text-sm text-yellow-400">
                    Storage integration required. Create one in the Integrations page.
                </div>
            )}

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Provider
                </label>
                <select
                    value={config?.provider || 's3'}
                    onChange={(e) => onChange({ provider: e.target.value as any })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {providers.map((provider) => (
                        <option key={provider} value={provider}>
                            {provider.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Operation
                </label>
                <select
                    value={config?.operation || 'upload'}
                    onChange={(e) => onChange({ operation: e.target.value as any })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {operations.map((op) => (
                        <option key={op} value={op}>
                            {op.charAt(0).toUpperCase() + op.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Bucket/Container
                </label>
                <input
                    type="text"
                    value={config?.bucket || ''}
                    onChange={(e) => onChange({ bucket: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="my-bucket"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Object Key/Path
                </label>
                <input
                    type="text"
                    value={config?.key || ''}
                    onChange={(e) => onChange({ key: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="folder/file.txt"
                />
            </div>

            {config?.operation === 'download' && (
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Local Path
                    </label>
                    <input
                        type="text"
                        value={config?.localPath || ''}
                        onChange={(e) => onChange({ localPath: e.target.value })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                        placeholder="/tmp/downloaded_file.txt"
                    />
                </div>
            )}
        </div>
    );
}

function WebhookConfigFields({ config, onChange }: { config?: WebhookConfig; onChange: (updates: any) => void }) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    URL
                </label>
                <input
                    type="text"
                    value={config?.url || ''}
                    onChange={(e) => onChange({ url: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="https://api.example.com/webhook"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Method
                </label>
                <select
                    value={config?.method || 'POST'}
                    onChange={(e) => onChange({ method: e.target.value as any })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                >
                    {methods.map((method) => (
                        <option key={method} value={method}>
                            {method}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Headers (JSON)
                </label>
                <textarea
                    value={config?.headers ? JSON.stringify(config.headers, null, 2) : '{}'}
                    onChange={(e) => {
                        try {
                            const headers = JSON.parse(e.target.value);
                            onChange({ headers });
                        } catch {
                            // Invalid JSON, ignore
                        }
                    }}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                    rows={2}
                    placeholder='{"Content-Type": "application/json"}'
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Body (JSON)
                </label>
                <textarea
                    value={config?.body ? JSON.stringify(config.body, null, 2) : ''}
                    onChange={(e) => {
                        try {
                            const body = JSON.parse(e.target.value);
                            onChange({ body });
                        } catch {
                            // Invalid JSON, ignore
                        }
                    }}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary font-mono resize-none"
                    rows={4}
                    placeholder='{"key": "value"}'
                />
            </div>
        </div>
    );
}

function TransformConfigFields({ config, onChange }: { config?: TransformConfig; onChange: (updates: any) => void }) {
    const [mappings, setMappings] = useState<TransformMapping[]>(config?.mapping || []);

    const addMapping = () => {
        const newMappings = [...mappings, { source: '', target: '' }];
        setMappings(newMappings);
        onChange({ mapping: newMappings });
    };

    const updateMapping = (index: number, updates: Partial<TransformMapping>) => {
        const newMappings = [...mappings];
        newMappings[index] = { ...newMappings[index], ...updates };
        setMappings(newMappings);
        onChange({ mapping: newMappings });
    };

    const deleteMapping = (index: number) => {
        const newMappings = mappings.filter((_, i) => i !== index);
        setMappings(newMappings);
        onChange({ mapping: newMappings });
    };

    return (
        <div className="space-y-3">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-text-secondary">
                        Mappings
                    </label>
                    <button
                        onClick={addMapping}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                    >
                        + Add Mapping
                    </button>
                </div>
                <div className="space-y-2">
                    {mappings.map((mapping, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={mapping.source}
                                onChange={(e) => updateMapping(index, { source: e.target.value })}
                                className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                                placeholder="source (e.g., users[0].name)"
                            />
                            <span className="text-text-muted">→</span>
                            <input
                                type="text"
                                value={mapping.target}
                                onChange={(e) => updateMapping(index, { target: e.target.value })}
                                className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-text-primary"
                                placeholder="target (e.g., firstName)"
                            />
                            <button
                                onClick={() => deleteMapping(index)}
                                className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {mappings.length === 0 && (
                        <div className="text-xs text-text-muted italic">
                            Add mappings to transform data
                        </div>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1">
                    Filter (optional)
                </label>
                <input
                    type="text"
                    value={config?.filter || ''}
                    onChange={(e) => onChange({ filter: e.target.value })}
                    className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    placeholder="item.active === true"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Sort By (optional)
                    </label>
                    <input
                        type="text"
                        value={config?.sortBy || ''}
                        onChange={(e) => onChange({ sortBy: e.target.value })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                        placeholder="name"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-1">
                        Sort Order
                    </label>
                    <select
                        value={config?.sortOrder || 'asc'}
                        onChange={(e) => onChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
                        className="w-full p-2 bg-background border border-border rounded text-sm text-text-primary"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
}