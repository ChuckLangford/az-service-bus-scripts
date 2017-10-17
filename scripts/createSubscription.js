function run(output, sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    output('Topic and subscription are required.');
    cb();
  } else {
    sbConnection.createSubscription(topic, subscription, (error) => {
      if (error) {
        output(error);
      } else {
        output(`Subscription ${subscription} created or exists.`);
        cb();
      }
    });
  }
}

module.exports.run = run;
