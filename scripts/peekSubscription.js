function run(output, sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    output('You must specify a topic and subscription.');
    cb();
  } else {
    output(`Peeking ${topic}/${subscription}.`);
    sbConnection.receiveSubscriptionMessage(topic, subscription,
      { isPeekLock: true },
      (e, message) => {
        if (e) {
          output(e);
        } else {
          output(message);
        }
        cb();
      });
  }
}

module.exports.run = run;
