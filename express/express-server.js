express = require("express");
routes = require('../routes');
http = require('http');
path = require('path');

var Express = (function () {
    function Express() {
        this._app = express();
        this.expressRoutes = routes;
    }
    Express.prototype.addGetRoute = function (path, callback) {
        this._app.get(path, callback);
    };

    Express.prototype.addPostRoute = function (path, callback) {
        this._app.post(path, callback);
    };

    Express.prototype.init = function () {
        this._port = process.env.PORT || 3000;

        this._app.set('port', this._port);
        this._app.set('views', 'views');
        this._app.set('view engine', 'jade');
        this._app.use('/', express.static(path.join(__dirname, '../public')));
        this._app.use(express.favicon());
        this._app.use(express.logger('dev'));
        this._app.use(express.bodyParser());
        this._app.use(express.methodOverride());
        this._app.use(this._app.router);

        if ('development' == this._app.get('env')) {
            this._app.use(express.errorHandler());
        } else {
            this.handleErrors();
        }

        this._app.listen(this._port);

        console.log("Listening on port " + this._port);
    };

    Express.prototype.handleErrors = function () {
        this._app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.send(500, "Sorry, we broken something!");
        });
    };
    return Express;
})();
exports.Express = Express;

