const joi = require('joi');
const azure = require('azure');

try {
  const connConfig = require('./config.js');

  const envVarsSchema = joi.object({
    CONN_STRING: joi.string().required(),
  }).required();

  // validate process.env
  const { error, value: envVars } = joi.validate(connConfig, envVarsSchema);
  if (error) throw new Error(`Config validation error: ${error.message}`);

  const azureServiceBus = azure.createServiceBusService(envVars.CONN_STRING);

  module.exports = azureServiceBus;
} catch (err) {
  console.log();
  console.log('A config.js file must exist in the root directory of this project.');
  console.log('It should resemble the following:');
  console.log();
  console.log('module.exports.CONN_STRING = \'your_azure_connection_string\'');
  console.log();
}
