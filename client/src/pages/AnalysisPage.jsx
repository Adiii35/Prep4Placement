import { motion } from "framer-motion";

function AnalysisPage({ analysis }) {
  if (!analysis) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-400 to-emerald-500";
    if (score >= 60) return "from-yellow-400 to-orange-400";
    return "from-red-400 to-rose-500";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return { text: "Excellent 🌟", color: "text-green-600" };
    if (score >= 60) return { text: "Good 👍", color: "text-yellow-600" };
    return { text: "Needs Work 💪", color: "text-red-500" };
  };

  const scoreLabel = getScoreLabel(analysis.score);

  // AI Suggestions ko sections mein split karo
  const formatAISuggestions = (text) => {
    if (!text) return [];
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    return lines;
  };

  const aiLines = formatAISuggestions(analysis.aiSuggestions);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 py-6">

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <span className="text-5xl">📊</span>
        </motion.div>
        <h2 className="text-3xl font-bold mt-3">Resume Analysis Report</h2>
        <p className="text-indigo-200 mt-1">AI-powered insights for your career</p>
      </motion.div>

      {/* Score Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-700 text-lg">📈 Resume Score</h3>
          <span className={`font-bold text-lg ${scoreLabel.color}`}>
            {scoreLabel.text}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden">
          <motion.div
            className={`h-5 rounded-full bg-gradient-to-r ${getScoreColor(analysis.score)}`}
            initial={{ width: 0 }}
            animate={{ width: `${analysis.score}%` }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-400">0</span>
          <motion.span
            className="text-2xl font-bold text-indigo-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            {analysis.score}/100
          </motion.span>
          <span className="text-sm text-gray-400">100</span>
        </div>
      </motion.div>

      {/* Role Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        <h3 className="font-bold text-gray-700 text-lg mb-3">💼 Suggested Role</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{analysis.role}</p>
          <p className="text-sm text-green-500 mt-1">Best match based on your skills</p>
        </div>
      </motion.div>

      {/* Skills Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        <h3 className="font-bold text-gray-700 text-lg mb-4">🛠️ Detected Skills</h3>
        <div className="flex flex-wrap gap-2">
          {analysis.skills.map((skill, index) => (
            <motion.span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Job Match Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        <h3 className="font-bold text-gray-700 text-lg mb-4">🎯 Job Match</h3>

        {/* Match Percentage */}
        <div className="flex items-center gap-4 mb-5">
          <motion.div
            className="relative w-20 h-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
          >
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#e5e7eb" strokeWidth="3"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#7C3AED" strokeWidth="3"
                strokeDasharray={`${analysis.jobMatch.matchPercentage}, 100`}
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${analysis.jobMatch.matchPercentage}, 100` }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-700">
                {analysis.jobMatch.matchPercentage}%
              </span>
            </div>
          </motion.div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {analysis.jobMatch.matchPercentage}% Match
            </p>
            <p className="text-sm text-gray-400">with target role requirements</p>
          </div>
        </div>

        {/* Missing Skills */}
        {analysis.jobMatch.missingSkills?.length > 0 && (
          <div>
            <p className="font-semibold text-gray-600 mb-2">⚠️ Missing Skills:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.jobMatch.missingSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* AI Suggestions Card */}
      {analysis.aiSuggestions && (
        <motion.div
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-md p-6 border border-indigo-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ y: -3 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">AI Suggestions</h3>
              <p className="text-sm text-indigo-400">Powered by Groq LLaMA</p>
            </div>
          </div>

          <div className="space-y-2">
            {aiLines.map((line, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-xl text-sm leading-relaxed ${
                  line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")
                    ? "bg-white border border-indigo-100 font-semibold text-indigo-700"
                    : line.startsWith("-") || line.startsWith("•")
                    ? "bg-white/60 text-gray-600 pl-5"
                    : "text-gray-700"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}

export default AnalysisPage;