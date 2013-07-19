var config = require("./Config/config");
var fetcher = require("./Lib/fetcher");

var TrelloAuthConfig = new config.TrelloAuthConfig('api key here', 'api secret here', 'token here');

var f = new fetcher.Fetcher(TrelloAuthConfig);
f.fetch("board id here");

//@ sourceMappingURL=app.js.map
