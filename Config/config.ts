export interface AuthConfig {
    getDeveloperApiKey(): string;       // Key
    getDeveloperApiSecret(): string;    // Secret (for OAuth signing)
    getToken(): string;                 // Token (usually obtained from user)
}

// Class
export class TrelloAuthConfig implements AuthConfig {
    constructor(
        private developerAppKey: string,
        private developerApiSecret: string,
        private token: string) {
    }

    public getDeveloperApiKey(): string { return this.developerAppKey; }

    public getDeveloperApiSecret(): string { return this.developerApiSecret; }

    public getToken(): string { return this.token; }
}