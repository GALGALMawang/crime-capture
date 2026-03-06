# 필요한 이미지 파일들

다음 이미지 파일들을 `public/images/` 폴더에 넣어주세요:

## 배경 이미지

1. **intro-background.jpg** - 인트로 화면 배경
   - 범죄도시 느낌의 어두운 배경
   - 추천 크기: 1920x1080
   - 어두운 분위기의 도시 야경이나 경찰 관련 이미지

2. **interrogation-room.jpg** - 심문실 배경
   - 경찰 심문실 느낌의 배경
   - 추천 크기: 1920x1080
   - 어두운 심문실, 책상, 의자가 있는 이미지

## 강해상 캐릭터 이미지

3. **kang-haesang-normal.png** - 기본 표정
   - 차분하게 앉아 있는 강해상 캐릭터
   - 추천 크기: 300x400
   - 투명 배경 (PNG)

4. **kang-haesang-angry.png** - 화난 표정
   - 화가 난 표정의 강해상 캐릭터
   - 추천 크기: 300x400
   - 투명 배경 (PNG)

5. **kang-haesang-surprised.png** - 당황한 표정
   - 당황/놀란 표정의 강해상 캐릭터
   - 추천 크기: 300x400
   - 투명 배경 (PNG)

## 이미지 파일 경로 예시

```
public/
└── images/
    ├── intro-background.jpg
    ├── interrogation-room.jpg
    ├── kang-haesang-normal.png
    ├── kang-haesang-angry.png
    └── kang-haesang-surprised.png
```

## 임시 이미지로 테스트하기

이미지가 준비되지 않았다면, 빈 파일을 먼저 생성해두고 나중에 교체하세요:

```bash
touch public/images/intro-background.jpg
touch public/images/interrogation-room.jpg
touch public/images/kang-haesang-normal.png
touch public/images/kang-haesang-angry.png
touch public/images/kang-haesang-surprised.png
```

그런 다음 개발 서버를 실행하세요:
```bash
npm run dev
```
