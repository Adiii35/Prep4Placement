import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/upload", label: "Upload", icon: "📄" },
  ];

  return (
    <motion.nav
      className="flex justify-between items-center px-8 py-4 sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(6,11,20,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <span className="text-lg">📄</span>
        </div>
        <h1 className="font-bold text-lg text-white">Prep4Placement</h1>
      </motion.div>

      {/* Right Side */}
      <div className="flex items-center gap-2">

        {/* Nav Links */}
        {navLinks.map((link) => (
          <motion.div key={link.path} whileHover={{ y: -2 }}>
            <Link
              to={link.path}
              className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-xl transition-all"
              style={{
                color: location.pathname === link.path ? "#818CF8" : "#64748B",
                backgroundColor: location.pathname === link.path ? "rgba(99,102,241,0.1)" : "transparent"
              }}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </motion.div>
        ))}

        {/* Divider */}
        <div className="h-5 w-px mx-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

        {/* User Avatar */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium hidden sm:block" style={{ color: "#94A3B8" }}>
            {user?.name}
          </span>
        </motion.div>

        {/* Divider */}
        <div className="h-5 w-px mx-2" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />

        {/* Logout */}
        <motion.button
          onClick={handleLogout}
          className="text-sm font-semibold px-4 py-2 rounded-xl"
          style={{
            background: "rgba(239,68,68,0.1)",
            color: "#F87171",
            border: "1px solid rgba(239,68,68,0.2)"
          }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(239,68,68,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Logout 👋
        </motion.button>

      </div>
    </motion.nav>
  );
}

export default Navbar;