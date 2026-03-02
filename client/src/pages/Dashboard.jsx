import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const API = import.meta.env.VITE_API_URL;

const res = await axios.get(`${API}/api/resume/my-resumes`, {
  headers: { Authorization: `Bearer ${token}` },
});
        setResumes(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const totalResumes = resumes.length;
  const averageScore = resumes.length > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.score || 0), 0) / resumes.length) : 0;
  const highestScore = resumes.length > 0
    ? Math.max(...resumes.map((r) => r.score || 0)) : 0;

  const roleCount = {};
  resumes.forEach((r) => { if (r.role) roleCount[r.role] = (roleCount[r.role] || 0) + 1; });
  const mostCommonRole = Object.keys(roleCount).length > 0
    ? Object.keys(roleCount).reduce((a, b) => roleCount[a] > roleCount[b] ? a : b) : "N/A";

  const scoreData = resumes.map((r, index) => ({ name: `R${index + 1}`, score: r.score || 0 }));
  const roleData = Object.keys(roleCount).map((role) => ({ name: role, value: roleCount[role] }));
  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  const stats = [
    { label: "Total Resumes", value: totalResumes, color: "#818CF8", icon: "📄", glow: "rgba(99,102,241,0.15)" },
    { label: "Average Score", value: averageScore, color: "#34D399", icon: "📊", glow: "rgba(52,211,153,0.15)" },
    { label: "Highest Score", value: highestScore, color: "#FBBF24", icon: "🏆", glow: "rgba(251,191,36,0.15)" },
    { label: "Top Role", value: mostCommonRole, color: "#C084FC", icon: "💼", glow: "rgba(192,132,252,0.15)" },
  ];

  const getScoreBadge = (score) => {
    if (score >= 80) return { bg: "rgba(52,211,153,0.15)", color: "#34D399", border: "rgba(52,211,153,0.3)" };
    if (score >= 60) return { bg: "rgba(251,191,36,0.15)", color: "#FBBF24", border: "rgba(251,191,36,0.3)" };
    return { bg: "rgba(248,113,113,0.15)", color: "#F87171", border: "rgba(248,113,113,0.3)" };
  };

  if (loading) {
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
          <p className="font-semibold text-lg" style={{ color: "#818CF8" }}>Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: "#060B14" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div className="flex justify-between items-center mb-10"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user?.name} 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: "#475569" }}>
              Here's your resume analytics overview
            </p>
          </div>
          <motion.button
            onClick={() => navigate("/upload")}
            className="text-white font-semibold px-5 py-3 rounded-xl text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            + Analyze New Resume
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-2xl p-5 text-center"
              style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.3)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: stat.glow }}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-xs mb-1" style={{ color: "#475569" }}>{stat.label}</p>
              <motion.p
                className="text-3xl font-bold"
                style={{ color: stat.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        {resumes.length > 0 && (
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>

            <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-semibold mb-4 text-white">Resume Scores 📊</h3>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={scoreData}>
                  <XAxis dataKey="name" stroke="#334155" tick={{ fill: "#475569", fontSize: 12 }} />
                  <YAxis stroke="#334155" tick={{ fill: "#475569", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1526",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#E2E8F0"
                    }}
                  />
                  <Bar dataKey="score" fill="url(#darkGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="darkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-semibold mb-4 text-white">Role Distribution 🥧</h3>
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie data={roleData} dataKey="value" nameKey="name" outerRadius={90} label={{ fill: "#94A3B8", fontSize: 12 }}>
                    {roleData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1526",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#E2E8F0"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Resume List */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}>
          <h2 className="text-lg font-bold text-white mb-5">Your Resumes 📁</h2>

          {resumes.length === 0 ? (
            <motion.div
              className="rounded-2xl p-16 text-center"
              style={{ backgroundColor: "#0D1526", border: "1px dashed rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <span className="text-6xl">📭</span>
              <p className="mt-4 text-lg" style={{ color: "#475569" }}>No resumes uploaded yet.</p>
              <motion.button
                onClick={() => navigate("/upload")}
                className="mt-6 text-white font-semibold px-6 py-3 rounded-xl"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                Upload Your First Resume 🚀
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {resumes.map((resume, index) => {
                  const badge = getScoreBadge(resume.score);
                  return (
                    <motion.div
                      key={resume._id}
                      onClick={() => navigate(`/analysis/${resume._id}`)}
                      className="rounded-2xl p-5 cursor-pointer"
                      style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.3)", boxShadow: "0 10px 30px rgba(99,102,241,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(99,102,241,0.15)" }}>
                          <span className="text-2xl">📄</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate text-sm">{resume.fileName}</p>
                          <p className="text-xs mt-0.5" style={{ color: "#334155" }}>
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs" style={{ color: "#475569" }}>💼 {resume.role || "N/A"}</span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: badge.bg, color: badge.color, border: `1px solid ${badge.border}` }}>
                          {resume.score || "N/A"}/100
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="rounded-full h-1.5" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                        <motion.div
                          className="h-1.5 rounded-full"
                          style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                          initial={{ width: 0 }}
                          animate={{ width: `${resume.score || 0}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>

                      <p className="text-xs mt-3 font-medium" style={{ color: "#6366f1" }}>
                        Click to view full analysis →
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;