/// <reference path="../node.d.ts" />

// Can't seem to get the ambient declarations happening so we'll just declare for now
declare var express, routes, user, http, path;
express = require("express");
routes = require('../routes');
http = require('http');
path = require('path');

export interface IExpress {
    init(port: number): void;
    addGetRoute(path: string, callback: (req: any, res: any) => void ): void;
    addPostRoute(path: string, callback: (req: any, res: any) => void ): void;
}

export class Express implements IExpress {
    private _port: number;
    private _app: any;
    public expressRoutes: any;

    constructor() {
        this._app = express();
        this.expressRoutes = routes;
    }

    public addGetRoute(path: string, callback: (req: any, res: any) => void) {
        this._app.get(path, callback);
    }

    public addPostRoute(path: string, callback: (req: any, res: any) => void ) {
        this._app.post(path, callback);
    }

    public init(port: number): void {
        this._port = process.env.PORT || port;

        // all environments
        this._app.set('port', this._port);
        this._app.set('views', 'views');
        this._app.set('view engine', 'jade');
        this._app.use('/', express.static(path.join(__dirname, '../public')));
        this._app.use(express.favicon());
        this._app.use(express.logger('dev'));
        this._app.use(express.bodyParser());
        this._app.use(express.methodOverride());
        this._app.use(this._app.router);

        // development only
        if ('development' == this._app.get('env')) {
            this._app.use(express.errorHandler());
        }
        else
        {
            this.handleErrors();
        }

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