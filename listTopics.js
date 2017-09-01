function getNext(sbConnection, numberOfTopics, skip, count) {
  let updatedCount = count;
  sbConnection.listTopics({ top: numberOfTopics, skip }, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      result.forEach((topic) => {
        console.log(topic.TopicName);
        updatedCount += 1;
      });

      if (result.length === numberOfTopics) {
        getNext(sbConnection, numberOfTopics, skip + numberOfTopics, updatedCount);
      } else {
        console.log(`Total Number of Topics: ${updatedCount}`);
      }
    }
  });
}

function run(sbConnection) {
  getNext(sbConnection, 100, 0, 0);
}

module.exports.run = run;
