const config = require('./config');

function run(cb) {
  console.log();
  console.log(`CONN_STRING: ${config.CONN_STRING}`);
  console.log();
  cb();
}

module.exports.run = run;
