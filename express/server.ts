/// <reference path="../node.d.ts" />

// Can't seem to get the ambient declarations happening so we'll just declare for now
declare var express;
express = require("express");

export interface IExpress {
    init(port: number): void;
}

export class Express implements IExpress {
    private _port: number;
    private _app: any;

    constructor() {
        this._app = express();
    }

    public addRoute(path: string, callback: (req: any, res: any) => any) {
        //this._app.get(path, callback(callback.arguments[0], callback.arguments[1]));
        this._app.get(path, callback);
    }

    public init(port: number): void {
        //this._app.get('/', function (req: any, res: any) {
        //    res.send("hello");
        //});

        this._port = port;
        this.handleErrors();
        this._app.listen(this._port);
        console.log("Listening on port " + this._port);
    }

    private handleErrors(): void {
        this._app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.send(500, "Sorry, we broken something!");
        });
    }
}