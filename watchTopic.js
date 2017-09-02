let temporarySubscriptionName;
let topicToWatch;
let done;
let connection;
let interval;

function clean() {
  temporarySubscriptionName = null;
  topicToWatch = null;
  interval = null;
  connection = null;
}

function watchTopic() {
  connection.createSubscription(topicToWatch, temporarySubscriptionName, (err) => {
    if (err) {
      console.log(err);
      clean();
      done();
    } else {
      console.log(`Created temporary subscription: ${temporarySubscriptionName}`);
      interval = setInterval(() => {
        connection.receiveSubscriptionMessage(topicToWatch, temporarySubscriptionName,
          (e, message) => {
            if (e && e !== 'No messages to receive' && e !== 'Error: NotFound') {
              console.log(`${e}`);
            } else if (message) {
              console.log(message);
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
        console.log(`Error removing the temporary subscription: ${temporarySubscriptionName}`);
      }
      console.log();
      console.log(`Deleted temporary subscription ${temporarySubscriptionName}`);

      clean();
      done();
    });
  } else {
    console.log('User calls to onSIGINT are invalid.');
  }
}

function run(sbConnection, topic, cb) {
  if (!topic) {
    console.log('You must specify a topic to watch.');
    cb();
  } else {
    temporarySubscriptionName = `temp-subscription-${Date.now()}`;
    topicToWatch = topic;
    done = cb;
    connection = sbConnection;

    console.log(`Watching topic ${topicToWatch}. Press CTRL+C to exit.`);
    watchTopic(sbConnection, temporarySubscriptionName);
  }
}

module.exports.run = run;
module.exports.onSIGINT = onSIGINT;
