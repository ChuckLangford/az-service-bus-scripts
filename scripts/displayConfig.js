const config = require('../config');

function run(output, cb) {
  output();
  output(`CONN_STRING: ${config.CONN_STRING}`);
  output();
  cb();
}

module.exports.run = run;
