var TrelloAuthConfig = (function () {
    function TrelloAuthConfig(developerAppKey, developerApiSecret, token) {
        this.developerAppKey = developerAppKey;
        this.developerApiSecret = developerApiSecret;
        this.token = token;
    }
    TrelloAuthConfig.prototype.getDeveloperApiKey = function () {
        return this.developerAppKey;
    };

    TrelloAuthConfig.prototype.getDeveloperApiSecret = function () {
        return this.developerApiSecret;
    };

    TrelloAuthConfig.prototype.getToken = function () {
        return this.token;
    };
    return TrelloAuthConfig;
})();
exports.TrelloAuthConfig = TrelloAuthConfig;

