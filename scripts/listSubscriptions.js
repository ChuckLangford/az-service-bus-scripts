function run(output, sbConnection, topic, cb) {
  if (!topic) {
    output('You must specify a topic.');
    cb();
  } else {
    sbConnection.listSubscriptions(topic, (err, subscriptions) => {
      if (err) {
        output(err);
      } else {
        output(`TOPIC: ${topic}`);

        if (subscriptions.length === 0) {
          output();
          output('No subscriptions found');
        } else {
          output();
          output(`Total Count: ${subscriptions.length}`);
        }

        subscriptions.forEach((subscription) => {
          output(subscription.SubscriptionName);
        });
      }

      cb();
    });
  }
}

module.exports.run = run;
