// 강해상 표정 타입
export type KangHaesangEmotion = 'normal' | 'angry' | 'surprised' | 'broken' | 'crying';

// 질문 타입
export interface Question {
  id: number;
  text: string;
  emotion: KangHaesangEmotion;
  answer: string;
  audioFile?: string;
  anger?: number;      // 열받음 수치
  remorse?: number;    // 반성 수치
  isCCTVClean?: boolean;
}

// 게임 상태
export type GameState = 'video' | 'intro' | 'playing' | 'ended';

// 라운드 (총 4라운드)
export interface RoundData {
  round: number;
  questions: Question[];
}

// 게임 결과
export interface GameResult {
  endingType: 'anger' | 'remorse' | 'none';
  finalAnger: number;
  finalRemorse: number;
}
