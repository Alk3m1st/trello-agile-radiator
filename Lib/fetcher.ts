import config = require('../Config/config');
import trello = require('./trello');

export interface IFetcher {
    fetch(board: string, callback: (data: any) => any): any;
}

export class Fetcher implements IFetcher {
    private trello: any;

    constructor(config: config.AuthConfig) {
        this.trello = new trello.Trello(config.getDeveloperApiKey(), config.getToken());
    }

    public fetch(board: string, callback: (data: any) => any) {
        this.trello.readBoard(board, function (data) {
            callback(data);
        });
    }
}