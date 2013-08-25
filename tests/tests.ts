import tsUnit = require('tsUnit');
import config = require('../Config/config');

class TrelloConfigTests extends tsUnit.TestClass {

    private devApiKey: string = "key";
    private devApiSecret: string = "secret";
    private token: string = "token";
    private trelloConfig: config.AuthConfig;

    constructor() {
        super();
        this.trelloConfig = new config.TrelloAuthConfig(this.devApiKey, this.devApiSecret, this.token);
    }

    getDeveloperApiKey() {
        var result = this.trelloConfig.getDeveloperApiKey();

        this.areIdentical(this.devApiKey, result);
    }

    getDeveloperApiSecret() {
        var result = this.trelloConfig.getDeveloperApiSecret();

        this.areIdentical(this.devApiSecret, result);
    }

    getToken() {
        var result = this.trelloConfig.getToken();

        this.areIdentical(this.token, result);
    }
}

var test = new tsUnit.Test();
test.addTestClass(new TrelloConfigTests());
test.showResults(test.run());