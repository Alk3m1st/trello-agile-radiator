import config = require('Config/config');
import fetcher = require('Lib/fetcher');
import express = require('express/express-server');

import index = module('./routes/index');

// need to use token after user has authenticated...
var TrelloAuthConfig = new config.TrelloAuthConfig('developerAppKey',
    'developerApiSecret',
    'token');

var f = new fetcher.Fetcher(TrelloAuthConfig);

var app = new express.Express();
app.init();

app.addGetRoute("/", index.index);

// Testing form post
app.addPostRoute("/", function (req, res) {
    console.log(req.body.devAppKey);

    // test board
    f.fetch("4d5ea62fd76aa1136000000c", function (data) {
        res.send(data)
    });
});