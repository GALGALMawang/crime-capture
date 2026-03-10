import type { Question, RoundData } from '../types/game';

export const QUESTIONS_DATA: RoundData[] = [
  {
    round: 1,
    questions: [
      {
        id: 1,
        text: '야, 너 어제 밤 어디 있었냐?',
        emotion: 'normal',
        answer: '10시? 내가 팀원들이랑 사무실에서 일하고 있었는데? 왜?',
        audioFile: '/audio/answer1.mp3',
        anger: 20
      },
      {
        id: 2,
        text: '니가 그 사람이랑 싸웠다며?',
        emotion: 'angry',
        answer: '야! 누가 그런 소문을 퍼뜨린 거야! 근거 없는 소리 하지 마라!',
        audioFile: '/audio/answer2.mp3',
        anger: 20
      }
    ]
  },
  {
    round: 2,
    questions: [
      {
        id: 3,
        text: '🚨 CCTV가 좀 더럽네? 닦아줄까?',
        emotion: 'surprised',
        answer: '뭐?! 야 잠깐! 그게 무슨 소리야! 변호사!',
        audioFile: '/audio/answer3.mp3',
        anger: 0,
        isCCTVClean: true
      },
      {
        id: 4,
        text: '현장에서 니 지문 나왔는데?',
        emotion: 'angry',
        answer: '이게 날 범인으로 몰려는 거야?! 내가 거기 안 갔어!',
        audioFile: '/audio/answer4.mp3',
        anger: 20
      }
    ]
  },
  {
    round: 3,
    questions: [
      {
        id: 5,
        text: '피해자가 니를 고발한다던데?',
        emotion: 'surprised',
        answer: '뭐? 고발? 웃기지 마라! 내가 빌려준 돈이 얼만데!',
        audioFile: '/audio/answer5.mp3',
        anger: 20
      },
      {
        id: 6,
        text: '🚨 CCTV 화면이 너무 흐릿하네?',
        emotion: 'angry',
        answer: '야!! 이거 불법이야! 니들 지금 뭐 하는 거야!',
        audioFile: '/audio/answer6.mp3',
        anger: 0,
        isCCTVClean: true
      }
    ]
  }
];

// 열받음 엔딩 - 이것도 승리!
export const ANGER_ENDING_DIALOGUES = [
  {
    text: "하! 니들이 날 어떻게 해? 증거 없잖아! 껄껄껄!",
    subtitle: "🔥 강해상이 폭발했습니다! (폭력 엔딩)"
  },
  {
    text: "이따위 수사 받느니 차라리 감방에 있겠다! 껄껄!",
    subtitle: "🔥 강해상이 비웃습니다! (폭력 엔딩)"
  }
];

// 반성 엔딩 - 자백 엔딩
export const REMORSE_ENDING_DIALOGUES = [
  {
    text: "흑... 흑흑... 내가 잘못했어요... 다 말할게요... 흑흑...",
    subtitle: "✨ 강해상이 울며 자백합니다! (자백 엔딩)"
  },
  {
    text: "으윽... 죄송해요... 자수할게요... 흑...",
    subtitle: "✨ 강해상이 완전히 무너졌습니다! (자백 엔딩)"
  }
];

// CCTV 가릴 때 대사들
export const CCTV_CLEAN_DIALOGUES = [
  "크억! 야! 왜 때려! 불법이야!",
  "아 윽! 니들 진짜! 그만 쳐!",
  "으윽! 마석도! 알았어! 알았다고!",
  "아악! 그만! 할게! 다 말할게!"
];

export const getQuestionsByRound = (round: number): Question[] => {
  return QUESTIONS_DATA.find(r => r.round === round)?.questions || [];
};
