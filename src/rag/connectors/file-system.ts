import fs from 'fs';
import path from 'path';
import { DataSource, Document } from '../types';
import { extractTextFromFile, isTextFile, isDocumentFile } from '../../file-processor';

export class FileSystemDataSource implements DataSource {
    name = 'FileSystem';
    private rootPath: string;

    constructor(rootPath: string) {
        this.rootPath = rootPath;
    }

    async connect(): Promise<void> {
        // Check if directory exists
        try {
            await fs.promises.access(this.rootPath);
        } catch (error) {
            throw new Error(`Directory not found: ${this.rootPath}`);
        }
        console.log(`Connected to File System at ${this.rootPath}`);
    }

    async disconnect(): Promise<void> {
        console.log('Disconnected from File System');
    }

    async getData(): Promise<Document[]> {
        const documents: Document[] = [];
        await this.scanDirectory(this.rootPath, documents);
        return documents;
    }

    private async scanDirectory(dir: string, documents: Document[]): Promise<void> {
        const entries = await fs.promises.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // Recursively scan subdirectories, ignoring node_modules and hidden files
                if (entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
                    await this.scanDirectory(fullPath, documents);
                }
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name).toLowerCase();
                // Simple mime type inference based on file-processor logic
                let mimetype = 'application/octet-stream';
                if (ext === '.txt') mimetype = 'text/plain';
                else if (ext === '.json') mimetype = 'application/json';
                else if (ext === '.md') mimetype = 'text/markdown';
                else if (ext === '.pdf') mimetype = 'application/pdf';
                else if (ext === '.docx') mimetype = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

                if (isTextFile(mimetype) || isDocumentFile(mimetype)) {
                    try {
                        const content = await extractTextFromFile(fullPath, mimetype);
                        documents.push({
                            id: fullPath,
                            content: content,
                            metadata: {
                                filename: entry.name,
                                path: fullPath,
                                extension: ext,
                                size: (await fs.promises.stat(fullPath)).size
                            },
                            source: this.name,
                            createdAt: new Date()
                        });
                    } catch (err) {
                        console.error(`Failed to process file ${fullPath}:`, err);
                    }
                }
            }
        }
    }
}
