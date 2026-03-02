const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const extractSkills = require("../utils/skillExtractor");
const calculateResumeScore = require("../utils/resumeScorer");
const suggestRole = require("../utils/roleSuggester");
const matchJob = require("../utils/jobMatcher");
const generateAISummary = require("../utils/aiSummary");
const getAISuggestions = require("../utils/geminiService");
const scrapeJobs = require("../utils/jobScraper");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload + Parse route
router.post("/upload", authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    // ✅ await add kiya — ab AI se skills extract hongi
    const skills = await extractSkills(data.text);

    const score = await calculateResumeScore(data.text, skills);

    // ✅ await add kiya — ab AI se role suggest hoga
    const role = await suggestRole(skills);

    const aiSuggestions = await getAISuggestions(data.text);

    const newResume = new Resume({
      user: req.user.id,
      fileName: req.file.filename,
      extractedText: data.text,
      skills: skills,
      score: score,
      role: role,
      aiSuggestions: aiSuggestions
    });

    await newResume.save();

    res.json({
      message: "Resume uploaded, parsed & analyzed successfully",
      resumeId: newResume._id,
      skills: skills,
      score: score,
      role: role,
      aiSuggestions: aiSuggestions,
      extractedTextPreview: data.text.substring(0, 300)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing resume" });
  }
});

// Get all resumes of logged-in user
router.get("/my-resumes", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .select("-extractedText")
      .sort({ createdAt: -1 });

    res.json(resumes);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching resumes" });
  }
});

// Full Analysis for specific resume
router.get("/:id/full-analysis", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ await add kiya — ab AI se job match hoga
    const jobMatchResult = await matchJob(resume.skills, resume.role);

    res.json({
      resumeId: resume._id,
      score: resume.score,
      role: resume.role,
      skills: resume.skills,
      jobMatch: jobMatchResult,
      aiSuggestions: resume.aiSuggestions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating full analysis" });
  }
});

// Job Match for specific resume
router.get("/:id/job-match", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ await add kiya
    const jobMatchResult = await matchJob(resume.skills, resume.role);

    res.json(jobMatchResult);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error matching job" });
  }
});

// AI Summary for specific resume
router.get("/:id/ai-summary", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const summary = await generateAISummary(resume);

    res.json({ summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating AI summary" });
  }
});

// Get single resume details
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching resume details" });
  }
});

router.get("/:id/ats-score", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const Groq = require("groq-sdk");
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are an ATS (Applicant Tracking System) expert. Analyze this resume and give a detailed ATS score.

Resume Text:
${resume.extractedText}

Evaluate on these parameters:
1. Keyword Optimization (25 points) - Are relevant technical keywords present?
2. Format & Structure (20 points) - Clear sections, no tables/images/columns
3. Contact Information (10 points) - Name, email, phone, LinkedIn present?
4. Work Experience (20 points) - Proper dates, job titles, descriptions
5. Education (10 points) - Degree, institution, year mentioned
6. Skills Section (15 points) - Dedicated skills section present

Rules:
- Be strict and realistic
- Return ONLY valid JSON, no explanation

Return this exact JSON:
{
  "atsScore": 72,
  "grade": "B",
  "parameters": [
    { "name": "Keyword Optimization", "score": 18, "maxScore": 25, "feedback": "Add more role-specific keywords" },
    { "name": "Format & Structure", "score": 17, "maxScore": 20, "feedback": "Good structure, avoid tables" },
    { "name": "Contact Information", "score": 8, "maxScore": 10, "feedback": "Add LinkedIn profile URL" },
    { "name": "Work Experience", "score": 14, "maxScore": 20, "feedback": "Add quantifiable achievements" },
    { "name": "Education", "score": 9, "maxScore": 10, "feedback": "Good education section" },
    { "name": "Skills Section", "score": 12, "maxScore": 15, "feedback": "Add more technical skills" }
  ],
  "topIssues": [
    "Missing quantifiable achievements in projects",
    "No LinkedIn URL mentioned",
    "Add more industry keywords"
  ],
  "quickFixes": [
    "Add numbers to achievements (e.g. 'Improved performance by 40%')",
    "Include LinkedIn profile link",
    "Add a professional summary at the top"
  ]
}`
        }
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const atsData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (!atsData) {
      return res.status(500).json({ message: "Could not generate ATS score" });
    }

    res.json(atsData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating ATS score" });
  }
});

router.get("/:id/resources", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const jobMatchResult = await matchJob(resume.skills, resume.role);
    const missingSkills = jobMatchResult.missingSkills;

    if (!missingSkills || missingSkills.length === 0) {
      return res.json({ resources: [] });
    }

    const Groq = require("groq-sdk");
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `For each of these missing skills, suggest the best FREE learning resource.

Missing Skills: ${missingSkills.join(", ")}

Rules:
- For each skill give exactly ONE best resource
- Prefer: official docs, freeCodeCamp, roadmap.sh, MDN, GeeksforGeeks
- YouTube links format: https://www.youtube.com/results?search_query=learn+SKILLNAME+tutorial
- Return ONLY valid JSON array, no explanation

Return this exact format:
[
  {
    "skill": "React.js",
    "platform": "freeCodeCamp",
    "url": "https://www.freecodecamp.org/learn/front-end-development-libraries/",
    "type": "Course"
  }
]`
        }
      ],
      temperature: 0.1,
      max_tokens: 800,
    });

    const content = response.choices[0].message.content.trim();
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const resources = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

    res.json({ resources, missingSkills });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching resources" });
  }
});

// Job scraping route
router.get("/:id/jobs", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const jobs = await scrapeJobs(resume.role);

    res.json({ jobs, role: resume.role });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
});

module.exports = router;