Trello = require("trello");



var Fetcher = (function () {
    function Fetcher(config) {
        this.trello = new Trello(config.getDeveloperApiKey(), config.getToken());
    }
    Fetcher.prototype.fetch = function (board) {
        this.trello.readBoard(board, function (data) {
            console.log(data);
        });
    };
    return Fetcher;
})();
exports.Fetcher = Fetcher;

//@ sourceMappingURL=fetcher.js.map
