import { useState } from "react";
import { uploadResume } from "../services/resumeService";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setError("");
      const uploadData = await uploadResume(file);
      navigate(`/analysis/${uploadData.resumeId}`);
    } catch (err) {
      setError("Upload failed ❌ Please try again.");
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
      setError("");
    } else {
      setError("Only PDF files are allowed ❌");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) { setFile(selected); setError(""); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative"
      style={{ backgroundColor: "#060B14" }}>

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Top glow */}
      <div className="fixed top-0 left-1/2 pointer-events-none z-0" style={{
        transform: "translateX(-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.12), transparent 70%)"
      }} />

      <div className="w-full max-w-xl space-y-6 relative z-10">

        {/* Header */}
        <motion.div className="text-center"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div className="flex justify-center mb-4"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}>
            <div className="p-4 rounded-2xl"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <span className="text-5xl">🚀</span>
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-white">Prep4Placement</h1>
          <p className="mt-2 text-sm" style={{ color: "#475569" }}>
            Upload your resume and get AI-powered insights instantly
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div className="rounded-3xl p-8"
          style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>

          {/* Drag & Drop Zone */}
          <motion.div
            className="rounded-2xl p-10 text-center cursor-pointer transition-all duration-300"
            style={{
              border: dragOver
                ? "2px dashed #6366f1"
                : file
                ? "2px dashed #34D399"
                : "2px dashed rgba(255,255,255,0.1)",
              backgroundColor: dragOver
                ? "rgba(99,102,241,0.08)"
                : file
                ? "rgba(52,211,153,0.06)"
                : "rgba(255,255,255,0.02)"
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input id="fileInput" type="file" accept=".pdf"
              className="hidden" onChange={handleFileChange} />

            <AnimatePresence mode="wait">
              {file ? (
                <motion.div key="file-selected"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}>
                  <span className="text-5xl">✅</span>
                  <p className="font-bold mt-3 text-lg" style={{ color: "#34D399" }}>{file.name}</p>
                  <p className="text-sm mt-1" style={{ color: "#10B981" }}>
                    {(file.size / 1024).toFixed(1)} KB — Ready to analyze!
                  </p>
                  <p className="text-xs mt-2" style={{ color: "#334155" }}>Click to change file</p>
                </motion.div>
              ) : (
                <motion.div key="no-file"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.span className="text-5xl block"
                    animate={{ y: dragOver ? -10 : [0, -8, 0] }}
                    transition={dragOver ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                    📄
                  </motion.span>
                  <p className="font-semibold mt-3 text-lg text-white">
                    {dragOver ? "Drop it here! 🎯" : "Drag & Drop your Resume"}
                  </p>
                  <p className="text-sm mt-1" style={{ color: "#334155" }}>or click to browse</p>
                  <p className="text-xs mt-2" style={{ color: "#1E293B" }}>PDF files only</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p className="text-center text-sm mt-4 py-2 px-4 rounded-xl"
                style={{ color: "#F87171", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full mt-6 text-white py-4 rounded-2xl font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            whileHover={file && !loading ? { scale: 1.03, boxShadow: "0 0 30px rgba(99,102,241,0.4)" } : {}}
            whileTap={file && !loading ? { scale: 0.97 } : {}}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}>
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <motion.span
                  className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                AI is Analyzing your Resume...
              </span>
            ) : "Upload & Analyze 🚀"}
          </motion.button>

        </motion.div>

        {/* Feature badges */}
        <motion.div className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          {[
            { icon: "🤖", text: "AI Analysis" },
            { icon: "📊", text: "Score Report" },
            { icon: "🎯", text: "Job Match" },
          ].map((item, index) => (
            <motion.div key={index}
              className="rounded-2xl p-4 text-center"
              style={{ backgroundColor: "#0D1526", border: "1px solid rgba(255,255,255,0.07)" }}
              whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.3)" }}>
              <span className="text-2xl">{item.icon}</span>
              <p className="text-xs font-semibold mt-1" style={{ color: "#475569" }}>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

export default UploadPage;