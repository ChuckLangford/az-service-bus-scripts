function run(output, cb) {
  output();
  output('Available commands:');
  output();
  output(' clear                - Clears the screen.');
  output(' createMessage        - Creates a message on the specified topic. Note you must edit the createMessage script for this to work.');
  output(' createSubscription   - Creates the specified subscription.');
  output(' createTopic          - Creates the specified topic.');
  output(' deleteSubscription   - Deletes the specified subscription.');
  output(' deleteTopic          - Deletes the specified topic.');
  output(' displayConfig        - Displays the current configuration.');
  output(' exit                 - Exit this tool.');
  output(' listRules            - Lists all rules for a subscription.');
  output(' listSubscriptions    - Lists all subscriptions for the specified topic.');
  output(' listTopics           - Lists all topics for the current Service Bus connection. Also displays a count of topics.');
  output(' peekDeadLetter       - Displays first retrieved message in specified dead letter queue.');
  output(' peekSubscription     - Peeklocks and displays first retrieved message in the specified subscription.');
  output(' subscriptionMsgCount - Displays the current count of messages in the specified subscription.');
  output(' watchTopic           - Creates a temporary subscription on the configured topic and displays incoming messages.');
  cb();
}

module.exports.run = run;
