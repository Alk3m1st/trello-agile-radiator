var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var tsUnit = require("./tsUnit");
var config = require('../Config/config');

var TrelloConfigTests = (function (_super) {
    __extends(TrelloConfigTests, _super);
    function TrelloConfigTests() {
        _super.call(this);
        this.devApiKey = "key";
        this.devApiSecret = "secret";
        this.token = "token";
        this.trelloConfig = new config.TrelloAuthConfig(this.devApiKey, this.devApiSecret, this.token);
    }
    TrelloConfigTests.prototype.getDeveloperApiKey = function () {
        var result = this.trelloConfig.getDeveloperApiKey();

        this.areIdentical(this.devApiKey, result);
    };

    TrelloConfigTests.prototype.getDeveloperApiSecret = function () {
        var result = this.trelloConfig.getDeveloperApiSecret();

        this.areIdentical(this.devApiSecret, result);
    };

    TrelloConfigTests.prototype.getToken = function () {
        var result = this.trelloConfig.getToken();

        this.areIdentical(this.token, result);
    };
    return TrelloConfigTests;
})(tsUnit.TestClass);

var test = new tsUnit.Test();

test.addTestClass(new TrelloConfigTests());

test.showResults(test.run());

//@ sourceMappingURL=tests.js.map
