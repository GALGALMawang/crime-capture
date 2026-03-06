// 강해상 표정 타입
export type KangHaesangEmotion = 'normal' | 'angry' | 'surprised';

// 질문 타입
export interface Question {
  id: number;
  text: string;
  emotion: KangHaesangEmotion;
  answer: string;
}

// 게임 상태
export type GameState = 'intro' | 'playing' | 'ended';

// 라운드 (총 4라운드)
export interface RoundData {
  round: number;
  questions: Question[];
}
