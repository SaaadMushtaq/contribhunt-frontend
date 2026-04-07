import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Dashboard } from "./pages/Dashboard";
import { Roadmap } from "./pages/Roadmap";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { useAuth } from "./hooks/useAuth";

// Handles GitHub OAuth redirect
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { initializeAuth } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("contribhunt_token", token);
    }

    initializeAuth().then(() => {
      navigate("/dashboard", { replace: true });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-500 rounded-full animate-spin mx-auto" />
        <p className="text-gray-600">Signing you in...</p>
      </div>
    </div>
  );
};

// Pages that get the full-bleed auth layout (no Navbar/Footer)
const AUTH_ROUTES = ["/login", "/signup"];

// App shell with auth initialization
const AppShell = () => {
  const { initializeAuth } = useAuth();
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className={isAuthPage ? undefined : "flex-1"}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAuthPage && <Footer />}
      <Toaster position="bottom-right" />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
};

export default App;
