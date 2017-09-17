function peakDeadLetter(output, connection, topic, subscription, cb) {
  connection.receiveSubscriptionMessage(topic, `${subscription}/$DeadLetterQueue`,
    { isPeekLock: true },
    (e, message) => {
      if (e) {
        output(`${e}`);
      } else {
        output(message);
      }
      cb();
    });
}

function run(output, sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    output('You must specify a topic and subscription.');
    cb();
  } else {
    output(`Peeking ${topic}/${subscription}/$DeadLetterQueue.`);
    peakDeadLetter(output, sbConnection, topic, subscription, cb);
  }
}

module.exports.run = run;
