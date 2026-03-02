const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function calculateResumeScore(resumeText, skills) {
  if (!resumeText) return 0;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are a professional resume evaluator. Score this resume out of 100.

Resume Text:
${resumeText}

Detected Skills: ${skills.join(", ")}

Evaluate based on these criteria:
1. Skills relevance and depth (25 points)
2. Projects quality and description (25 points)
3. Education background (15 points)
4. Certifications and courses (10 points)
5. Resume structure and completeness (10 points)
6. Experience or internships (15 points)

Rules:
- Be realistic and fair
- A fresher with good projects should score 50-70
- Someone with internship experience should score 65-80
- Only return a single number between 0 and 100
- No explanation, just the number

Return ONLY the number:`
        }
      ],
      temperature: 0.1,
      max_tokens: 10,
    });

    const content = response.choices[0].message.content.trim();
    const score = parseInt(content.match(/\d+/)?.[0] || "50");
    return Math.min(100, Math.max(0, score));

  } catch (err) {
    console.error("Resume scoring error:", err);

    // Fallback basic scoring
    let score = 0;
    const text = resumeText.toLowerCase();
    const lowerSkills = skills.map(s => s.toLowerCase());

    if (skills.length >= 5) score += 20;
    else if (skills.length >= 3) score += 10;

    if (text.includes("project")) score += 20;
    if (text.includes("internship")) score += 20;
    if (text.includes("education")) score += 10;
    if (text.includes("certification") || text.includes("course")) score += 10;
    if (lowerSkills.some(s => ["react", "node.js", "python"].includes(s))) score += 10;
    if (text.includes("github") || text.includes("git")) score += 10;

    return Math.min(100, score);
  }
}

module.exports = calculateResumeScore;