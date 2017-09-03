function run(output, sbConnection, topic, subscription, cb) {
  output(`Attempting to delete ${subscription} on ${topic}`);
  sbConnection.deleteSubscription(topic, subscription, (error) => {
    if (error) {
      output(error);
    } else {
      output('Done');
    }
    cb();
  });
}

module.exports.run = run;
