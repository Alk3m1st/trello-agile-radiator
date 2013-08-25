import config = require('../Config/config');
import trello = require('./trello');

export interface IFetcher {
    fetch(board: string): any;
}

export class Fetcher implements IFetcher {
    private trello: any;

    constructor(config: config.AuthConfig) {
        this.trello = new trello.Trello(config.getDeveloperApiKey(), config.getToken());
    }

    public fetch(board: string) {
        this.trello.readBoard(board, function (data) {
            console.log(data);

            return data;
        });
    }
}