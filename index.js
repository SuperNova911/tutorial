require('dotenv').config();
const { RTMClient } = require('@slack/rtm-api');

const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
rtm.start();

const play = require('./play');
const youtube = require('./youtube');

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;
console.log(message.user);
  switch (text) {
    case '놀이':
      play(rtm, channel);
      break;
    case '유튜브':
      youtube(rtm, channel);
      break;
    default:
		  rtm.sendMessage('안녕하세요. 놀이, 유튜브 중에 말씀해주세요 XD', channel);
      break;
  }
});
