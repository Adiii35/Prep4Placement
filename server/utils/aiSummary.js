const axios = require('axios');
require('dotenv').config();

async function generateAISummary(resume) {
  const { role, skills, score, experience, education } = resume;

  if (!skills || skills.length === 0) {
    return "This resume does not contain enough technical information for analysis.";
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert resume reviewer. Analyze this resume data and give a professional summary with improvement tips.

Role: ${role}
Skills: ${skills.join(", ")}
Resume Score: ${score}/100
Experience: ${experience || "Not provided"}
Education: ${education || "Not provided"}

Give:
1. A 2-3 line professional summary
2. Top 3 strengths
3. Top 3 improvement suggestions
Keep it concise and professional.
    `;

    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    return response.data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("Gemini Error:", error.response?.status);
    
    // Fallback to template if AI fails
    const topSkills = skills.slice(0, 4).join(", ");
    let strengthLevel = score >= 85 ? "highly competitive" 
                      : score >= 70 ? "strong" 
                      : score >= 55 ? "developing" 
                      : "early-stage";

    return `This resume reflects a ${strengthLevel} profile for a ${role}. 
The candidate demonstrates experience in ${topSkills}. 
Resume score: ${score}/100.`;
  }
}

module.exports = generateAISummary;