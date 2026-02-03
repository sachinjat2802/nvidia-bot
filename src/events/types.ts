export interface Event {
    id: string;
    type: string; // e.g., 'webhook', 'schedule', 'system'
    source: string; // e.g., 'github', 'cron', 'file-watcher'
    payload: any;
    timestamp: Date;
}

export interface Trigger {
    id: string;
    type: 'webhook' | 'schedule';
    config: WebhookTriggerConfig | ScheduleTriggerConfig;
    workflowId: string;
    isActive: boolean;
}

export interface WebhookTriggerConfig {
    path?: string; // Optional custom path, defaults to /api/webhooks/:triggerId
    method?: 'GET' | 'POST'; // Defaults to POST
    secret?: string; // Optional signature verification
}

export interface ScheduleTriggerConfig {
    cronExpression: string; // e.g., '0 0 * * *'
    timezone?: string;
}

export interface EventHandler {
    handle(event: Event): Promise<void>;
}
