import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../utils/axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axiosInstance.post("/api/auth/register", {
        name, email, password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("Register failed ❌ Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "#060B14" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 pointer-events-none z-0" style={{
        transform: "translateX(-50%)",
        width: "500px", height: "250px",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.15), transparent 70%)"
      }} />


<div className="fixed left-0 top-1/2 pointer-events-none z-0" style={{
  transform: "translateY(-50%)",
  width: "300px", height: "300px",
  background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)"
}} />

<div className="fixed right-0 top-1/2 pointer-events-none z-0" style={{
  transform: "translateY(-50%)",
  width: "300px", height: "300px",
  background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)"
}} />

      {/* Card */}
      <motion.div
        className="w-full max-w-md relative z-10 rounded-2xl p-8"
        style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        {/* Logo */}
        <motion.div className="flex justify-center mb-6"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #a855f7)" }}>
            <span className="text-3xl">🚀</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-2xl font-bold text-center text-white mb-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          Create Account ✨
        </motion.h2>

        <motion.p
          className="text-center text-sm mb-8"
          style={{ color: "#475569" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Join Prep4Placement and supercharge your career
        </motion.p>

        {/* Form */}
        <div className="space-y-4">

          {/* Name */}
          <motion.input
            type="text"
            placeholder="👤  Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E2E8F0"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />

          {/* Email */}
          <motion.input
            type="email"
            placeholder="✉️  Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E2E8F0"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          />

          {/* Password */}
          <motion.input
            type="password"
            placeholder="🔒  Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E2E8F0"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          />

          {/* Register Button */}
          <motion.button
            onClick={handleRegister}
            disabled={loading || success}
            className="w-full py-3 rounded-xl font-bold text-white text-sm disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #a855f7)" }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(139,92,246,0.4)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {success ? (
              <span className="flex items-center justify-center gap-2">
                ✅ Registered! Redirecting...
              </span>
            ) : loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Creating Account...
              </span>
            ) : (
              "Register 🚀"
            )}
          </motion.button>

        </div>

        {/* Login Link */}
        <motion.p
          className="text-center text-sm mt-6"
          style={{ color: "#475569" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          Already have an account?{" "}
          <span
            className="font-semibold cursor-pointer hover:underline"
            style={{ color: "#A78BFA" }}
            onClick={() => navigate("/login")}>
            Login here
          </span>
        </motion.p>

        {/* Back to Home */}
        <motion.p
          className="text-center text-xs mt-3 cursor-pointer hover:text-purple-400 transition"
          style={{ color: "#1E3A5F" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={() => navigate("/")}>
          ← Back to Home
        </motion.p>

        {/* Error Message */}
        <AnimatePresence>
          {message && (
            <motion.p
              className="text-center text-sm mt-4 py-2 px-4 rounded-xl"
              style={{
                color: "#F87171",
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)"
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}>
              {message}
            </motion.p>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default RegisterPage;