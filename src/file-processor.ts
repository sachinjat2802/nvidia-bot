import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export interface UploadedFile {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    content?: string;
    error?: string;
}

export async function extractTextFromFile(filePath: string, mimetype: string): Promise<string> {
    try {
        const ext = path.extname(filePath).toLowerCase();

        if (mimetype.startsWith('text/') || ext === '.txt' || ext === '.md' || ext === '.json' || ext === '.csv') {
            return fs.promises.readFile(filePath, 'utf-8');
        }

        if (mimetype === 'application/pdf' || ext === '.pdf') {
            const data = await fs.promises.readFile(filePath);
            const result = await pdf(data);
            return result.text;
        }

        if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || ext === '.docx') {
            const buffer = await fs.promises.readFile(filePath);
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        }

        if (mimetype.startsWith('image/')) {
            return `[Image file: ${path.basename(filePath)}]`;
        }

        return `[Unsupported file type: ${mimetype}]`;
    } catch (error: any) {
        throw new Error(`Failed to extract text from file: ${error.message}`);
    }
}

export function getFileExtension(filename: string): string {
    return path.extname(filename).toLowerCase();
}

export function isImageFile(mimetype: string): boolean {
    return mimetype.startsWith('image/');
}

export function isTextFile(mimetype: string): boolean {
    return mimetype.startsWith('text/') ||
        mimetype === 'application/json' ||
        mimetype === 'application/csv' ||
        mimetype === 'text/markdown';
}

export function isDocumentFile(mimetype: string): boolean {
    return mimetype === 'application/pdf' ||
        mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mimetype === 'application/msword';
}