import config = require('Config/config');
import fetcher = require('Lib/fetcher');
import express = require('express/server');

var TrelloAuthConfig = new config.TrelloAuthConfig('api key here', 'api secret here', 'token here');

var f = new fetcher.Fetcher(TrelloAuthConfig);

var app = new express.Express();
app.addRoute("/", function (req, res) {
    var data = f.fetch("4d5ea62fd76aa1136000000c");
    
    res.send(JSON.stringify(data));
});
app.init(3000);