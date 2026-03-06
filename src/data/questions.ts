import type { Question, RoundData } from '../types/game';

export const QUESTIONS_DATA: RoundData[] = [
  {
    round: 1,
    questions: [
      {
        id: 1,
        text: '죄송하지만, 어제 밤 10시경 어디에 계셨나요?',
        emotion: 'normal',
        answer: '10시는? 내가 팀원들하고 마포 사무실에서 일하고 있었지. 김선혜 과장이 입증해줄 수 있어.'
      },
      {
        id: 2,
        text: '피해자와 지난주 큰 싸움을 했다고 들었는데 사실인가요?',
        emotion: 'angry',
        answer: '야, 근거 없는 소리하지 마라! 우리는 그냥 업무적으로 토론했을 뿐이야. 누가 그런 헛소문을 퍼뜨린 거지?'
      },
      {
        id: 3,
        text: '목격자가 당신이 현장에서 뛰쳐나가는 걸 봤다고 하던데요?',
        emotion: 'surprised',
        answer: '뭐? 목격자라고? 어떤 목적을 가진 사람이 그런 거짓말을 한 거겠지. 당장 그 목격자를 불러와!'
      },
      {
        id: 4,
        text: '현장에서 발견된 지문이 당신 것과 일치한다고 합니다.',
        emotion: 'angry',
        answer: '이게 무슨 날조인가! 난 그 현장에 단 한 번도 간 적 없다고! 검찰이나 경찰이 제대로 수사 안 하는 거 아니야?'
      }
    ]
  },
  {
    round: 2,
    questions: [
      {
        id: 5,
        text: '피해자가 당신을 검찰에 고발할 계획이었다고 들었습니다.',
        emotion: 'surprised',
        answer: '검찰에 고발? 웃기는 소리! 그 사람이 나한테 빚이 있었지. 내가 빌려준 돈이 얼만데!'
      },
      {
        id: 6,
        text: '당신의 통화 기록에 피해자 마지막 통화가 기록되어 있습니다.',
        emotion: 'normal',
        answer: '그래, 통화했지. 당시 거래에 대해 확인하려고 했어. 그게 범죄냐?'
      },
      {
        id: 7,
        text: '주변에서 당신이 폭력적인 성향이 있다고 증언하고 있습니다.',
        emotion: 'angry',
        answer: '야! 누가 그런 소리를 해봐! 내가 누군지 알고 말하나? 근거 없는 모함이야!'
      },
      {
        id: 8,
        text: '당신이 소지한 흉기에서 피해자의 DNA가 검출되었습니다.',
        emotion: 'angry',
        answer: '그건 내 물건이 아니야! 누가 나 몰래 집어넣었겠지! 이런 식으로 나를 범인으로 몰고 싶은 거야?'
      }
    ]
  },
  {
    round: 3,
    questions: [
      {
        id: 9,
        text: '피해자의 휴대전화에 당신의 메시지가 남겨져 있었다고 합니다.',
        emotion: 'surprised',
        answer: '내 메시지? 그게 뭐였는데? 내가 평소에 하던 말인 거 아냐. 그걸 범죄 증거라고 할 수 있나?'
      },
      {
        id: 10,
        text: '당신이 피해자에게 돈을 갚으라고 위협했다는 제보가 들어왔습니다.',
        emotion: 'angry',
        answer: '야! 누가 그런 소리를 하는 거야? 그게 떼돈이라서 갚으라는 게 아니지! 내 돈인데!'
      },
      {
        id: 11,
        text: 'CCTV 영상에 당신이 피해자의 집 근처에 있는 게 찍혔습니다.',
        emotion: 'normal',
        answer: '그래, 갔었지. 약속이 있어서 가는 길이었어. 그게 범죄 증거가 될 수 있나?'
      },
      {
        id: 12,
        text: '피해자가 작성한 유서에 당신의 이름이 언급되어 있습니다.',
        emotion: 'surprised',
        answer: '뭐? 내 이름이 언급됐다고? 그 유서가 진짜인지 확인해봐야겠네. 누가 날 끌어들이려고 하는 거지?'
      }
    ]
  },
  {
    round: 4,
    questions: [
      {
        id: 13,
        text: '당신의 은행 계좌에서 큰 금액이 인출된 기록이 있습니다.',
        emotion: 'normal',
        answer: '내 돈에서 내가 인출했는데 뭐가 문제야? 투자 때문이었지.'
      },
      {
        id: 14,
        text: '피해자의 친구들이 당신을 보고 공포심을 느꼈다고 증언했습니다.',
        emotion: 'angry',
        answer: '그게 다 자네들 수사 방해하려는 거지! 내가 겁먹게 생겼나 보지?'
      },
      {
        id: 15,
        text: '사건 당일 당신의 차량이 범죄 현장 근처에서 발견되었습니다.',
        emotion: 'surprised',
        answer: '내 차라니? 누가 훔쳐 간 거겠지! 당장 경찰에 신고해야겠네!'
      },
      {
        id: 16,
        text: '마지막으로 한 말씀만 하십시오. 당신이 범인이 아닌 이유를 말씀해주세요.',
        emotion: 'normal',
        answer: '내가 살인을 할 필요가 없지. 내 방식이 그런 게 아니야. 진범을 찾아낼 테니 기다려봐.'
      }
    ]
  }
];

export const getQuestionsByRound = (round: number): Question[] => {
  return QUESTIONS_DATA.find(r => r.round === round)?.questions || [];
};
