const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function getAISuggestions(resumeText) {
  try {
    const completion = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: `Analyze this resume and provide:
1. Professional Summary
2. Top 3 Strengths
3. Top 3 Improvement Suggestions

Resume:
${resumeText}

IMPORTANT: 
- Do NOT use markdown formatting like ** or ## or *
- Do NOT use brackets like (2-3 lines)
- Use plain text only
- Use numbers like 1. 2. 3. for sections`
    }
  ],
  max_tokens: 500
});

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq Error:", error.message);
    return "AI suggestions currently unavailable.";
  }
}

module.exports = getAISuggestions;