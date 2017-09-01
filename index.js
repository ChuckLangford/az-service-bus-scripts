// Documentation for azure node sdk can be found here:
// http://azure.github.io/azure-sdk-for-node/

const sbConnection = require('./connection');

if (sbConnection) {
  const argument = process.argv[2];

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
