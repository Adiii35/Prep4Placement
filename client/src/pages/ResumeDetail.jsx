import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function ResumeDetail() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [resources, setResources] = useState([]);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [atsData, setAtsData] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [showAts, setShowAts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/resume/${id}/full-analysis`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnalysis(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnalysis();
  }, [id]);

  const fetchResources = async () => {
    setResourceLoading(true);
    setShowResources(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/resume/${id}/resources`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResources(res.data.resources);
    } catch (err) {
      console.log(err);
    } finally {
      setResourceLoading(false);
    }
  };

  const fetchAtsScore = async () => {
  setAtsLoading(true);
  setShowAts(true);
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:5000/api/resume/${id}/ats-score`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAtsData(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setAtsLoading(false);
  }
};

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#060B14" }}>
        <motion.div className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="w-16 h-16 border-4 border-t-transparent rounded-full"
            style={{ borderColor: "rgba(99,102,241,0.3)", borderTopColor: "#6366f1" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="font-semibold text-lg" style={{ color: "#818CF8" }}>Analyzing Resume...</p>
        </motion.div>
      </div>
    );
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return "linear-gradient(90deg, #10B981, #34D399)";
    if (score >= 60) return "linear-gradient(90deg, #F59E0B, #FBBF24)";
    return "linear-gradient(90deg, #EF4444, #F87171)";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return { text: "Excellent 🌟", color: "#34D399" };
    if (score >= 60) return { text: "Good 👍", color: "#FBBF24" };
    return { text: "Needs Work 💪", color: "#F87171" };
  };

  const scoreLabel = getScoreLabel(analysis.score);

  const formatLine = (line) => {
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const aiLines = analysis.aiSuggestions
    ? analysis.aiSuggestions.split("\n").filter((l) => l.trim() !== "")
    : [];

  const cardStyle = {
    backgroundColor: "#0D1526",
    border: "1px solid rgba(255,255,255,0.07)"
  };

  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ backgroundColor: "#060B14" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-3xl mx-auto space-y-5 relative z-10">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 font-semibold text-sm"
          style={{ color: "#6366f1" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}>
          ← Back to Dashboard
        </motion.button>

        {/* Header */}
        <motion.div
          className="rounded-2xl p-8 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1e1b4b, #2e1065)", border: "1px solid rgba(99,102,241,0.3)" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}>
          <motion.span className="text-5xl"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}>
            📊
          </motion.span>
          <h2 className="text-3xl font-bold mt-3">Resume Analysis Report</h2>
          <p className="mt-1 text-sm" style={{ color: "#818CF8" }}>AI-powered insights for your career</p>
        </motion.div>

        {/* Score Card */}
        <motion.div className="rounded-2xl p-6" style={cardStyle}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }} whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.3)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white text-lg">📈 Resume Score</h3>
            <span className="font-bold text-lg" style={{ color: scoreLabel.color }}>
              {scoreLabel.text}
            </span>
          </div>
          <div className="w-full rounded-full h-4 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-4 rounded-full"
              style={{ background: getScoreGradient(analysis.score) }}
              initial={{ width: 0 }}
              animate={{ width: `${analysis.score}%` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: "#334155" }}>0</span>
            <motion.span className="text-2xl font-bold" style={{ color: "#818CF8" }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}>
              {analysis.score}/100
            </motion.span>
            <span className="text-xs" style={{ color: "#334155" }}>100</span>
          </div>
        </motion.div>

        {/* Role Card */}
        <motion.div className="rounded-2xl p-6" style={cardStyle}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }} whileHover={{ y: -3, borderColor: "rgba(52,211,153,0.3)" }}>
          <h3 className="font-bold text-white text-lg mb-3">💼 Suggested Role</h3>
          <div className="rounded-xl p-4" style={{
            backgroundColor: "rgba(52,211,153,0.08)",
            border: "1px solid rgba(52,211,153,0.2)"
          }}>
            <p className="text-2xl font-bold" style={{ color: "#34D399" }}>{analysis.role}</p>
            <p className="text-sm mt-1" style={{ color: "#10B981" }}>Best match based on your skills</p>
          </div>
        </motion.div>

        {/* Skills Card */}
        <motion.div className="rounded-2xl p-6" style={cardStyle}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }} whileHover={{ y: -3, borderColor: "rgba(99,102,241,0.3)" }}>
          <h3 className="font-bold text-white text-lg mb-4">🛠️ Detected Skills</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, index) => (
              <motion.span key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: "rgba(99,102,241,0.15)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}>
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Job Match Card */}
        <motion.div className="rounded-2xl p-6" style={cardStyle}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }} whileHover={{ y: -3, borderColor: "rgba(192,132,252,0.3)" }}>
          <h3 className="font-bold text-white text-lg mb-4">🎯 Job Match</h3>

          <div className="flex items-center gap-4 mb-5">
            <motion.div className="relative w-20 h-20"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}>
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#8B5CF6" strokeWidth="3"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${analysis.jobMatch.matchPercentage}, 100` }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold" style={{ color: "#C084FC" }}>
                  {analysis.jobMatch.matchPercentage}%
                </span>
              </div>
            </motion.div>

            <div>
              <p className="text-2xl font-bold" style={{ color: "#C084FC" }}>
                {analysis.jobMatch.matchPercentage}% Match
              </p>
              <p className="text-sm" style={{ color: "#334155" }}>with target role requirements</p>
            </div>
          </div>

          {analysis.jobMatch.missingSkills?.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-sm" style={{ color: "#94A3B8" }}>⚠️ Missing Skills:</p>
              <div className="flex flex-wrap gap-2">
                {analysis.jobMatch.missingSkills.map((skill, index) => (
                  <motion.span key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#F87171", border: "1px solid rgba(239,68,68,0.2)" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}>
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* AI Suggestions Card */}
        {analysis.aiSuggestions && (
          <motion.div className="rounded-2xl p-6"
            style={{ backgroundColor: "#0D1526", border: "1px solid rgba(99,102,241,0.2)" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }} whileHover={{ y: -3 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">AI Suggestions</h3>
                <p className="text-xs" style={{ color: "#6366f1" }}>Powered by Groq LLaMA</p>
              </div>
            </div>
            <div className="space-y-2">
              {aiLines.map((line, index) => (
                <motion.div key={index}
                  className="p-3 rounded-xl text-sm leading-relaxed"
                  style={{
                    backgroundColor: line.match(/^[0-9]+\./) ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
                    border: line.match(/^[0-9]+\./) ? "1px solid rgba(99,102,241,0.2)" : "none",
                    color: line.match(/^[0-9]+\./) ? "#A5B4FC" : "#64748B",
                    fontWeight: line.match(/^[0-9]+\./) ? "600" : "400",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.04 }}
                  dangerouslySetInnerHTML={{
                    __html: formatLine(
                      line.replace(/^#+\s/, '').replace(/\([^)]*\)/g, '').trim()
                    )
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ATS Score Button */}
<motion.button
  onClick={fetchAtsScore}
  className="w-full py-3 rounded-xl font-bold text-sm"
  style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)", color: "white" }}
  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(14,165,233,0.3)" }}
  whileTap={{ scale: 0.98 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.63 }}>
  {atsLoading ? "🔍 Checking ATS Score..." : "🤖 Check ATS Score"}
</motion.button>

{/* ATS Score Section */}
{showAts && (
  <motion.div className="rounded-2xl p-6"
    style={{ backgroundColor: "#0D1526", border: "1px solid rgba(14,165,233,0.2)" }}
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}>
        <span className="text-2xl">🤖</span>
      </div>
      <div>
        <h3 className="font-bold text-white text-lg">ATS Score Analysis</h3>
        <p className="text-xs" style={{ color: "#0ea5e9" }}>Applicant Tracking System Check</p>
      </div>
    </div>

    {atsLoading ? (
      <div className="flex items-center justify-center py-8">
        <motion.div
          className="w-8 h-8 border-2 border-t-transparent rounded-full"
          style={{ borderColor: "rgba(14,165,233,0.3)", borderTopColor: "#0ea5e9" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ) : atsData && (
      <div className="space-y-6">

        {/* Main Score */}
        <div className="flex items-center gap-6 p-4 rounded-xl"
          style={{ backgroundColor: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#0ea5e9" strokeWidth="3"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${atsData.atsScore}, 100` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold" style={{ color: "#0ea5e9" }}>{atsData.atsScore}</span>
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">{atsData.atsScore}<span className="text-lg text-gray-500">/100</span></p>
            <p className="text-lg font-semibold mt-1" style={{ color: "#0ea5e9" }}>Grade: {atsData.grade}</p>
            <p className="text-xs mt-1" style={{ color: "#475569" }}>ATS Compatibility Score</p>
          </div>
        </div>

        {/* Parameters */}
        <div>
          <p className="font-semibold text-white mb-3 text-sm">📊 Parameter Breakdown:</p>
          <div className="space-y-3">
            {atsData.parameters?.map((param, index) => (
              <motion.div key={index}
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-white">{param.name}</p>
                  <span className="text-xs font-bold" style={{ color: "#0ea5e9" }}>
                    {param.score}/{param.maxScore}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full rounded-full h-1.5 mb-2" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-1.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #0ea5e9, #38bdf8)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(param.score / param.maxScore) * 100}%` }}
                    transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
                  />
                </div>
                <p className="text-xs" style={{ color: "#475569" }}>💡 {param.feedback}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Issues */}
        <div>
          <p className="font-semibold text-white mb-3 text-sm">⚠️ Top Issues:</p>
          <div className="space-y-2">
            {atsData.topIssues?.map((issue, index) => (
              <motion.div key={index}
                className="flex items-start gap-2 p-3 rounded-xl text-sm"
                style={{ backgroundColor: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#F87171" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}>
                <span>❌</span>
                <span>{issue}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Fixes */}
        <div>
          <p className="font-semibold text-white mb-3 text-sm">✅ Quick Fixes:</p>
          <div className="space-y-2">
            {atsData.quickFixes?.map((fix, index) => (
              <motion.div key={index}
                className="flex items-start gap-2 p-3 rounded-xl text-sm"
                style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", color: "#34D399" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}>
                <span>✅</span>
                <span>{fix}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    )}
  </motion.div>
)}

        {/* Learn Missing Skills Button */}
        <motion.button
          onClick={fetchResources}
          className="w-full py-3 rounded-xl font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "white" }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(245,158,11,0.3)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}>
          {resourceLoading ? "🔍 Finding Resources..." : "📚 Learn Missing Skills"}
        </motion.button>

        {/* Resources Section */}
        {showResources && (
          <motion.div className="rounded-2xl p-6"
            style={{ backgroundColor: "#0D1526", border: "1px solid rgba(245,158,11,0.2)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Learning Resources</h3>
                <p className="text-xs" style={{ color: "#f59e0b" }}>AI curated resources for missing skills</p>
              </div>
            </div>

            {resourceLoading ? (
              <div className="flex items-center justify-center py-8">
                <motion.div
                  className="w-8 h-8 border-2 border-t-transparent rounded-full"
                  style={{ borderColor: "rgba(245,158,11,0.3)", borderTopColor: "#f59e0b" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <motion.a key={index}
                    href={resource.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.05)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                        <span className="text-lg">
                          {resource.type === "Video" ? "🎥" :
                           resource.type === "Course" ? "🎓" :
                           resource.type === "Docs" ? "📖" : "🔗"}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{resource.skill}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#f59e0b" }}>{resource.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#fbbf24" }}>
                        {resource.type}
                      </span>
                      <span style={{ color: "#475569" }}>→</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Find Jobs Button */}
        <motion.button
          onClick={() => navigate(`/jobs/${id}`)}
          className="w-full text-white py-4 rounded-2xl font-bold text-lg"
          style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}
          whileTap={{ scale: 0.95 }}>
          Find Jobs for {analysis.role} 💼
        </motion.button>

      </div>
    </div>
  );
}

export default ResumeDetail;