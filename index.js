var express = require('express');

var bodyParser = require('body-parser');
var validator = require('validator');
var url = require("url");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

var vehicles = ["JANET", "lGhCpJCE5K", "K9m65WRQyh", "3VaFZQS9Ee", "qrsXYLSLFw", 
"TapqFEtdFF", "FwXkFfHWwT", "E1TmLM4UO6", "6VvCKigQ21", "YTBj8wiOXz", "KiztarwO7h", 
"Ein4EIwThk", "5EmzPciOP1", "dPA7wAzZoe", "QMrHmCoyCE", "oRF2MrZv83", "DsRILKPCEf", "bomkcQM8oI"];

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/html');

   	response.sendFile("index.html", {root:__dirname});
});

app.listen(process.env.PORT || 3000);
