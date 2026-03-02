import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { icon: "🤖", title: "AI-Powered Analysis", desc: "Get instant resume feedback powered by Groq LLaMA AI" },
    { icon: "📊", title: "Resume Scoring", desc: "Know exactly how strong your resume is with a detailed score" },
    { icon: "🎯", title: "Job Matching", desc: "See how well your resume matches your target role" },
    { icon: "💼", title: "Live Job Search", desc: "Find real jobs matching your skills from top companies" },
    { icon: "🛠️", title: "Skill Extraction", desc: "Automatically detects your technical skills from resume" },
    { icon: "📈", title: "Career Insights", desc: "Get personalized suggestions to improve your career" },
  ];

  const steps = [
    { step: "01", title: "Upload Resume", desc: "Upload your PDF resume in seconds", icon: "📤" },
    { step: "02", title: "AI Analysis", desc: "Our AI analyzes your skills and experience", icon: "🤖" },
    { step: "03", title: "Get Results", desc: "Receive detailed insights and job matches", icon: "✅" },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#060B14", color: "#E2E8F0" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 pointer-events-none z-0" style={{
        transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)",
      }} />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 relative z-10 sticky top-0" style={{
        backgroundColor: "rgba(6,11,20,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <motion.div className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <span className="text-lg">📄</span>
          </div>
          <h1 className="font-bold text-lg text-white">Prep4Placement</h1>
        </motion.div>

        <motion.div className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <motion.button onClick={() => navigate("/login")}
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ color: "#94A3B8" }}
            whileHover={{ color: "#fff" }} whileTap={{ scale: 0.95 }}>
            Login
          </motion.button>
          <motion.button onClick={() => navigate("/register")}
            className="text-sm font-semibold px-4 py-2 rounded-lg text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.95 }}>
            Get Started 🚀
          </motion.button>
        </motion.div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center text-center px-4 pt-20 pb-24 relative z-10">

        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-8"
          style={{ background: "rgba(99,102,241,0.12)", color: "#A5B4FC", border: "1px solid rgba(99,102,241,0.2)" }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          AI-Powered Resume Analysis Platform
        </motion.div>

        {/* Heading */}
        <motion.h1 className="font-bold leading-tight max-w-4xl mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#F1F5F9" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}>
          Land Your Dream Job with{" "}
          <span style={{
            background: "linear-gradient(135deg, #818CF8, #C084FC, #F472B6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            AI-Powered
          </span>{" "}
          Resume Analysis
        </motion.h1>

        {/* Subtext */}
        <motion.p className="text-lg max-w-xl leading-relaxed mb-10"
          style={{ color: "#64748B" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}>
          Upload your resume and get instant AI feedback, skill analysis,
          job matching, and career suggestions — all in seconds!
        </motion.p>

        {/* Buttons */}
        <motion.div className="flex gap-4 flex-wrap justify-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <motion.button onClick={() => navigate("/register")}
            className="text-white font-bold px-8 py-4 rounded-2xl text-base"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.95 }}>
            Analyze My Resume Free 🚀
          </motion.button>
          <motion.button onClick={() => navigate("/login")}
            className="font-bold px-8 py-4 rounded-2xl text-base"
            style={{ color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.04)", color: "#fff" }}
            whileTap={{ scale: 0.95 }}>
            Login to Dashboard →
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex gap-12 flex-wrap justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          {[
            { value: "AI", label: "Powered Analysis" },
            { value: "100%", label: "Free to Use" },
            { value: "10s", label: "Instant Results" },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center" whileHover={{ y: -4 }}>
              <p className="text-3xl font-bold" style={{
                background: "linear-gradient(135deg, #818CF8, #C084FC)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>{stat.value}</p>
              <p className="text-xs mt-1" style={{ color: "#475569" }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How it works */}
      <div className="py-20 px-4 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.h2 className="text-3xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          How It Works ⚡
        </motion.h2>
        <motion.p className="text-center text-sm mb-14" style={{ color: "#475569" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          3 simple steps to supercharge your job search
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <motion.div key={i} className="flex-1 rounded-2xl p-6 text-center relative"
              style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ borderColor: "rgba(99,102,241,0.3)", boxShadow: "0 8px 30px rgba(99,102,241,0.08)" }}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-xs font-bold mb-2" style={{ color: "#6366f1" }}>STEP {s.step}</div>
              <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-sm" style={{ color: "#475569" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-4 relative z-10" style={{
        backgroundColor: "#080E1A",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        <motion.h2 className="text-3xl font-bold text-white text-center mb-3"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Everything You Need to Get Hired 💪
        </motion.h2>
        <motion.p className="text-sm text-center mb-14" style={{ color: "#475569" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          All tools in one place — no more switching between multiple websites
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div key={i} className="rounded-2xl p-5"
              style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.35)", boxShadow: "0 10px 30px rgba(99,102,241,0.1)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                <span className="text-xl">{f.icon}</span>
              </div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-28 px-4 text-center relative z-10" style={{
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        {/* Glow behind CTA */}
        <div className="absolute left-1/2 top-1/2 pointer-events-none" style={{
          transform: "translate(-50%, -50%)",
          width: "400px", height: "200px",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12), transparent 70%)"
        }} />

        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your Career? 🎯
          </h2>
          <p className="text-lg mb-10" style={{ color: "#475569" }}>
            Join thousands of job seekers using Prep4Placement to land their dream jobs
          </p>
          <motion.button onClick={() => navigate("/register")}
            className="text-white font-bold px-12 py-4 rounded-2xl text-xl"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.95 }}>
            Get Started for Free 🚀
          </motion.button>
        </motion.div>

        <motion.p className="text-xs mt-16" style={{ color: "#1E3A5F" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          © 2025 Prep4Placement — Built with ❤️ for job seekers
        </motion.p>
      </div>

    </div>
  );
}

export default LandingPage;