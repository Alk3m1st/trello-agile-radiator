var config = require("./Config/config");
var fetcher = require("./Lib/fetcher");
var express = require("./express/server");

var index = require('./routes/index');

// need to use token after user has authenticated...
var TrelloAuthConfig = new config.TrelloAuthConfig('developerAppKey', 'developerApiSecret', 'token');

var f = new fetcher.Fetcher(TrelloAuthConfig);

var app = new express.Express();
app.init(3000);

app.addGetRoute("/index", index.index);

// Testing form post
app.addPostRoute("/index", function (req, res) {
    console.log(req.body.devAppKey);

    // test board
    f.fetch("4d5ea62fd76aa1136000000c", function (data) {
        res.send(data);
    });
});

//@ sourceMappingURL=app.js.map
