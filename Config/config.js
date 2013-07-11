// Class
var TrelloAuthConfig = (function () {
    function TrelloAuthConfig(appId, appKey) {
        this.appId = appId;
        this.appKey = appKey;
    }
    TrelloAuthConfig.prototype.getApiId = function () {
        return this.appId;
    };

    TrelloAuthConfig.prototype.getApiKey = function () {
        return this.appKey;
    };
    return TrelloAuthConfig;
})();
exports.TrelloAuthConfig = TrelloAuthConfig;

//@ sourceMappingURL=config.js.map
