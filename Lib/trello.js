restler = require("restler");

var Trello = (function () {
    function Trello(key, token) {
        this.key = key;
        this.token = token;
        this.uri = "https://api.trello.com";
        this.key = key;
        this.token = token;
    }
    Trello.prototype.makeRequest = function (fn, uri, options, callback) {
        fn(uri, options).on('complete', function (result) {
            if (typeof result === 'object') {
                callback(result);
            } else {
                callback(null, result);
            }
        });
    };

    Trello.prototype.readBoard = function (boardId, callback) {
        var query = { key: this.key, token: this.token };

        var url = this.uri + '/1/board/' + boardId;
        console.log(url);

        this.makeRequest(restler.get, url, { query: query }, callback);
    };
    return Trello;
})();
exports.Trello = Trello;

//@ sourceMappingURL=trello.js.map
