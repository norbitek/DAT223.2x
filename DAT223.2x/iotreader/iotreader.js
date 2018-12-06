const { EventHubClient, EventPosition } = require('azure-event-hubs');

const event_hub_name = 'EVENT-HUB-COMPATIBLE-NAME'
const event_hub_endpoint = 'EVENT-HUB-COMPATIBLE-ENDPOINT'

var connStr = event_hub_endpoint + ';EntityPath=' + event_hub_name;

const client = EventHubClient.createFromConnectionString(connStr);

async function main() {

  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  };
  
  const onMessage = (eventData) => {
    console.log(JSON.stringify(eventData.body));
  };

  var ids = await client.getPartitionIds();
  for (let i = 0; i < ids.length; i++) {
    client.receive(String(ids[i]), onMessage, onError,
          { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  }
}


main().catch((err) => {
  console.log(err);
});

