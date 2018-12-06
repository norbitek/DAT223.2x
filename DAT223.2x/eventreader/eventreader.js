const { EventHubClient, EventPosition } = require('azure-event-hubs');

const connStr = 'EVENT_HUB_CONNECTION_STRING';

const client = EventHubClient.createFromConnectionString(connStr );

async function main() {

  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  };
  
  const onMessage = (eventData) => {
    console.log(eventData.body.device + ':' + eventData.body.reading);
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

