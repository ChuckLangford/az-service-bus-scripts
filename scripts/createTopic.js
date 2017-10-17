function run(output, sbConnection, topic, cb) {
  if (!topic) {
    output('Topic is required.');
    cb();
  } else {
    sbConnection.createTopicIfNotExists(topic, (error) => {
      if (error) {
        output(error);
      } else {
        output(`Topic ${topic} created or exists.`);
        cb();
      }
    });
  }
}

module.exports.run = run;
