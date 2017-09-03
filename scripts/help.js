function run(output, cb) {
  output();
  output('Available commands:');
  output();
  output(' clear                - Clears the screen.');
  output(' deleteSubscription   - Deletes the specified subscription.');
  output(' displayConfig        - Displays the current configuration.');
  output(' exit                 - Exit this tool.');
  output(' listSubscriptions    - Lists all subscriptions for the specified topic.');
  output(' listTopics           - Lists all topics for the current Service Bus connection. Also displays a count of topics.');
  output(' subscriptionMsgCount - Displays the current count of messages in the specified subscription.');
  output(' watchTopic           - Creates a temporary subscription on the configured topic and displays incoming messages.');
  cb();
}

module.exports.run = run;
