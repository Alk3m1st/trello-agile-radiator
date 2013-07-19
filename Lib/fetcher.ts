/// <reference path="../node.d.ts" />

// Can't seem to get the ambient declarations happening so we'll just declare for now
declare var Trello;
Trello = require("trello");

import config = require('../Config/config');

export interface IFetcher {
    fetch(board: string): any;
}

export class Fetcher implements IFetcher {
    private trello: any;

    constructor(config: config.AuthConfig) {
        this.trello = new Trello(config.getDeveloperApiKey(), config.getToken());
    }

    public fetch(board: string) {
        this.trello.readBoard(board, function (data) {
            console.log(data);
        });
    }
}