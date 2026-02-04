import { NextResponse } from 'next/server';
import { NVIDIAClient } from '@/nvidia-client';
import { loadConfig } from '@/config';

/**
 * Premium Hindi Aliases for Flagship Models
 * Curated for a high-end, localized AI experience.
 */
const HINDI_ALIASES: Record<string, string> = {
    // Flagship Multilingual & Reasoning (Wisdom & Speech)
    'minimaxai/minimax-m2.1': 'Saraswati-Vani (सरस्वती वाणी)',
    'minimaxai/minimax-m2': 'Brihaspati-Gyan (बृहस्पति ज्ञान)',
    'stepfun-ai/step-3.5-flash': 'Narada-Muni (नारद मुनि)',
    'moonshotai/kimi-k2.5': 'Vashistha-Rishi (वशिष्ठ ऋषि)',
    'moonshotai/kimi-k2-thinking': 'Adi-Shankaracharya (आदि शंकराचार्य)',
    'moonshotai/kimi-k2-instruct': 'Dronacharya-Guru (द्रोणाचार्य गुरु)',

    // Powerhouse General Purpose (Warriors & Leaders)
    'mistralai/mistral-large-3-675b-instruct-2512': 'Bhishma-Pitamah (भीष्म पितामह)',
    'mistralai/mistral-large-2411': 'Yudhishthira-Dharma (युधिष्ठिर धर्म)',
    'mistralai/ministral-14b-instruct-2512': 'Abhimanyu-Veer (अभिमन्यु वीर)',
    'nvidia/llama-3.3-70b-instruct': 'Chanakya-Niti (चाणक्य नीति)',
    'meta/llama-3.1-405b-instruct': 'Brahma-Srijan (ब्रह्मा सृजन)',

    // Deep Intelligence & Agents (Sages & Authors)
    'deepseek-ai/deepseek-v3.2': 'Vyasa-Puran (व्यास पुराण)',
    'deepseek-ai/deepseek-v3.1': 'Valmiki-Kavya (वाल्मीकि काव्य)',
    'deepseek-ai/deepseek-v3': 'Manu-Smriti (मनु स्मृति)',
    'z-ai/glm-4-7': 'Parashurama-Tej (परशुराम तेज)',
    'bytedance/seed-oss-36b-instruct': 'Agastya-Rishi (अगस्त्य ऋषि)',

    // Coding Specialists (Architects & Builders)
    'qwen/qwen3-coder-480b-a35b-instruct': 'Vishwakarma-Shilp (विश्वकर्मा शिल्प)',
    'qwen/qwen2.5-coder-7b-instruct': 'Maya-Asura (मय असुर)',
    'mistralai/devstral-2-123b-instruct-2512': 'Nala-Setu (नल सेतु)',
    'mistralai/codestral-2501': 'Nila-Vastu (नील वास्तु)',

    // Small but Mighty & Vision (Kings & Scholars)
    'google/gemma-3-27b-it': 'Ashoka-Samrat (अशोक सम्राट)',
    'google/gemma-2-9b-it': 'Vikramaditya-Nyaya (विक्रमादित्य न्याय)',
    'google/gemma-2-2b-it': 'Harishchandra-Satya (हरिश्चंद्र सत्य)',
    'microsoft/phi-4-mini-flash-reasoning': 'Aryabhatta-Ganit (आर्यभट्ट)',
    'microsoft/phi-3.5-mini-instruct': 'Bhaskara-Acharya (भास्कराचार्य)',
    'microsoft/phi-4-multimodal-instruct': 'Sushruta-Chikitsa (सुश्रुत)',

    // Specialized Models
    'nvidia/nemotron-content-safety-reasoning-4b': 'Vidura-Neeti (विदुर नीति)',
    'nvidia/cosmos-reason2-8b': 'Varahamihira-Tara (वराहमिहिर)',
    'nvidia/riva-translate-4b-instruct-v1_1': 'Panini-Vyakaran (पाणिनि)',
    'nvidia/llama3-chatqa-1.5-8b': 'Gargi-Samvad (गार्गी संवाद)'
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
