// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", function(request, response) {

    let d = new Date(request.params.date_string);
    let di = new Date(Number(request.params.date_string));
    console.log(request.params.date_string + " - String: " + d + " - Number: " + di);
    if (d == "Invalid Date") {
      if (di == "Invalid Date") {
        response.json({error: d.toUTCString()});
      } else {
        response.json({unix: di.getTime(), utc: di.toUTCString()});
      }
    } else {
      response.json({unix: d.getTime(), utc: d.toUTCString()});
    }
  
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});