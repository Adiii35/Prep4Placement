import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ResumeDetail from "./pages/ResumeDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import JobsPage from "./pages/JobsPage";
import LandingPage from "./pages/LandingPage";

// ✅ ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060B14" }}>
      <ScrollToTop /> {/* ✅ Yahan hai */}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        <Route path="/upload" element={
          <ProtectedRoute><UploadPage /></ProtectedRoute>
        } />

        <Route path="/analysis/:id" element={
          <ProtectedRoute><ResumeDetail /></ProtectedRoute>
        } />

        <Route path="/jobs/:id" element={
          <ProtectedRoute><JobsPage /></ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;