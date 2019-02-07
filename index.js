// Documentation for azure node sdk can be found here:
// http://azure.github.io/azure-sdk-for-node/

const readline = require('readline');
const sbConnection = require('./connection');
const output = require('./output/console');
const displayConfig = require('./scripts/displayConfig.js');
const listSubscriptions = require('./scripts/listSubscriptions.js');
const listTopics = require('./scripts/listTopics.js');
const watchTopic = require('./scripts/watchTopic.js');
const deleteSubscription = require('./scripts/deleteSubscription.js');
const deleteTopic = require('./scripts/deleteTopic.js');
const help = require('./scripts/help.js');
const subscriptionMsgCount = require('./scripts/subMsgCount.js');
const listRules = require('./scripts/listRules.js');
const peekDeadLetter = require('./scripts/peekDeadLetter.js');
const peekSubscription = require('./scripts/peekSubscription.js');
const createMessage = require('./scripts/createMessage.js');
const createTopic = require('./scripts/createTopic.js');
const createSubscription = require('./scripts/createSubscription.js');
const peekQueue = require('./scripts/peekQueue.js');

let sigintCallback;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'AZ-SB> ',
});

function prompt() {
  output();
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
      help.run(output, prompt);
      break;
    case 'displayConfig': {
      displayConfig.run(output, prompt);
      break;
    }
    case 'exit': {
      rl.close();
      break;
    }
    case 'listSubscriptions': {
      listSubscriptions.run(output, sbConnection, input.modifier1, prompt);
      break;
    }
    case 'listTopics': {
      listTopics.run(output, sbConnection, prompt);
      break;
    }
    case 'watchTopic': {
      registerSIGINTCallback(watchTopic.onSIGINT);
      watchTopic.run(output, sbConnection, input.modifier1, prompt);
      break;
    }
    case 'deleteSubscription': {
      if (input.modifier1 && input.modifier2) {
        const q = `Are you sure you want to delete ${input.modifier1}/${input.modifier2}? `;
        rl.question(q, (a) => {
          if (a.match(/^y(es)?$/i)) {
            deleteSubscription.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
          }
        });
      } else {
        output('You must specifiy both a topic and a subscription.');
        prompt();
      }
      break;
    }
    case 'deleteTopic': {
      if (input.modifier1) {
        const q = `Are you sure you want to delete ${input.modifier1}? `;
        rl.question(q, (a) => {
          if (a.match(/^y(es)?$/i)) {
            deleteTopic.run(output, sbConnection, input.modifier1, prompt);
          }
        });
      } else {
        output('You must specifiy a topic.');
        prompt();
      }
      break;
    }
    case 'clear': {
      rl.write(null, { ctrl: true, name: 'l' });
      break;
    }
    case 'subscriptionMsgCount': {
      subscriptionMsgCount.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
      break;
    }
    case 'listRules': {
      listRules.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
      break;
    }
    case 'peekDeadLetter': {
      peekDeadLetter.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
      break;
    }
    case 'peekSubscription': {
      peekSubscription.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
      break;
    }
    case 'peekQueue': {
      peekQueue.run(output, sbConnection, input.modifier1, prompt);
      break;
    }
    case 'createMessage': {
      createMessage.run(output, sbConnection, input.modifier1, prompt);
      break;
    }
    case 'createTopic': {
      createTopic.run(output, sbConnection, input.modifier1, prompt);
      break;
    }
    case 'createSubscription': {
      createSubscription.run(output, sbConnection, input.modifier1, input.modifier2, prompt);
      break;
    }
    default:
      output('Invalid command. Type \'help\' for a list of valid commands.');
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
    output();
    process.exit(0);
  });

output('Type \'help\' to get started.');
prompt();
