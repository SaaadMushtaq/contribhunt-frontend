import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, Map, BarChart3, ArrowRight, GitBranch } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Zap,
      title: "Smart Matching",
      description:
        "AI ranks issues by your skill fit. No more endless scrolling.",
    },
    {
      icon: Map,
      title: "Contribution Roadmap",
      description:
        "Structured path from beginner to advanced. Level up systematically.",
    },
    {
      icon: BarChart3,
      title: "Track Progress",
      description: "Monitor all your open source contributions in one place.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Add Your Skills",
      description:
        "Enter your technical skills or connect your GitHub profile to auto-detect them.",
    },
    {
      number: 2,
      title: "Browse Issues",
      description:
        "Explore AI-ranked issues that match your skill level and interests.",
    },
    {
      number: 3,
      title: "Track & Contribute",
      description:
        "Track your contributions from interested to completed and build your portfolio.",
    },
  ];

  return (
    <div className="w-full">
      <section className="min-h-screen bg-linear-to-br from-brand-50 to-accent-50 flex items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
                Find Your Perfect Open Source Contribution
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Stop scrolling through thousands of issues. Get matched with
                contributions that fit your skills and experience level.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Start Searching
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/login"
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-900 rounded-lg font-semibold transition-all ${
                    isAuthenticated
                      ? "bg-gray-900 text-white opacity-50 cursor-not-allowed pointer-events-none"
                      : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
                  }`}
                >
                  <GitBranch size={20} />
                  {isAuthenticated ? "Already Connected" : "Login with GitHub"}
                </Link>
              </div>

              <div className="pt-8 border-t border-gray-300">
                <p className="text-sm text-gray-600 font-medium">
                  10,000+ Issues Analyzed · 50+ Languages · 100% Free
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-md h-96">
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-brand-200 to-accent-200 rounded-3xl opacity-20"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                <motion.div
                  className="absolute top-20 left-10 text-6xl font-bold text-brand-500 opacity-30"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {"<"}
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                >
                  <GitBranch
                    size={80}
                    className="text-gray-900"
                    strokeWidth={1}
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-10 text-6xl font-bold text-blue-500 opacity-30"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  {">"}
                </motion.div>

                <motion.div className="absolute top-10 right-20 w-4 h-4 bg-brand-500 rounded-full opacity-60" />
                <motion.div className="absolute bottom-32 left-20 w-3 h-3 bg-blue-500 rounded-full opacity-60" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why ContribHunt?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to start contributing to open source
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-linear-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-accent-50 to-brand-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to your first open source contribution
            </p>
          </motion.div>

          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(100%)] w-full h-1 bg-linear-to-r from-brand-400 to-transparent" />
                )}

                <div className="bg-white border border-gray-200 rounded-lg p-8 h-full">
                  <div className="w-12 h-12 bg-linear-to-br from-brand-500 to-accent-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-brand-500 to-accent-500 rounded-lg p-12 text-center text-white shadow-xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to contribute?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of developers making open source contributions the
              smart way.
            </p>

            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-600 hover:bg-gray-100 font-semibold rounded-lg transition-all"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
