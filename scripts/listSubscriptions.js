function run(sbConnection, topic, cb) {
  if (!topic) {
    console.log('You must specify a topic.');
    cb();
  } else {
    sbConnection.listSubscriptions(topic, (err, subscriptions) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`TOPIC: ${topic}`);

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

      cb();
    });
  }
}

module.exports.run = run;
