const play = function playFunc(rtm, channel) {
  console.log('바보 놀이 시작');
  rtm.sendMessage('받아쓰기 놀이를 시작합니다. "나는 바보 입니다" 를 입력하세요!', channel);
};

module.exports = play;
