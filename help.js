function run(cb) {
  console.log();
  console.log('Available commands:');
  console.log();
  console.log(' clear              - Clears the screen.');
  console.log(' deleteSubscription - Deletes the specified subscription.');
  console.log(' displayConfig      - Displays the current configuration.');
  console.log(' exit               - Exit this tool.');
  console.log(' listSubscriptions  - Lists all subscriptions for the specified topic.');
  console.log(' listTopics         - Lists all topics for the current Service Bus connection. Also displays a count of topics.');
  console.log(' watchTopic         - Creates a temporary subscription on the configured topic and displays incoming messages.');
  cb();
}

module.exports.run = run;
