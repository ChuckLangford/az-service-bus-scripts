const config = require('./config.js');

function watchTopic(sbConnection, topic) {
  const temporarySubscriptionName = `temp-subscription-${Date.now()}`;

  sbConnection.deleteSubscription(topic, temporarySubscriptionName, (error) => {
    if (error.statusCode !== 404) {
      console.log(error);
    } else {
      sbConnection.createSubscription(topic, temporarySubscriptionName, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Created subscription: ${temporarySubscriptionName}`);
          setInterval(() => {
            sbConnection.receiveSubscriptionMessage(topic, temporarySubscriptionName,
              (e, message) => {
                if (e !== 'No messages to receive' && e) {
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

  process.on('SIGINT', () => {
    sbConnection.deleteSubscription(topic, temporarySubscriptionName, (error) => {
      if (error) {
        console.log(`Error removing the temporary subscription: ${temporarySubscriptionName}`);
      }
      console.log();
      console.log(`Deleted subscription ${temporarySubscriptionName}`);
      process.exit();
    });
  });
}

function run(sbConnection, topic) {
  let topicToWatch = topic;
  if (!topicToWatch) {
    topicToWatch = config.TOPIC;
  }

  console.log(`Watching topic ${topicToWatch}`);
  watchTopic(sbConnection, topicToWatch);
}

module.exports.run = run;
