let done;

function getNext(output, sbConnection, numberOfTopics, skip, count) {
  let updatedCount = count;
  sbConnection.listTopics({ top: numberOfTopics, skip }, (error, result) => {
    if (error) {
      output(error);
    } else {
      result.forEach((topic) => {
        output(topic.TopicName);
        updatedCount += 1;
      });

      if (result.length === numberOfTopics) {
        getNext(output, sbConnection, numberOfTopics, skip + numberOfTopics, updatedCount);
      } else {
        output(`Total Number of Topics: ${updatedCount}`);
        done();
      }
    }
  });
}

function run(output, sbConnection, cb) {
  done = cb;
  getNext(output, sbConnection, 100, 0, 0);
}

module.exports.run = run;
