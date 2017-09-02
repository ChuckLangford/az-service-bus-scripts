const config = require('./config.js');

let temporarySubscriptionName;
let topicToWatch;
let done;
let connection;
let interval;

function watchTopic() {
  connection.deleteSubscription(topicToWatch, temporarySubscriptionName, (error) => {
    if (error.statusCode !== 404) {
      console.log(error);
      done();
    } else {
      connection.createSubscription(topicToWatch, temporarySubscriptionName, (err) => {
        if (err) {
          console.log(err);
          done();
        } else {
          console.log(`Created subscription: ${temporarySubscriptionName}`);
          interval = setInterval(() => {
            connection.receiveSubscriptionMessage(topicToWatch, temporarySubscriptionName,
              (e, message) => {
                if (e !== 'No messages to receive' && e !== 'Error: NotFound' && e) {
                  console.log(`Error: ${e}`);
                } else if (message) {
                  console.log(message);
                }
              });
          }, 100);
        }
      });
    }
  });
}

function onSIGINT() {
  clearInterval(interval);
  connection.deleteSubscription(topicToWatch, temporarySubscriptionName, (error) => {
    if (error) {
      console.log(`Error removing the temporary subscription: ${temporarySubscriptionName}`);
    }
    console.log();
    console.log(`Deleted subscription ${temporarySubscriptionName}`);
    done();
  });
}

function run(sbConnection, cb) {
  temporarySubscriptionName = `temp-subscription-${Date.now()}`;
  topicToWatch = config.TOPIC;
  done = cb;
  connection = sbConnection;

  console.log(`Watching topic ${topicToWatch}`);
  watchTopic(sbConnection, temporarySubscriptionName);
}

module.exports.run = run;
module.exports.onSIGINT = onSIGINT;
