// 오디오 재생 서비스

export const playAudioFile = (audioPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('Playing audio file:', audioPath);

    const audio = new Audio(audioPath);

    audio.play().then(() => {
      console.log('Audio playing');
    }).catch(err => {
      console.error('Audio play error:', err);
      reject(err);
    });

    audio.onended = () => {
      console.log('Audio ended');
      resolve();
    };

    audio.onerror = () => {
      console.error('Audio error:', audioPath);
      reject(new Error(`Audio file not found or cannot be played: ${audioPath}`));
    };
  });
};
