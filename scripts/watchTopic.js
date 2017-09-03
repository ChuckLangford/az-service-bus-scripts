let temporarySubscriptionName;
let topicToWatch;
let done;
let connection;
let interval;
let createOutput;

function clean() {
  temporarySubscriptionName = null;
  topicToWatch = null;
  interval = null;
  connection = null;
  createOutput = null;
}

function watchTopic() {
  connection.createSubscription(topicToWatch, temporarySubscriptionName, (err) => {
    if (err) {
      createOutput(err);
      clean();
      done();
    } else {
      createOutput(`Created temporary subscription: ${temporarySubscriptionName}`);
      interval = setInterval(() => {
        connection.receiveSubscriptionMessage(topicToWatch, temporarySubscriptionName,
          (e, message) => {
            if (e && e !== 'No messages to receive' && e !== 'Error: NotFound') {
              if (createOutput && typeof createOutput === 'function') {
                createOutput(`${e}`);
              }
            } else if (message) {
              createOutput(message);
            }
          });
      }, 100);
    }
  });
}

function onSIGINT() {
  if (interval && topicToWatch && temporarySubscriptionName) {
    clearInterval(interval);
    connection.deleteSubscription(topicToWatch, temporarySubscriptionName, (error) => {
      if (error) {
        createOutput(`Error removing the temporary subscription: ${temporarySubscriptionName}`);
      }
      createOutput();
      createOutput(`Deleted temporary subscription ${temporarySubscriptionName}`);

      clean();
      done();
    });
  } else {
    createOutput('User calls to onSIGINT are invalid.');
  }
}

function run(output, sbConnection, topic, cb) {
  if (!topic) {
    output('You must specify a topic to watch.');
    cb();
  } else {
    temporarySubscriptionName = `temp-subscription-${Date.now()}`;
    topicToWatch = topic;
    done = cb;
    connection = sbConnection;
    createOutput = output;

    output(`Watching topic ${topicToWatch}. Press CTRL+C to exit.`);
    watchTopic();
  }
}

module.exports.run = run;
module.exports.onSIGINT = onSIGINT;
