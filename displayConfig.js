const config = require('./config');

function run(cb) {
  console.log();
  console.log(`CONN_STRING: ${config.CONN_STRING}`);
  console.log(`TOPIC: ${config.TOPIC}`);
  console.log(`SUBSCRIPTION: ${config.SUBSCRIPTION}`);
  console.log();
  cb();
}

module.exports.run = run;
