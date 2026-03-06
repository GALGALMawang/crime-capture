// Fish Audio API 서비스

let API_KEY: string | null = null;
let MODEL_ID: string | null = null;

export const setFishAudioCredentials = (apiKey: string, modelId: string) => {
  API_KEY = apiKey;
  MODEL_ID = modelId;
  console.log('Fish Audio credentials set:', { apiKey, modelId });
};

export const synthesizeSpeech = async (text: string): Promise<Blob | null> => {
  console.log('Synthesizing speech:', text);
  console.log('API Key:', API_KEY ? 'SET' : 'NOT SET');
  console.log('Model ID:', MODEL_ID);

  if (!API_KEY || !MODEL_ID) {
    console.warn('Fish Audio credentials not set. Text:', text);
    return null;
  }

  try {
    const response = await fetch('/api/fish-audio/v1/tts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        reference_id: MODEL_ID,
        format: 'mp3',
        mp3_bitrate: 128,
        latency: 'normal'
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fish Audio API error response:', errorText);
      throw new Error(`Fish Audio API error: ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log('Audio blob size:', blob.size);
    return blob;
  } catch (error) {
    console.error('Fish Audio API error:', error);
    throw error;
  }
};

export const playAudio = (blob: Blob): void => {
  console.log('Playing audio blob');
  const url = URL.createObjectURL(blob);

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioSource = audioContext.createMediaElementSource(new Audio());
  const gainNode = audioContext.createGain();

  gainNode.gain.value = 10; // 볼륨 10배 증폭

  audioSource.mediaElement.src = url;
  audioSource.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const audio = audioSource.mediaElement;
  audio.play().then(() => {
    console.log('Audio playing');
  }).catch(err => {
    console.error('Audio play error:', err);
    throw err;
  });

  audio.onended = () => {
    console.log('Audio ended');
    URL.revokeObjectURL(url);
  };
};

export const speakText = async (text: string): Promise<void> => {
  console.log('Speaking text:', text);
  try {
    const audioBlob = await synthesizeSpeech(text);
    if (audioBlob) {
      playAudio(audioBlob);
    } else {
      throw new Error('No audio blob generated');
    }
  } catch (error) {
    console.error('Speech error:', error);
    throw error;
  }
};
