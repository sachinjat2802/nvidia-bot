import OpenAI from 'openai';
import { Config } from './config';

export class NVIDIAClient {
    private client: OpenAI;
    private config: Config;

    constructor(config: Config) {
        this.config = config;
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: config.baseUrl,
        });
    }

    async chat(
        messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
        model?: string,
        onChunk?: (chunk: string) => void
    ): Promise<string> {
        const selectedModel = model || this.config.defaultModel;

        try {
            const stream = await this.client.chat.completions.create({
                model: selectedModel,
                messages,
                max_tokens: 4096,
                stream: true,
            });

            let fullResponse = '';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content && onChunk) {
                    onChunk(content);
                }
                fullResponse += content;
            }

            return fullResponse;
        } catch (error: any) {
            let errorMessage = 'Unknown error';
            if (error?.response) {
                const { status, data, headers } = error.response;
                errorMessage = `Status ${status}`;
                if (data) {
                    errorMessage += `: ${JSON.stringify(data)}`;
                }
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.code) {
                errorMessage = `Code ${error.code}`;
            }
            throw new Error(`NVIDIA API error: ${errorMessage}`);
        }
    }

    async listModels(): Promise<string[]> {
        try {
            const models = await this.client.models.list();
            return models.data.map(m => m.id).sort();
        } catch (error: any) {
            console.warn('Could not fetch models from API, using built-in list');
            return [
                this.config.defaultModel,
                'nvidia/nemotron-4-340b-instruct',
                'nvidia/nemotron-4-340b-code',
                'nvidia/llama-3.1-nemotron-70b-instruct',
                'nvidia/llama-3.1-nemotron-70b-code',
                'nvidia/llama-3.1-nemotron-8b-instruct',
                'nvidia/llama-3.1-nemotron-8b-code',
                'nvidia/llama-3.2-1b-instruct',
                'nvidia/llama-3.2-3b-instruct',
                'nvidia/llama-3.3-70b-instruct',
                'nvidia/mistral-7b-instruct-v0.3',
                'nvidia/mixtral-8x7b-instruct-v0.1',
                'nvidia/codestral-2501',
                'nvidia/deepseek-ai/deepseek-r1',
                'nvidia/deepseek-ai/deepseek-v3',
                'nvidia/google/gemma-2-2b-it',
                'nvidia/google/gemma-2-9b-it',
                'nvidia/google/gemma-2-27b-it',
                'nvidia/meta/llama-2-13b-chat-hf',
                'nvidia/meta/llama-2-70b-chat-hf',
                'nvidia/microsoft/phi-3-mini-4k-instruct',
                'nvidia/microsoft/phi-3-medium-4k-instruct',
                'nvidia/microsoft/phi-3-small-8k-instruct',
                'nvidia/microsoft/phi-3.5-mini-instruct',
                'nvidia/microsoft/phi-3.5-moe-instruct',
                'nvidia/microsoft/phi-3.5-vision-instruct',
                'nvidia/snowflake/snowflake-arctic-instruct',
            ];
        }
    }

    getConfig(): Config {
        return this.config;
    }
}