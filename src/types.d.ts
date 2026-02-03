declare module 'gradient-string' {
    const gradient: {
        (start: string, end?: string): (text: string) => string;
        cyan: (text: string) => string;
        blue: (text: string) => string;
        green: (text: string) => string;
        yellow: (text: string) => string;
        red: (text: string) => string;
        white: (text: string) => string;
        // Add other methods as needed
    };
    export default gradient;
}