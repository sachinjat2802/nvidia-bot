import { NextResponse } from 'next/server';
import { NVIDIAClient } from '@/nvidia-client';
import { loadConfig } from '@/config';

/**
 * Premium Hindi Aliases for Flagship Models
 * Curated for a high-end, localized AI experience.
 */
const HINDI_ALIASES: Record<string, string> = {
    // Flagship Multilingual & Reasoning
    'minimaxai/minimax-m2.1': 'Bahubhashi Expert (बहुभाषी)',
    'minimaxai/minimax-m2': 'Tarkik-Advait (तार्किक अद्वैत)',
    'stepfun-ai/step-3.5-flash': 'Tark-Shila (तर्कशिला)',
    'moonshotai/kimi-k2.5': 'Sarva-Gyani (सर्वज्ञानी)',
    'moonshotai/kimi-k2-thinking': 'Gahan-Chintan (गहन चिंतन)',
    'moonshotai/kimi-k2-instruct': 'Kimi-Seekh (किमी सीख)',

    // Powerhouse General Purpose
    'mistralai/mistral-large-3-675b-instruct-2512': 'Vajra-Maha (वज्र महा)',
    'mistralai/mistral-large-2411': 'Vajra-Samrat (वज्र सम्राट)',
    'mistralai/ministral-14b-instruct-2512': 'Vajra-Laghu (वज्र लघु)',
    'nvidia/llama-3.3-70b-instruct': 'Chanakya-Guru (चाणक्य गुरु)',
    'meta/llama-3.1-405b-instruct': 'Vishwa-Swaroop (विश्वरूप)',

    // Deep Intelligence & Agents
    'deepseek-ai/deepseek-v3.2': 'Maha-Khoji (महा खोजी)',
    'deepseek-ai/deepseek-v3.1': 'Gyan-Deep (ज्ञान दीप)',
    'deepseek-ai/deepseek-v3': 'Gyan-Sagar (ज्ञान सागर)',
    'z-ai/glm-4-7': 'Karmath-AI (कर्मठ)',
    'bytedance/seed-oss-36b-instruct': 'Beej-Buddhi (बीज बुद्धि)',

    // Coding Specialists
    'qwen/qwen3-coder-480b-a35b-instruct': 'Kavi-Coder (कवि कोडर)',
    'qwen/qwen2.5-coder-7b-instruct': 'Laghu-Kavi (लघु कवि)',
    'mistralai/devstral-2-123b-instruct-2512': 'Vikas-Vajra (विकास वज्र)',
    'mistralai/codestral-2501': 'Yantrik-Kavi (यांत्रिक कवि)',

    // Small but Mighty & Vision
    'google/gemma-3-27b-it': 'Pratibhavan (प्रतिभावान)',
    'google/gemma-2-9b-it': 'Gemma-Ratna (जेम्मा रत्न)',
    'google/gemma-2-2b-it': 'Gemma-Mani (जेम्मा मणि)',
    'microsoft/phi-4-mini-flash-reasoning': 'Chatur-Phi (चतुर)',
    'microsoft/phi-3.5-mini-instruct': 'Phi-Laghu (फाई लघु)',
    'microsoft/phi-4-multimodal-instruct': 'Phi-Vishwa (फाई विश्व)',

    // Specialized Models
    'nvidia/nemotron-content-safety-reasoning-4b': 'Rakshak-Reasoning (रक्षक)',
    'nvidia/cosmos-reason2-8b': 'Drishti-Vichar (दृष्टि विचार)',
    'nvidia/riva-translate-4b-instruct-v1_1': 'Anuvadak (अनुवादक)',
    'nvidia/llama3-chatqa-1.5-8b': 'Prashna-Uttar (प्रश्न उत्तर)'
};

export async function GET() {
    try {
        const config = loadConfig();
        const client = new NVIDIAClient(config);
        const models = await client.listModels();

        // Strict Filter: Only show models that have an explicit alias defined
        const curatedModels = models
            .filter(m => !!HINDI_ALIASES[m])
            .map(m => ({
                id: m,
                displayName: HINDI_ALIASES[m]
            }))
            .sort((a, b) => a.displayName.localeCompare(b.displayName));

        console.log(`Returning ${curatedModels.length} curated models out of ${models.length} available.`);

        return NextResponse.json({
            models: curatedModels,
            default: config.defaultModel
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
