"use server";
import { Groq } from 'groq-sdk';

export async function generateScript({ topic, persona, tone }: { topic: string, persona: string, tone: string }) {
  console.log("Generating script...inside generateScript");
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  const prompt = `
Write a long-form (3000+ word) YouTube video script for a [${persona}] persona on the topic: "${topic}".
Use a [${tone}] tone. The script should include:
- A strong hook in the first 30 seconds
- Pacing designed for retention
- Engaging story beats and cliffhangers
- Sections every 30-60 seconds to reset viewer attention.
`;

  const response = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 4000,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || 'Failed to generate content';
}
