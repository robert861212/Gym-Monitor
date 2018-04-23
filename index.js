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

var count = 0;
// hours
var rule = new schedule.RecurrenceRule();
//rule.minute = 59;
rule.second = 59;
schedule.scheduleJob(rule, function(){
   db.collection('hours', function(er, collection) { 
      var now = new Date();
      var hour = now.getHours();
      hour -= 4;
      if (hour < 0)
      {
         hour += 24;
      }
      db.collection('increments', function(er, collection) {
         collection.find({}).toArray(function(err, results) {
            var count = 0;
            for (var i = 0; i < results.length; i++)
            {
               count += parseFloat(results[i].increment);
            }
         
            var toInsert = {};
            var key = hour.toString();

            if (hour == 0)
               toInsert[0] = count;
            else if (hour == 1)
               toInsert[1] = count;
            else if (hour == 2)
               toInsert[2] = count;
            else if (hour == 3)
               toInsert[3] = count;
            else if (hour == 4)
               toInsert[4] = count;
            else if (hour == 5)
               toInsert[5] = count;
            else if (hour == 6)
               toInsert[6] = count;
            else if (hour == 7)
               toInsert[7] = count;
            else if (hour == 8)
               toInsert[8] = count;
            else if (hour == 9)
               toInsert[9] = count;
            else if (hour == 10)
               toInsert[10] = count;
            else if (hour == 11)
               toInsert[11] = count;
            else if (hour == 12)
               toInsert[12] = count;
            else if (hour == 13)
               toInsert[13] = count;
            else if (hour == 14)
               toInsert[14] = count;
            else if (hour == 15)
               toInsert[15] = count;
            else if (hour == 16)
               toInsert[16] = count;
            else if (hour == 17)
               toInsert[17] = count;
            else if (hour == 18)
               toInsert[18] = count;
            else if (hour == 19)
               toInsert[19] = count;
            else if (hour == 20)
               toInsert[20] = count;
            else if (hour == 21)
               toInsert[21] = count;
            else if (hour == 22)
               toInsert[22] = count;
            else if (hour == 23)
               toInsert[23] = count;
            JSON.stringify(toInsert);
            db.collection('hours', function(error, coll) {
               coll.insert(toInsert, function(error, saved) {
               });
            });      
         });
      });         
   });
});

// app.get('/test', function(request, response) {
//    response.header("Access-Control-Allow-Origin", "*");
//    response.header("Access-Control-Allow-Headers", "X-Requested-With");
//    response.set('Content-Type', 'text/html');
   
//    db.collection('hours', function(er, collection) { 
//       var now = new Date();
//       var hour = now.getHours();
//       db.collection('increments', function(er, collection) {
//          collection.find({}).toArray(function(err, results) {
//             var count = 0;
//             for (var i = 0; i < results.length; i++)
//             {
//                count += parseFloat(results[i].increment);
//             }

         
//             var toInsert = {};
//             var key = hour.toString();

//             if (hour == 0)
//                toInsert[0] = count;
//             else if (hour == 1)
//                toInsert[1] = count;
//             else if (hour == 2)
//                toInsert[2] = count;
//             else if (hour == 3)
//                toInsert[3] = count;
//             else if (hour == 4)
//                toInsert[4] = count;
//             else if (hour == 5)
//                toInsert[5] = count;
//             else if (hour == 6)
//                toInsert[6] = count;
//             else if (hour == 7)
//                toInsert[7] = count;
//             else if (hour == 8)
//                toInsert[8] = count;
//             else if (hour == 9)
//                toInsert[9] = count;
//             else if (hour == 10)
//                toInsert[10] = count;
//             else if (hour == 11)
//                toInsert[11] = count;
//             else if (hour == 12)
//                toInsert[12] = count;
//             else if (hour == 13)
//                toInsert[13] = count;
//             else if (hour == 14)
//                toInsert[14] = count;
//             else if (hour == 15)
//                toInsert[15] = count;
//             else if (hour == 16)
//                toInsert[16] = count;
//             else if (hour == 17)
//                toInsert[17] = count;
//             else if (hour == 18)
//                toInsert[18] = count;
//             else if (hour == 19)
//                toInsert[19] = count;
//             else if (hour == 20)
//                toInsert[20] = count;
//             else if (hour == 21)
//                toInsert[21] = count;
//             else if (hour == 22)
//                toInsert[22] = count;
//             else if (hour == 23)
//                toInsert[23] = count;
//             JSON.stringify(toInsert);
//             db.collection('hours', function(error, coll) {
//                coll.insert(toInsert, function(error, saved) {
//                   response.send("insert");
//                });
//             });      
//          });
//       });         
//    });
// });












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