const fs = require('fs');

fs.readFile('messages.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const analysis = new Set();

  let messages = data.split(';;;');
  messages.splice(-1, 1);

  messages.forEach(msg => {
    const parsedMsg = JSON.parse(msg);
    const parsedBody = JSON.parse(parsedMsg.body);
    const errorMsg = parsedBody.errorMessage;
    const bots = parsedBody.bots;
    const isTransient = parsedBody.isTransient;
    const topic = parsedBody.message.topicName;

    // remove the domain and leading slash for New Relic grouping
    let groupedError = errorMsg.replace(/^((http[s]?):\/)?\/?([^/\s]+)\//, '');

    // replace guids in the uri for New Relic grouping purposes
    groupedError = groupedError.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi, '*');
    analysis.add(JSON.stringify({errorMsg: groupedError, isTransient, bots, topic}));
  });

  console.log('');
  console.log('UNIQUE FAILURES');
  for(let item of analysis) {
    const obj = JSON.parse(item);
    console.log('');
    console.log(`    Error:        ${obj.errorMsg}`);
    console.log(`    Is Transient: ${obj.isTransient}`);
    console.log(`    Topic:        ${obj.topic}`);
    console.log(`    Bots:         ${obj.bots}`);
    console.log('');
  }
});
