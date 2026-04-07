import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GitBranch,
  Zap,
  Map,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const PERKS = [
  {
    icon: Zap,
    title: "Smart issue matching",
    desc: "AI ranks GitHub issues by your exact skill fit.",
  },
  {
    icon: Map,
    title: "Contribution roadmap",
    desc: "Structured path from beginner to advanced issues.",
  },
  {
    icon: BarChart3,
    title: "Progress tracking",
    desc: "All your open-source activity in one dashboard.",
  },
  {
    icon: CheckCircle,
    title: "Saved searches",
    desc: "Bookmark skill-based searches and rerun in one click.",
  },
];

export const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect already-authenticated users
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel – branding ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-brand-500 to-accent-600 text-white flex-col justify-between p-12 relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/5 rounded-full" />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="ContribHunt" className="h-10" />
          </Link>
        </div>

        {/* Tagline */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            The smarter way to contribute to open source
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Stop wasting time browsing. Get matched with issues that fit your
            skills, level, and interests.
          </p>

          <ul className="space-y-4 mt-8">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="mt-0.5 w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-white/70 text-sm">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom note */}
        <p className="relative z-10 text-white/50 text-sm">
          © {new Date().getFullYear()} ContribHunt — 100% free, forever.
        </p>
      </motion.div>

      {/* ── Right panel – action ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link to="/">
            <img src="/logo.png" alt="ContribHunt" className="h-10 mx-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500">
              Sign in to continue to your dashboard.
            </p>
          </div>

          {/* GitHub button */}
          <div className="space-y-4">
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-semibold text-base transition-all shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <GitBranch size={20} />
              )}
              Continue with GitHub
            </button>

            <Link
              to="/search"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 py-3.5 px-6 rounded-xl font-medium text-base transition-all"
            >
              Browse as guest
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Switch to signup */}
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              Sign up for free
            </Link>
          </p>

          {/* Trust note */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-500 leading-relaxed text-center">
              We only request{" "}
              <span className="font-medium text-gray-700">
                read access to your public profile and repos
              </span>
              . We never modify your code or repositories.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
