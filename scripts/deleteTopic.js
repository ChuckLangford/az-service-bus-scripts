function run(output, sbConnection, topic, cb) {
  output(`Attempting to delete topic ${topic}`);
  sbConnection.deleteTopic(topic, (error) => {
    if (error) {
      output(error);
    } else {
      output('Done');
    }
    cb();
  });
}

module.exports.run = run;
