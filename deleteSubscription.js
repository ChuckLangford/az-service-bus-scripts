function run(sbConnection, topic, subscription, cb) {
  console.log(`Attempting to delete ${subscription} on ${topic}`);
  sbConnection.deleteSubscription(topic, subscription, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Done');
    }
    cb();
  });
}

module.exports.run = run;
