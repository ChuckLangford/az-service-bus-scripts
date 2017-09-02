// Documentation for azure node sdk can be found here:
// http://azure.github.io/azure-sdk-for-node/

const sbConnection = require('./connection');
const readline = require('readline');
const displayConfig = require('./displayConfig.js');
const listSubscriptions = require('./listSubscriptions.js');
const listTopics = require('./listTopics.js');
const watchTopic = require('./watchTopic.js');
const deleteSubscription = require('./deleteSubscription.js');
const help = require('./help.js');
const subscriptionMsgCount = require('./subMsgCount.js');

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
      help.run(prompt);
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
    case 'subscriptionMsgCount': {
      subscriptionMsgCount.run(sbConnection, input.modifier1, input.modifier2, prompt);
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
