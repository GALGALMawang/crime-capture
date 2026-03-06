import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const FISH_AUDIO_API_URL = 'https://api.fish.audio/v1/tts';
    const FISH_AUDIO_API_KEY = process.env.FISH_AUDIO_API_KEY;

    if (!FISH_AUDIO_API_KEY) {
      console.error('FISH_AUDIO_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(FISH_AUDIO_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FISH_AUDIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('Fish Audio API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fish Audio API error:', errorText);
      return res.status(response.status).json({
        error: response.statusText,
        details: errorText,
      });
    }

    // 오디오 파일은 직접 스트리밍으로 반환
    const audioBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'audio/mpeg';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', audioBuffer.byteLength);
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
