
var trello = require('./trello');

var Fetcher = (function () {
    function Fetcher(config) {
        this.trello = new trello.Trello(config.getDeveloperApiKey(), config.getToken());
    }
    Fetcher.prototype.fetch = function (board, callback) {
        this.trello.readBoard(board, function (data) {
            callback(data);
        });
    };
    return Fetcher;
})();
exports.Fetcher = Fetcher;

