const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function matchJob(skills, suggestedRole) {
  if (!skills || skills.length === 0) {
    return {
      matchPercentage: 0,
      missingSkills: [],
      role: suggestedRole || "No role detected"
    };
  }

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are a job matching expert.

Role: ${suggestedRole}
Candidate Skills: ${skills.join(", ")}

Task:
1. List the TOP 8-10 most important skills required for "${suggestedRole}"
2. Check which of those required skills the candidate has
3. Calculate match percentage
4. List missing important skills (max 5)

Rules:
- Missing skills should be REALISTIC and important for the role
- Do NOT add irrelevant skills
- Return ONLY valid JSON, no explanation

Return this exact JSON format:
{
  "requiredSkills": ["skill1", "skill2", ...],
  "matchPercentage": 75,
  "missingSkills": ["skill1", "skill2", ...]
}`
        }
      ],
      temperature: 0.1,
      max_tokens: 400,
    });

    const content = response.choices[0].message.content.trim();

    // JSON parse karo
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        role: suggestedRole,
        matchPercentage: result.matchPercentage || 0,
        missingSkills: result.missingSkills || []
      };
    }

    return {
      role: suggestedRole,
      matchPercentage: 0,
      missingSkills: []
    };

  } catch (err) {
    console.error("Job match error:", err);
    return {
      role: suggestedRole,
      matchPercentage: 0,
      missingSkills: []
    };
  }
}

module.exports = matchJob;