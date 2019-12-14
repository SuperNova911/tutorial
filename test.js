require('dotenv').config();

let status = 0;

const testToken = process.env.SLACK_TESTER_TOKEN;
const testChannel = process.env.TESTING_CHANNEL;
const testUser = process.env.TESTING_USER;
const { RTMClient, LogLevel } = require('@slack/rtm-api');

const rtm = new RTMClient(testToken);

rtm.start().catch(console.error);

rtm.on('ready', async () => {
  const res = await rtm.sendMessage('테스트를 시작합니다.', testChannel);
  console.log('보낸 메시지: 테스트를 시작합니다.');
  status++;
});

rtm.on('message', (message) => {
  const { text } = message;
  if (message.user == testUser) {
    switch (status) {
      case 1:
        if (text != '안녕하세요. 놀이, 유튜브 중에 말씀해주세요 XD') {
	  console.log('테스트 실패: 기본 메시지');
	  process.exit(1);
        }
        console.log('받은 메시지: ', text);
        rtm.sendMessage('놀이', testChannel);
        status++;
        break;
      case 2:
        console.log('보낸 메시지: 놀이');
        if (text != '받아쓰기 놀이를 시작합니다. "나는 바보 입니다" 를 입력하세요!') {
	  console.log('테스트 실패: 놀이');
	  process.exit(1);
        }
        console.log('받은 메시지: ', text);
        rtm.sendMessage('유튜브', testChannel);
        status++;
        break;
      case 3:
        console.log('보낸 메시지: 유튜브');
        if (text != 'YouTube 추천 영상을 플레이 합니다, 3..2..1....') {
	  console.log('테스트 실패: 유튜브');
	  process.exit(1);
        }
        console.log('받은 메시지: ', text);
        console.log('테스트가 정상 종료되었습니다.');
        process.exit(0);
        break;
      default:
        console.log('테스트가 이상 상태입니다.');
    }
  }
});
