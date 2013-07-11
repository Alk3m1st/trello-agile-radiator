export interface AuthConfig {
    getApiId(): string;
    getApiKey(): string;
}

// Class
export class TrelloAuthConfig implements AuthConfig {
    constructor(private appId: string, private appKey: string) { }

    public getApiId(): string { return this.appId; }

    public getApiKey(): string { return this.appKey; }
}