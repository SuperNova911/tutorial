const pingpong = function (sendText) {
  require('dotenv').config();

  const testToken = process.env.SLACK_TESTER_TOKEN;
  const testChannel = process.env.TESTING_CHANNEL;
  const testUser = process.env.TESTING_USER;
  const { RTMClient } = require('@slack/rtm-api');

  const rtm = new RTMClient(testToken);
  rtm.start().catch(console.error);

  rtm.on('ready', async () => {
    const res = await rtm.sendMessage(sendText, testChannel);
  });

  rtm.on('message', (message) => {
    const { text } = message;
    if (message.user == testUser) {
      rtm.disconnect();
      return text;
    }
  });
};

module.exports = pingpong;
