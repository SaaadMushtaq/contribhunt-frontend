import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GitBranch,
  Star,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const HIGHLIGHTS = [
  {
    icon: Star,
    label: "10,000+ issues analyzed",
  },
  {
    icon: Users,
    label: "Growing contributor community",
  },
  {
    icon: TrendingUp,
    label: "Skill-matched recommendations",
  },
  {
    icon: ShieldCheck,
    label: "Read-only GitHub access",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Connect GitHub",
    desc: "One click – we auto-detect your languages and skills from your public repos.",
  },
  {
    step: "02",
    title: "Get matched",
    desc: "Browse AI-ranked issues tailored to your experience level and tech stack.",
  },
  {
    step: "03",
    title: "Track contributions",
    desc: "Mark issues as interested, in progress, or completed. Build your portfolio.",
  },
];

export const Signup = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55 }}
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white"
      >
        <div className="lg:hidden mb-8">
          <Link to="/">
            <img src="/logo.png" alt="ContribHunt" className="h-10 mx-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Create your account
            </h1>
            <p className="text-gray-500">
              Join ContribHunt and start contributing to open source today.
            </p>
          </div>

          <div className="space-y-4">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 font-bold text-sm flex items-center justify-center shrink-0">
                  {step}
                </span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              get started
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="space-y-4">
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 px-6 rounded-xl font-semibold text-base transition-all shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <GitBranch size={20} />
              )}
              Sign up with GitHub
            </button>

            <Link
              to="/search"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 py-3.5 px-6 rounded-xl font-medium text-base transition-all"
            >
              Try without signing up
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            By continuing you agree to our{" "}
            <span className="underline cursor-pointer hover:text-gray-600">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-gray-600">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-accent-600 to-brand-500 text-white flex-col justify-between p-12 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 -left-12 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 right-1/4 w-64 h-64 bg-white/5 rounded-full" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/logo.png" alt="ContribHunt" className="h-10" />
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Your open source journey starts here
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              ContribHunt removes the guesswork — find issues that are the right
              fit for you, right now.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <Icon size={18} className="shrink-0 text-white/80" />
                <span className="text-sm font-medium text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-white/30 pl-5 space-y-1">
            <p className="text-white/90 italic leading-relaxed">
              "Found my first merged PR within a week. The skill matching is
              surprisingly accurate."
            </p>
            <footer className="text-white/50 text-sm">
              — Early contributor, ContribHunt beta
            </footer>
          </blockquote>
        </div>

        <p className="relative z-10 text-white/50 text-sm">
          © {new Date().getFullYear()} ContribHunt — 100% free, forever.
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
