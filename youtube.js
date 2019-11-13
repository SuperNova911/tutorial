const youtube = function youtubeFunc(rtm, channel) {
  console.log('YouTube 추천 영상 플레이');
  rtm.sendMessage('YouTube 추천 영상을 플레이 합니다, 3..2..1....', channel);
};

module.exports = youtube;
