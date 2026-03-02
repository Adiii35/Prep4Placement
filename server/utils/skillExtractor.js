const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function extractSkills(resumeText) {
  if (!resumeText) return [];

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Extract ONLY the technical skills that are EXPLICITLY mentioned under SKILLS section of this resume.

Rules:
- ONLY extract from the SKILLS section
- Do NOT extract from certifications, courses, or project descriptions
- Do NOT include skills mentioned only in course names
- Include: programming languages, frameworks, libraries, tools, databases
- Do NOT include: soft skills like "problem-solving", "agile", "responsive design"
- Return ONLY a JSON array of strings, nothing else
- Example: ["C++", "Java", "JavaScript", "React.js", "SQL", "Git"]

Resume text:
${resumeText}

Return only the JSON array:`
        }
      ],
      temperature: 0.1,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content.trim();
    
    // JSON parse karo
    const jsonMatch = content.match(/\[.*\]/s);
    if (jsonMatch) {
      const skills = JSON.parse(jsonMatch[0]);
      return [...new Set(skills)]; // duplicates hatao
    }

    return [];
  } catch (err) {
    console.error("Skill extraction error:", err);
    return [];
  }
}

module.exports = extractSkills;