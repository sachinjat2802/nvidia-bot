import OpenAI from 'openai';
import { Config } from './config';

export class NVIDIAClient {
    private client: OpenAI;
    private config: Config;

    constructor(config: Config) {
        this.config = config;

        // Ensure baseURL doesn't have double /v1 if the user inadvertently added it
        const normalizedBaseUrl = config.baseUrl.replace(/\/v1\/v1$/, '/v1');

        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: normalizedBaseUrl,
        });
    }

    async chat(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
        model?: string
    ): Promise<string> {
        const selectedModel = model || this.config.defaultModel;
        try {
            const response = await this.client.chat.completions.create({
                model: selectedModel,
                messages,
                max_tokens: 4096,
                stream: false,
            });
            return response.choices[0]?.message?.content || '';
        } catch (error: any) {
            console.error(`NVIDIA Chat Error (Model: ${selectedModel}):`, error.message);
            throw error;
        }
    }

    async chatStream(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
        model?: string
    ): Promise<ReadableStream> {
        const selectedModel = model || this.config.defaultModel;

        try {
            const stream = await this.client.chat.completions.create({
                model: selectedModel,
                messages,
                max_tokens: 4096,
                stream: true,
            });

            return new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    try {
                        for await (const chunk of stream) {
                            const content = chunk.choices[0]?.delta?.content || '';
                            if (content) {
                                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                            }
                        }
                        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                        controller.close();
                    } catch (error: any) {
                        console.error('Stream processing error:', error);
                        controller.error(error);
                    }
                },
            });
        } catch (error: any) {
            console.error(`NVIDIA Stream Error (Model: ${selectedModel}):`, error.message);
            throw error;
        }
    }

    async listModels(): Promise<string[]> {
        const preferredModels = [
            'minimaxai/minimax-m2.1',
            'stepfun-ai/step-3.5-flash',
            'moonshotai/kimi-k2.5',
            'z-ai/glm-4-7',
            'nvidia/nemotron-content-safety-reasoning-4b',
            'nvidia/cosmos-reason2-8b',
            'deepseek-ai/deepseek-v3.2',
            'nvidia/riva-translate-4b-instruct-v1_1',
            'mistralai/devstral-2-123b-instruct-2512',
            'moonshotai/kimi-k2-thinking',
            'mistralai/mistral-large-3-675b-instruct-2512',
            'mistralai/ministral-14b-instruct-2512',
            'minimaxai/minimax-m2',
            'deepseek-ai/deepseek-v3.1-terminus',
            'moonshotai/kimi-k2-instruct-0905',
            'bytedance/seed-oss-36b-instruct',
            'qwen/qwen3-coder-480b-a35b-instruct',
            'deepseek-ai/deepseek-v3.1',
            'qwen/qwen3-235b-a22b',
            'microsoft/phi-4-mini-flash-reasoning',
            'moonshotai/kimi-k2-instruct',
            'meta/llama-4-maverick-17b-128e-instruct',
            'meta/llama-4-scout-17b-16e-instruct',
            'mistralai/mistral-medium-3-instruct',
            'mistralai/magistral-small-2506',
            'ibm/granite-3.3-8b-instruct',
            'qwen/qwq-32b',
            'mistralai/mistral-nemotron',
            'google/gemma-3-27b-it',
            'microsoft/phi-4-multimodal-instruct',
            'microsoft/phi-3-mini-128k-instruct',
            'tiiuae/falcon3-7b-instruct',
            'google/gemma-2-27b-it',
            'baichuan-inc/baichuan2-13b-chat',
            'qwen/qwen2-7b-instruct',
            'qwen/qwen2.5-coder-7b-instruct',
            'nvidia/nemotron-4-mini-hindi-4b-instruct',
            'mistralai/mistral-7b-instruct-v0.2',
            'ai21labs/jamba-1.5-mini-instruct',
            'mistralai/mistral-small-3.1-24b-instruct-2503',
            'upstage/solar-10.7b-instruct',
            'microsoft/phi-3.5-vision-instruct',
            'microsoft/phi-3.5-mini-instruct',
            'nvidia/nemotron-4-340b-instruct',
            'nvidia/llama-3.3-70b-instruct',
            'deepseek-ai/deepseek-v3',
            'meta/llama-3.1-405b-instruct',
            'meta/llama-3.1-70b-instruct',
            'meta/llama-3.1-8b-instruct',
        ];

        try {
            const models = await this.client.models.list();
            const availableIds = models.data.map(m => m.id);
            console.log('NVIDIA API available models count:', availableIds.length);

            // Intersection of what we want and what is actually available
            const filtered = preferredModels.filter(id => availableIds.includes(id));

            // If none of our preferred models are available, return the top 10 from the API
            // so the user has something to work with.
            if (filtered.length === 0 && availableIds.length > 0) {
                return availableIds.slice(0, 10).sort();
            }

            return filtered.sort();
        } catch (error: any) {
            console.warn('Could not fetch models from NVIDIA API:', error.message);
            // Fallback to a very safe list if API call fails entirely
            return [
                this.config.defaultModel,
                'nvidia/nemotron-4-340b-instruct',
                'meta/llama-3.1-8b-instruct'
            ].sort();
        }
    }

    getConfig(): Config {
        return this.config;
    }
}