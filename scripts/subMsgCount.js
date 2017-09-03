function run(output, sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    output('Both topic and subscription are required.');
    cb();
  } else {
    sbConnection.getSubscription(topic, subscription, (err, response) => {
      if (err) {
        output(err);
        cb();
      } else {
        output(response.CountDetails);
        cb();
      }
    });
  }
}

module.exports.run = run;
