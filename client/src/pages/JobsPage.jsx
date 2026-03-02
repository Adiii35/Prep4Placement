import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axios";

function JobsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(
          `/api/resume/${id}/jobs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(res.data.jobs);
        setRole(res.data.role);
      } catch (err) {
        setError("Failed to fetch jobs ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [id]);

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
          <p className="font-semibold text-lg" style={{ color: "#818CF8" }}>
            Finding jobs for {role}...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative" style={{ backgroundColor: "#060B14" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 pointer-events-none z-0" style={{
        transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.1), transparent 70%)"
      }} />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-semibold text-sm"
          style={{ color: "#6366f1" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}>
          ← Back
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
            💼
          </motion.span>
          <h2 className="text-3xl font-bold mt-3">Job Recommendations</h2>
          <p className="mt-1 text-sm" style={{ color: "#818CF8" }}>
            Showing jobs for{" "}
            <span className="font-bold text-white">{role}</span>
          </p>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            className="p-4 rounded-2xl text-center text-sm font-medium"
            style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.div>
        )}

        {/* No Jobs */}
        {jobs.length === 0 && !error && (
          <motion.div
            className="rounded-2xl p-16 text-center"
            style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-6xl">😕</span>
            <p className="mt-4 text-lg" style={{ color: "#475569" }}>No jobs found for {role}</p>
          </motion.div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          <AnimatePresence>
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.3)", boxShadow: "0 10px 30px rgba(99,102,241,0.1)" }}
              >
                <div className="flex items-start gap-4">

                  {/* Company Logo */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    {job.logo ? (
                      <img src={job.logo} alt={job.company}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                    ) : (
                      <span className="text-2xl">🏢</span>
                    )}
                  </div>

                  {/* Job Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg truncate">{job.title}</h3>
                    <p className="font-semibold text-sm mt-0.5" style={{ color: "#818CF8" }}>{job.company}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.location && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }}>
                          📍 {job.location}
                        </span>
                      )}
                      {job.type && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.2)" }}>
                          💼 {job.type}
                        </span>
                      )}
                      {job.salary && job.salary !== "Not disclosed" && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.2)" }}>
                          💰 {job.salary}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {job.description && (
                      <p className="text-sm mt-3 leading-relaxed line-clamp-2" style={{ color: "#334155" }}>
                        {job.description}
                      </p>
                    )}
                  </div>

                  {/* Apply Button */}
                  <motion.a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                    whileTap={{ scale: 0.95 }}>
                    Apply →
                  </motion.a>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default JobsPage;