function createMessage(output, connection, topic, cb) {
  // Edit this to reflect the message you want to send
  const message = {};

  const msg = {
    body: JSON.stringify(message),
  };

  connection.sendTopicMessage(topic, msg,
    (e) => {
      if (e) {
        output(`${e}`);
      }
      cb();
    });
}

function run(output, sbConnection, topic, cb) {
  if (!topic) {
    output('You must specify a topic.');
    cb();
  } else {
    output(`Creating message on ${topic}`);
    createMessage(output, sbConnection, topic, cb);
  }
}

module.exports.run = run;
