var express = require('express');
var fs = require('fs')
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

app.use(express.static(__dirname + '/public'));

//var html1 = ""
//var html1 = 
//var html1 = 
app.get('/', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "X-Requested-With");
   response.set('Content-Type', 'text/html');
   db.collection('increments', function(er, collection) {
      collection.find({}).toArray(function(err, results) {
         var count = 0;
         for (var i = 0; i < results.length; i++)
         {
            count += parseFloat(results[i].increment);
         }

         //response.send("count" + count);
         fs.readFile("index.html", 'utf8', function (err,data) {
         //   if (err) {
         //     return console.log(err);
         //   }
         
         var result = data.replace("toBeReplaced", count.toString());

         response.send(result);
         // fs.writeFile("index.html", result, 'utf8', function (err) {
         //       if (err) 
         //          return console.log(err);
         //    response.sendFile("index.html", {root:__dirname});
         // });
         });
      });
   });
   	//response.sendFile("index.html", {root:__dirname});
   	
});

app.get('/script.js', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/js');
   	response.sendFile("script.js", {root:__dirname});
   	
});


app.get('/style.css', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
   	response.header("Access-Control-Allow-Headers", "X-Requested-With");
   	response.set('Content-Type', 'text/css');
   	response.sendFile("style.css", {root:__dirname});
});

app.get('/hover.css', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "X-Requested-With");
      response.set('Content-Type', 'text/css');
      response.sendFile("hover.css", {root:__dirname});
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
            "increment": change,
            "created_at": new Date()
         };
      db.collection('increments', function(error, coll) {
         coll.insert(toInsert, function(error, saved) {
                  response.send("hi");
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
