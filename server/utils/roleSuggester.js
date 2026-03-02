const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function suggestRole(skills) {
  if (!skills || skills.length === 0) return "Software Developer";

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Based on these technical skills, suggest the MOST appropriate job role.

Skills: ${skills.join(", ")}

Rules:
- Return ONLY one role name, nothing else
- Choose from these roles based on skills:
  * "Frontend Developer" — if mainly HTML, CSS, React, Vue, Angular
  * "Backend Developer" — if mainly Node.js, Express, Django, Spring, FastAPI, PHP
  * "Full Stack Developer" — if both frontend AND backend skills present
  * "Machine Learning Engineer" — if ML/DL skills like TensorFlow, PyTorch, Scikit-learn
  * "Data Scientist" — if Python, Pandas, NumPy, Data Analysis, Statistics
  * "AI/ML Developer" — if AI tools, LLMs, OpenAI, NLP present
  * "DevOps Engineer" — if Docker, Kubernetes, CI/CD, AWS, Jenkins
  * "Android Developer" — if Kotlin, Android, Java (mobile)
  * "iOS Developer" — if Swift, Xcode, iOS
  * "Java Developer" — if mainly Java, Spring Boot
  * "Python Developer" — if mainly Python but no ML
  * "Software Developer" — if mixed or unclear skills

Return ONLY the role name, no explanation:`
        }
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

    const role = response.choices[0].message.content.trim();
    return role;

  } catch (err) {
    console.error("Role suggestion error:", err);
    
    // Fallback — basic check
    const lowerSkills = skills.map(s => s.toLowerCase());
    
    const hasFrontend = ["react", "vue", "angular", "html", "css"].some(s => lowerSkills.includes(s));
    const hasBackend = ["node.js", "express", "django", "spring", "fastapi"].some(s => lowerSkills.includes(s));
    const hasML = ["tensorflow", "pytorch", "scikit-learn", "machine learning"].some(s => lowerSkills.includes(s));

    if (hasFrontend && hasBackend) return "Full Stack Developer";
    if (hasFrontend) return "Frontend Developer";
    if (hasBackend) return "Backend Developer";
    if (hasML) return "Machine Learning Engineer";
    return "Software Developer";
  }
}

module.exports = suggestRole;