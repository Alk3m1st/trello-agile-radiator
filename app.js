var config = require("./Config/config");
var fetcher = require("./Lib/fetcher");

var TrelloAuthConfig = new config.TrelloAuthConfig('ee2686b2d20479cc381a056cdf6c8bf6', 'aac6e3295645746c2180105b251144024beaa59d8ca8e54bf2fd4568560768be', '28875dada6de5cf51a9954c9796acf9687180569bd5d9cf5293470788a03adab');

var f = new fetcher.Fetcher(TrelloAuthConfig);
f.fetch("4d5ea62fd76aa1136000000c");

//@ sourceMappingURL=app.js.map
