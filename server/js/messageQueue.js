const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  console.log(messages);
  messages.push(message);
};

module.exports.dequeue = () => {
  if (messages.length !== 0) {
    return messages.shift();
  // } else {
  //   return '';
  }
  // returns undefined if messages array is empty
};

module.exports.messages;