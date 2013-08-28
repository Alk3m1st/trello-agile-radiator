var config = require("./Config/config");
var fetcher = require("./Lib/fetcher");
var express = require("./express/server");

var index = require('./routes/index');

var TrelloAuthConfig = new config.TrelloAuthConfig('developerAppKey', 'developerApiSecret', 'token');

var f = new fetcher.Fetcher(TrelloAuthConfig);

var app = new express.Express();
app.init();

app.addGetRoute("/", index.index);

app.addPostRoute("/", function (req, res) {
    console.log(req.body.devAppKey);

    f.fetch("4d5ea62fd76aa1136000000c", function (data) {
        res.send(data);
    });
});

