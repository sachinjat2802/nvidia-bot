
/**
 * Helper to dynamically load server-only modules
 * This prevents client-side bundles from breaking when they import files that conditionally use server modules.
 */
export const Utils = {
    async encrypt(data: Record<string, any>): Promise<string> {
        if (typeof window !== 'undefined') {
            throw new Error('Encryption is not supported in the browser');
        }
        const { encrypt } = await import('./encryption');
        return encrypt(data);
    },

    async decrypt(data: string): Promise<Record<string, any>> {
        if (typeof window !== 'undefined') {
            throw new Error('Decryption is not supported in the browser');
        }
        const { decrypt } = await import('./encryption');
        return decrypt(data);
    }
};
