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
//rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55,59];
rule.second = [59];
schedule.scheduleJob(rule, function(){
   db.collection('hours', function(er, collection) { 
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
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
         
            var toInsert = 
               {
                  "hour": hour,
                  "number": count,
               };
            JSON.stringify(toInsert);
            db.collection('hours', function(error, coll) {
                  var previous_entry = { "hour": hour};
                  coll.remove(previous_entry, function(err, coll){
                     db.collection('hours', function(error, coll) {
                        coll.insert(toInsert, function(error, saved) {
                  });
               });
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

   var result;
   // fs.readFile("script.js", 'utf8', function (err,data) {
   // result = data.replace("number7", 1);
   // response.send(result);  
   // });
   db.collection('hours', function(er, collection) {
      collection.find({}).toArray(function(err, results) {

         fs.readFile("script.js", 'utf8', function (err,data) {
         var sevenCount;
         var eightCount;
         var nineCount;
         var tenCount;
         var elevenCount;
         var twelveCount;
         var thirteenount;
         var fourteenCount;
         var fifteenCount;
         var sixteenCount;
         var seventeenCount;
         var eighteenCount;
         var nineteenCount;
         var twentyCount;
         var twentyoneCount;
         var twentytwoCount;
         for (var i = 0; i < results.length; i++)
         {
            if (results[i].hour == 7)
               sevenCount = results[i].number;
            else if (results[i].hour == 8)
               eightCount = results[i].number;
            else if (results[i].hour == 9)
               nineCount = results[i].number;
            else if (results[i].hour == 10)
               tenCount = results[i].number;
            else if (results[i].hour == 11)
               elevenCount = results[i].number;
            else if (results[i].hour == 12)
               twelveCount = results[i].number;
            else if (results[i].hour == 13)
               thirteenount = results[i].number;
            else if (results[i].hour == 14)
               fourteenCount = results[i].number;
            else if (results[i].hour == 15)
               fifteenCount = results[i].number;
            else if (results[i].hour == 16)
               sixteenCount = results[i].number;
            else if (results[i].hour == 17)
               seventeenCount = results[i].number;
            else if (results[i].hour == 18)
               eighteenCount = results[i].number;
            else if (results[i].hour == 19)
               nineteenCount = results[i].number;
            else if (results[i].hour == 20)
               twentyCount = results[i].number;
            else if (results[i].hour == 21)
               twentyoneCount = results[i].number;
            else if (results[i].hour == 22)
               twentytwoCount = results[i].number;
         }
         result = data.replace("number7", sevenCount);
         result = result.replace("number8", eightCount);
         result = result.replace("number9", nineCount);
         result = result.replace("number10", tenCount);
         result = result.replace("number11", elevenCount);
         result = result.replace("number12", twelveCount);
         result = result.replace("number13", thirteenount);
         result = result.replace("number14", fourteenCount);
         result = result.replace("number15", fifteenCount);
         result = result.replace("number16", sixteenCount);
         result = result.replace("number17", seventeenCount);
         result = result.replace("number18", eighteenCount);
         result = result.replace("number19", nineteenCount);
         result = result.replace("number20", twentyCount);
         result = result.replace("number21", twentyoneCount);
         result = result.replace("number22", twentytwoCount);
         response.send(result);  
         }); 
      });
   });
   
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