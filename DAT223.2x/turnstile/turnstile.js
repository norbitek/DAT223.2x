var evthub = require('azure-event-hubs');

//var connStr = '<EVENT-HUB-CONNECTION-STRING>';

var client = evthub.EventHubClient.createFromConnectionString(connStr)

var readings = require('./readings.json');
var c = 0;
var keys = Object.keys(readings);
console.log("Waiting for turnstile entries...");
while (new Date().getSeconds() != 0) {
}

setInterval(function(){
  if (c < keys.length) {
    var r = readings[keys[c]];
    r.entrytime = new Date().toISOString();
    client.send({ body: r})
    console.log(r);
    c++;
  }
}, 1000);



