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

//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname ));
app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
    response.set('Content-Type', 'text/html');
   	response.sendFile("index.html", {root:__dirname});
   	//response.set('Content-Type', 'text/css');
   	//response.sendFile("style.css", {root:__dirname});
   	
});

app.get('/script.js', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/js');
   	response.sendFile("script.js", {root:__dirname});
   	
});


// app.get('/logo.png', function(request, response) {
// 	response.header("Access-Control-Allow-Origin", "*");
//    	response.header("Access-Control-Allow-Headers", "X-Requested-With");
//    	response.set('Content-Type', 'text/png');
//    	response.sendFile("logo.png", {root:__dirname});
// });

app.get('/style.css', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/css');
   	response.sendFile("style.css", {root:__dirname});
});

// app.post('/data', function(request, response) {
//    response.header("Access-Control-Allow-Origin", "*");
//    response.header("Access-Control-Allow-Headers", "X-Requested-With");
//    response.setHeader('Content-Type', 'application/json');
//    var obj = request.body;
//    if (obj.hasOwnProperty('increment'))
//    {
//       //var change = parseFloat(obj.increment);
//       response.send(JSON.stringify({parseFloat(obj.increment): 5});
//       console.log("here is change" + change);
//    }
// });


app.post('/data', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "X-Requested-With");
   response.setHeader('Content-Type', 'application/json');
   var obj = request.body;
   if (obj.hasOwnProperty('increment'))
   {
      var change = parseFloat(obj.increment);
      var toInsert = 
         {
            "increment": 1,
            "created_at": new Date()
         };
      db.collection('vehicles', function(error, coll) {
         coll.insert(toInsert, function(error, saved) {
         });
      });
   }
});


// db.collection('day', function(er, collection) {
//       collection.find({}).toArray(function(err, results) {
//          var sendback = {};
//          var key = 'passengers';
//          var indexPage = '';
//          for (var i = results.length - 1; i >= 0; i--)
//          {
//             indexPage += results[i].username + " requested a vehicle at " +
//             results[i].lat + ", " + results[i].lng + " on " + results[i].created_at + " .<br>";
//          }
//          response.send(indexPage);
//       });   
//    });


app.listen(process.env.PORT || 3000);
