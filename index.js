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

function prepareLineInput(line) {
  const trimmedLine = line.trim();
  const allArgs = trimmedLine.split(' ');
  return {
    command: allArgs[0],
    modifier1: allArgs[1],
    modifier2: allArgs[2],
  };
}

function registerSIGINTCallback(fn) {
  sigintCallback = fn;
}

rl.on('line', (line) => {
  const input = prepareLineInput(line);
  switch (input.command) {
    case 'help':
      console.log();
      console.log('Available commands:');
      console.log();
      console.log(' clear              - Clears the screen.');
      console.log(' deleteSubscription - Deletes the specified subscription.');
      console.log(' displayConfig      - Displays the current configuration.');
      console.log(' exit               - Exit this tool.');
      console.log(' listSubscriptions  - Lists all subscriptions for the specified topic.');
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
      listSubscriptions.run(sbConnection, input.modifier1, prompt);
      break;
    }
    case 'listTopics': {
      listTopics.run(sbConnection, prompt);
      break;
    }
    case 'watchTopic': {
      registerSIGINTCallback(watchTopic.onSIGINT);
      watchTopic.run(sbConnection, input.modifier1, prompt);
      break;
    }
    case 'deleteSubscription': {
      if (input.modifier1 && input.modifier2) {
        const q = `Are you sure you want to delete ${input.modifier1}/${input.modifier2}? `;
        rl.question(q, (a) => {
          if (a.match(/^y(es)?$/i)) {
            deleteSubscription.run(sbConnection, input.modifier1, input.modifier2, prompt);
          }
        });
      } else {
        console.log('You must specifiy both a topic and a subscription.');
        prompt();
      }
      break;
    }
    case 'clear': {
      rl.write(null, { ctrl: true, name: 'l' });
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
