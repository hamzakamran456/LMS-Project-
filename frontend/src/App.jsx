import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import Course from "./pages/Course";
import { ArrowUp } from "lucide-react";
import CourseDetailPageHome from "./pages/CourseDetailPageHome";
import CourseDetailPage from "./pages/CourseDetailPage";

// to protect the route
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return Boolean(token);
  };
  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

const ScrollToToponRouteChange = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
};

const ScrollTopButton = ({ thershold = 200, showonMount = false }) => {
  const [visible, setVisible] = useState(!!showonMount);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > thershold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thershold]);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!visible) {
    return null;
  }
  return (
    <button
      onClick={scrollToTop}
      className={
        "fixed right-6 bottom-6 z-50 p-2 rounded-b-full focus:outline-none focus:ring-sky-300" +
        "backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer transition-transform"
      }
    >
      <ArrowUp className="w-6 h-6 text-sky-600 drop-shadow-sm" />
    </button>
  );
};

const App = () => {
  return (
    <>
      <ScrollToToponRouteChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/courses" element={<Course />} />

        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CourseDetailPageHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ScrollTopButton thershold={250} />
    </>
  );
};

export default App;
