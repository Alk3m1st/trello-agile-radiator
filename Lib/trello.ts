/// <reference path="../node.d.ts" />

// Can't seem to get the ambient declarations happening so we'll just declare for now
declare var restler;
restler = require("restler");

export interface ITrello {
}

export class Trello implements ITrello {
    private uri: string;

    constructor(
        private key: string,
        private token: string) {
            this.uri = "https://api.trello.com";
            this.key = key;
            this.token = token;
    }

    private makeRequest(fn, uri, options, callback): void {
        fn(uri, options)
            .on('complete', function (result) {
                if (typeof result === 'object') {
                    callback(result);
                } else {
                    callback(null, result);
                }
            });
    }

    public readBoard(boardId, callback): void {
        var query = {key: this.key, token: this.token};

        var url = this.uri + '/1/board/' + boardId;
        console.log(url);

        this.makeRequest(restler.get, url, { query: query }, callback);
    }
}