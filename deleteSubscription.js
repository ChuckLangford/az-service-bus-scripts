const config = require('./config.js');

function run(sbConnection) {
  console.log(`Attempting to delete ${config.SUBSCRIPTION} on ${config.TOPIC}`);
  sbConnection.deleteSubscription(config.TOPIC, config.SUBSCRIPTION, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Done');
    }
  });
}

module.exports.run = run;
