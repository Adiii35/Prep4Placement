import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage("Login failed ❌ Please check your credentials.");
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
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)"
      }} />

       {/* ✅ Left glow */}
      <div className="fixed left-0 top-1/2 pointer-events-none z-0" style={{
        transform: "translateY(-50%)",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)"
      }} />

      {/* ✅ Right glow */}
      <div className="fixed right-0 top-1/2 pointer-events-none z-0" style={{
        transform: "translateY(-50%)",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)"
      }} />


      {/* Card */}
      <motion.div className="w-full max-w-md relative z-10 rounded-2xl p-8"
        style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}>

        {/* Logo */}
        <motion.div className="flex justify-center mb-6"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <span className="text-3xl">📄</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2 className="text-2xl font-bold text-center text-white mb-1"
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          Welcome Back 👋
        </motion.h2>
        <motion.p className="text-center text-sm mb-8"
          style={{ color: "#475569" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}>
          Login to your Prep4Placement account
        </motion.p>

        {/* Form */}
        <div className="space-y-4">
          <motion.input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E2E8F0"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E2E8F0"
            }}
            onFocus={e => e.target.style.borderColor = "rgba(99,102,241,0.5)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          />

          <motion.button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(99,102,241,0.4)" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Logging in...
              </span>
            ) : "Login 🚀"}
          </motion.button>
        </div>

        {/* Register link */}
        <motion.p className="text-center text-sm mt-6"
          style={{ color: "#475569" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}>
          Don't have an account?{" "}
          <span className="font-semibold cursor-pointer"
            style={{ color: "#818CF8" }}
            onClick={() => navigate("/register")}>
            Register here
          </span>
        </motion.p>

        {/* Back to home */}
        <motion.p className="text-center text-xs mt-3"
          style={{ color: "#1E3A5F" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <span className="cursor-pointer hover:text-indigo-400 transition"
            onClick={() => navigate("/")}>
            ← Back to Home
          </span>
        </motion.p>

        {/* Error */}
        <AnimatePresence>
          {message && (
            <motion.p className="text-center text-sm mt-4 py-2 px-4 rounded-xl"
              style={{ color: "#F87171", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
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

export default LoginPage;