import Anthropic from '@anthropic-ai/sdk';

// La key queda expuesta en el bundle del navegador: usar solo en dev/portfolio.
// Para producción, mover esta llamada a un backend o serverless function.
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

const stripFences = (text) =>
  text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

export async function generateConcepts({ genre, mood, mechanic }) {
  const response = await client.messages.create({
    model: 'claude-opus-5',
    max_tokens: 4096,
    output_config: { effort: 'low' },
    messages: [
      {
        role: 'user',
        content: `Generate 3 unique game concepts with these parameters:
Genre: ${genre}
Mood: ${mood}
Core Mechanic: ${mechanic}

Return ONLY valid JSON (no markdown, no backticks) with this exact structure:
{
  "concepts": [
    {
      "title": "Game Title",
      "pitch": "One sentence pitch",
      "mechanics": "How the core mechanic works",
      "target_audience": "Who should play this"
    }
  ]
}`,
      },
    ],
  });

  if (response.stop_reason === 'refusal') {
    throw new Error('The model declined this request');
  }

  const text = response.content.find((b) => b.type === 'text')?.text ?? '';
  const parsed = JSON.parse(stripFences(text));
  if (!Array.isArray(parsed.concepts)) {
    throw new Error('Unexpected response shape');
  }
  return parsed.concepts;
}
