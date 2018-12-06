var evthub = require('azure-event-hubs');

const connStr = 'EVENT_HUB_CONNECTION_STRING';

var client = evthub.EventHubClient.createFromConnectionString(connStr)
setInterval(function(){
  dev = 'dev' + String(Math.floor((Math.random() * 10) + 1));
  val = String(Math.random());
  client.send({ body: {device: dev, reading: val}}); 
  console.log(dev + ": " + val);
}, 1000);


