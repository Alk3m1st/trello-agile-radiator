express = require("express");

var Express = (function () {
    function Express() {
        this._app = express();
    }
    Express.prototype.addRoute = function (path, callback) {
        //this._app.get(path, callback(callback.arguments[0], callback.arguments[1]));
        this._app.get(path, callback);
    };

    Express.prototype.init = function (port) {
        //this._app.get('/', function (req: any, res: any) {
        //    res.send("hello");
        //});
        this._port = port;
        this.handleErrors();
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

//@ sourceMappingURL=server.js.map
