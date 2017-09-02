const config = require('./config.js');

function run(sbConnection, cb) {
  console.log(`Attempting to delete ${config.SUBSCRIPTION} on ${config.TOPIC}`);
  sbConnection.deleteSubscription(config.TOPIC, config.SUBSCRIPTION, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Done');
    }
    cb();
  });
}

module.exports.run = run;
