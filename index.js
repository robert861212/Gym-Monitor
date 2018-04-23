var express = require('express');
var fs = require('fs')
var bodyParser = require('body-parser');
var validator = require('validator');
var url = require("url");
var schedule = require('node-schedule');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	 db = databaseConnection;
});

app.use(express.static(__dirname + '/public'));

// var count = 0;
// // hours
// var rule = new schedule.RecurrenceRule();
// rule.minute = 27;
// var j = schedule.scheduleJob(rule, function(){
//    // might need to check if its 7 am and to add the previous hr to current count
//    db.collection('hours', function(er, collection) {
//       previous_hour = (hour - 1).toString();
//       collection.findOne({previous_hour}, function(err, document) {
//          var count = parseFloat(document.previous_hour);
//          var now = new Date;
//          var hour = now.getHours();
//          db.collection('increments', function(er, collection) {
//             collection.find({}).toArray(function(err, results) {
//                for (var i = 0; i < results.length; i++)
//                {
//                   count += parseFloat(results[i].increment);
//                }

//                var toInsert = 
//                {
//                   hour.toString(): count.toString(),
//                };
//                db.collection('hours', function(error, coll) {
//                   coll.insert(toInsert, function(error, saved) {
//                   });
//                });      
//             });
//          }); 
//       });        
//    });
// });

app.get('/test', function(request, response) {
   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "X-Requested-With");
   response.set('Content-Type', 'text/html');
   
   db.collection('hours', function(er, collection) { 
      var now = new Date();
      var hour = now.getHours();
      db.collection('increments', function(er, collection) {
         collection.find({}).toArray(function(err, results) {
            var count = 0;
            for (var i = 0; i < results.length; i++)
            {
               count += parseFloat(results[i].increment);
            }

            // var toInsert = "{" + hour.toString() + ":" + count.toString() + "}";
            // JSON.stringify(toInsert);
            var toInsert = 
            {
               0: count.toString()
            };
            db.collection('hours', function(error, coll) {
               coll.insert(toInsert, function(error, saved) {
                  response.send("insert");
               });
            });      
         });
      });         
   });
});












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

         fs.readFile("index.html", 'utf8', function (err,data) {
         var result = data.replace("toBeReplaced", count.toString());
         result = result.replace("drawCircle", "<figcaption>" + count.toString() + " People</figcaption>");
         response.send(result);
         });
      });
   });
   	
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

app.listen(process.env.PORT || 3000);