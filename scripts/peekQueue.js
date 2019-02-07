const fs = require('fs');

function sendToFile(data, output) {
  fs.appendFile('messages.txt', `${JSON.stringify(data)};;;`, (err) => {
    if (err) throw err;
  });
}

function finish(count, total, cb) {
  if (count == total) {
    cb();
    console.log('DONE');
  }
}

function run(output, sbConnection, queuePath, cb) {
  if (!queuePath) {
    output('You must specify a queue.');
    cb();
  } else {
    output(`Peeking ${queuePath}.`);
    sbConnection.getQueue(queuePath, (e, qr) => {
      if (e) {
        output(e);
      } else {
        const queueMessageCount = parseInt(qr.MessageCount);
        console.log(`Number of Failed Messages: ${queueMessageCount}`);
        let currentCount = 0;
        for (let i = 0; i < 400; i++) {
          sbConnection.receiveQueueMessage(queuePath,
            { isPeekLock: true },
            (e, message) => {
              if (e) {
                output(e);
              } else {
                sendToFile(message, output);
                output(message);
                currentCount++;
              }
              finish(currentCount, queueMessageCount, cb);
            });
        }
      }
    });
  }
}

module.exports.run = run;
