# 범죄도시2 - 심문 시뮬레이션

React + TypeScript + Vite로 개발된 범죄도시2 테마의 심문 시뮬레이션 웹 게임입니다.

## 🎮 게임 특징

- **인트로 화면**: 게임 시작 버튼과 배경 이미지
- **심문 게임**: 강해상 캐릭터에게 질문을 던지고 답변을 듣습니다
- **표정 변화**: 질문에 따라 강해상이 기본/화남/당황 표정으로 반응합니다
- **TTS 음성**: Fish Audio API를 통해 강해상의 목소리로 답변을 들을 수 있습니다
- **4라운드 구성**: 총 4라운드 동안 심문이 진행됩니다

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Fish Audio API 설정

`.env.example` 파일을 복사하여 `.env` 파일을 만들고 Fish Audio API Key와 Model ID를 입력하세요:

```bash
cp .env.example .env
```

`.env` 파일에 다음 내용을 입력하세요:

```env
VITE_FISH_AUDIO_API_KEY=your_fish_audio_api_key_here
VITE_FISH_AUDIO_MODEL_ID=your_fish_audio_model_id_here
```

### 3. 이미지 파일 준비

`IMAGES.md` 파일을 참고하여 필요한 이미지를 `public/images/` 폴더에 넣어주세요.

### 4. 개발 서버 실행

```bash
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── IntroScreen.tsx   # 인트로 화면
│   ├── GameScreen.tsx    # 게임 화면
│   ├── EndingScreen.tsx  # 엔딩 화면
│   ├── KangHaesang.tsx   # 강해상 캐릭터 컴포넌트
│   └── QuestionSelector.tsx  # 질문 선택 컴포넌트
├── data/
│   └── questions.ts      # 질문 데이터
├── services/
│   └── fishAudioService.ts  # Fish Audio API 연동
├── types/
│   └── game.ts          # 타입 정의
└── App.tsx              # 메인 컴포넌트
```

## 🎨 이미지 요구사항

- **intro-background.jpg**: 인트로 배경 (1920x1080)
- **interrogation-room.jpg**: 심문실 배경 (1920x1080)
- **kang-haesang-normal.png**: 기본 표정 (300x400, 투명 배경)
- **kang-haesang-angry.png**: 화난 표정 (300x400, 투명 배경)
- **kang-haesang-surprised.png**: 당황 표정 (300x400, 투명 배경)

자세한 내용은 `IMAGES.md`를 참고하세요.

## 🛠️ 사용 기술

- React 19
- TypeScript
- Vite
- Fish Audio API
- CSS3 Animations

## 📝 라이선스

This project uses the Vite React TypeScript template.
