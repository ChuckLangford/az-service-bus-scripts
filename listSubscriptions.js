const config = require('./config.js');

function run(sbConnection) {
  sbConnection.listSubscriptions(config.TOPIC, (err, subscriptions) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`TOPIC: ${config.TOPIC}`);

      if (subscriptions.length === 0) {
        console.log();
        console.log('No subscriptions found');
      } else {
        console.log();
        console.log(`Total Count: ${subscriptions.length}`);
      }

      subscriptions.forEach((subscription) => {
        console.log(subscription.SubscriptionName);
      });
    }
  });
}

module.exports.run = run;
