import cron, { ScheduledTask } from 'node-cron';
import { EventBus } from './event-bus';
import { Trigger } from './types';

export class Scheduler {
    private eventBus: EventBus;
    private jobs: Map<string, ScheduledTask> = new Map();

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    public scheduleTrigger(trigger: Trigger): void {
        if (trigger.type !== 'schedule' || !trigger.config) return;

        const config = trigger.config as any; // Cast to ScheduleTriggerConfig
        const cronExpression = config.cronExpression;

        if (!cron.validate(cronExpression)) {
            console.error(`Invalid cron expression for trigger ${trigger.id}: ${cronExpression}`);
            return;
        }

        console.log(`[Scheduler] Scheduling trigger ${trigger.id} with cron: ${cronExpression}`);

        const job = cron.schedule(cronExpression, () => {
            console.log(`[Scheduler] Firing trigger ${trigger.id}`);
            this.eventBus.emitEvent({
                id: `evt_${Date.now()}`,
                type: 'schedule',
                source: 'scheduler',
                payload: { triggerId: trigger.id },
                timestamp: new Date()
            });
        });

        this.jobs.set(trigger.id, job);
    }

    public stopTrigger(triggerId: string): void {
        const job = this.jobs.get(triggerId);
        if (job) {
            job.stop();
            this.jobs.delete(triggerId);
            console.log(`[Scheduler] Stopped trigger ${triggerId}`);
        }
    }
}
