function run(output, sbConnection, topic, subscription, cb) {
  if (!topic || !subscription) {
    output('You must specify a topic and a subscription.');
    cb();
  } else {
    sbConnection.listRules(topic, subscription, (err, rules) => {
      if (err) {
        output(err);
      } else {
        output(rules);
      }

      cb();
    });
  }
}

module.exports.run = run;
