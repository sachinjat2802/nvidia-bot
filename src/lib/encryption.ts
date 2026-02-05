const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

// Get encryption key from environment
async function getEncryptionKey(): Promise<Buffer> {
    const { default: crypto } = await import('crypto'); // Ensure crypto is imported dynamically
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error('ENCRYPTION_KEY environment variable is not set');
    }

    // Hash the key to ensure correct length
    return crypto.createHash('sha256').update(key).digest().slice(0, KEY_LENGTH);
}

export async function encrypt(data: Record<string, any>): Promise<string> {
    try {
        if (typeof window !== 'undefined') throw new Error('Encryption not supported in browser');
        const { default: crypto } = await import('crypto');

        const key = await getEncryptionKey();
        const iv = crypto.randomBytes(IV_LENGTH);
        // @ts-ignore - CreateCipherGCM types sometimes conflict depending on node/types version
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        const plaintext = JSON.stringify(data);
        let encrypted = cipher.update(plaintext, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag();

        // Combine iv + authTag + encrypted data
        const result = Buffer.concat([
            iv,
            authTag,
            Buffer.from(encrypted, 'hex')
        ]);

        return result.toString('base64');
    } catch (error: any) {
        console.error('Encryption failed:', error);
        throw new Error(`Failed to encrypt data: ${error.message}`);
    }
}

export async function decrypt(encryptedData: string): Promise<Record<string, any>> {
    try {
        if (typeof window !== 'undefined') throw new Error('Decryption not supported in browser');
        const { default: crypto } = await import('crypto');

        const key = await getEncryptionKey();
        const buffer = Buffer.from(encryptedData, 'base64');

        if (buffer.length < IV_LENGTH + AUTH_TAG_LENGTH) {
            throw new Error('Invalid encrypted data format');
        }

        const iv = buffer.subarray(0, IV_LENGTH);
        const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
        const encrypted = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

        // @ts-ignore
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);


        let decrypted = decipher.update(encrypted).toString('utf8');
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
    } catch (error: any) {
        console.error('Decryption failed:', error);
        throw new Error(`Failed to decrypt data: ${error.message}`);
    }
}