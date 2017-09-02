// Documentation for azure node sdk can be found here:
// http://azure.github.io/azure-sdk-for-node/

const sbConnection = require('./connection');
const readline = require('readline');
const displayConfig = require('./displayConfig.js');
const listSubscriptions = require('./listSubscriptions.js');
const listTopics = require('./listTopics.js');
const watchTopic = require('./watchTopic.js');
const deleteSubscription = require('./deleteSubscription.js');

let sigintCallback;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'AZ-SB> ',
});

function prompt() {
  console.log();
  rl.prompt();
}

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'help':
      console.log();
      console.log('Available commands:');
      console.log();
      console.log(' deleteSubscription - Deletes the current subscription in the configuration.');
      console.log(' displayConfig      - Displays the current configuration.');
      console.log(' exit               - Exit this tool.');
      console.log(' listSubscriptions  - Lists all subscriptions for the configured topic.');
      console.log(' listTopics         - Lists all topics for the current Service Bus connection. Also displays a count of topics.');
      console.log(' watchTopic         - Creates a temporary subscription on the configured topic and displays incoming messages.');
      prompt();
      break;
    case 'displayConfig': {
      displayConfig.run(prompt);
      break;
    }
    case 'exit': {
      rl.close();
      break;
    }
    case 'listSubscriptions': {
      listSubscriptions.run(sbConnection, prompt);
      break;
    }
    case 'listTopics': {
      listTopics.run(sbConnection, prompt);
      break;
    }
    case 'watchTopic': {
      sigintCallback = watchTopic.onSIGINT;
      watchTopic.run(sbConnection, prompt);
      break;
    }
    case 'deleteSubscription': {
      deleteSubscription.run(sbConnection, prompt);
      break;
    }
    default:
      console.log('Invalid command. Type \'help\' for a list of valid commands.');
      prompt();
      break;
  }
})
  .on('SIGINT', () => {
    if (sigintCallback && typeof sigintCallback === 'function') {
      sigintCallback();
      sigintCallback = null;
    } else {
      rl.close();
    }
  })
  .on('close', () => {
    console.log();
    process.exit(0);
  });

console.log('Type \'help\' to get started.');
prompt();
