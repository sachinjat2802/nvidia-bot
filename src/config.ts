import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export interface Config {
    apiKey: string;
    baseUrl: string;
    defaultModel: string;
    chatHistoryLimit: number;
}

export function loadConfig(): Config {
    const apiKey = process.env.NVIDIA_API_KEY;
    const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
    const defaultModel = process.env.DEFAULT_MODEL || 'nvidia/nemotron-4-340b-instruct';
    const chatHistoryLimit = parseInt(process.env.CHAT_HISTORY_LIMIT || '50', 10);

    if (!apiKey) {
        // In production, throw an error instead of calling process.exit
        // This is safer for serverless environments (Vercel, etc.)
        if (process.env.NODE_ENV === 'production') {
            throw new Error('NVIDIA_API_KEY is not set in environment variables or .env file');
        }
        // In development, just warn
        console.warn('Warning: NVIDIA_API_KEY is missing. This is fine during build, but required at runtime.');
    }

    return {
        apiKey: apiKey || '',
        baseUrl,
        defaultModel,
        chatHistoryLimit,
    };
}

export function getAvailableModels(): string[] {
    return [
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