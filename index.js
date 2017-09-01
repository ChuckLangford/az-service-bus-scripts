// Documentation for azure node sdk can be found here:
// http://azure.github.io/azure-sdk-for-node/

const sbConnection = require('./connection');

if (sbConnection) {
  const argument = process.argv[2];
  const topic = process.argv[3];

  if (argument) {
    switch (argument) {
      case 'listTopics': {
        const listTopics = require('./listTopics.js');
        listTopics.run(sbConnection);
        break;
      }
      case 'listSubscriptions': {
        const listSubscriptions = require('./listSubscriptions.js');
        listSubscriptions.run(sbConnection);
        break;
      }
      case 'watchTopic': {
        const watchTopic = require('./watchTopic.js');
        watchTopic.run(sbConnection, topic);
        break;
      }
      case 'deleteSubscription': {
        const deleteSubscription = require('./deleteSubscription.js');
        deleteSubscription.run(sbConnection);
        break;
      }
      default: {
        console.log('Invalid argument');
      }
    }
  } else {
    console.log('Invalid argument');
  }
} else {
  console.log('Could not find a Service Bus connection');
}
