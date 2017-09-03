function run(sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    console.log('Both topic and subscription are required.');
    cb();
  } else {
    sbConnection.getSubscription(topic, subscription, (err, response) => {
      if (err) {
        console.log(err);
        cb();
      } else {
        console.log(response.CountDetails);
        cb();
      }
    });
  }
}

module.exports.run = run;
