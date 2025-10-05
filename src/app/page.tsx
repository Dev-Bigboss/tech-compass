// src/app/page.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-24 md:py-32 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full"
            variants={itemVariants}
          >
            <span className="text-sm font-semibold">🇳🇬 Built for Nigeria</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
            variants={itemVariants}
          >
            Your Gateway to
            <span className="block text-white">
              Tech Excellence
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed"
            variants={itemVariants}
          >
            Connecting ambitious Nigerian university students with transformative internship opportunities at leading tech companies
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href="/intern-interest"
                className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold shadow-soft-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
              >
                🎓 I&apos;m a Student
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href="/company-interest"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                🏢 I&apos;m a Company
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm text-gray-200">Students Registered</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-sm text-gray-200">Partner Companies</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm text-gray-200">Placements Made</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three simple steps to connect talent with opportunity
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mb-6 shadow-soft">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              For Students
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Create your profile, showcase your skills and projects, and get matched with companies seeking talented interns like you.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href="/intern-interest" className="text-primary font-semibold hover:underline">
                Get Started →
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center mb-6 shadow-soft">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              For Companies
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Post internship opportunities, review qualified candidates, and connect with Nigeria&apos;s brightest emerging tech talents.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href="/company-interest" className="text-secondary font-semibold hover:underline">
                Post Opportunity →
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-success to-success-dark rounded-xl flex items-center justify-center mb-6 shadow-soft">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Build the Future
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We bridge the gap between education and industry, empowering Nigeria&apos;s tech ecosystem one connection at a time.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <span className="text-success font-semibold">Join the Movement ✨</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Choose Tech Compass?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Built specifically for the Nigerian tech ecosystem
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: "🎯",
                title: "Targeted Matching",
                description: "Our algorithm connects students with opportunities that match their skills and career goals"
              },
              {
                icon: "🚀",
                title: "Fast & Efficient",
                description: "Get matched with opportunities within days, not months. Speed matters in tech"
              },
              {
                icon: "🤝",
                title: "Verified Companies",
                description: "All partner companies are vetted to ensure quality internship experiences"
              },
              {
                icon: "📈",
                title: "Career Growth",
                description: "Access resources, mentorship, and support to accelerate your tech career"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white shadow-soft-lg">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Join hundreds of students and companies already building the future of Nigerian tech
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/intern-interest"
              className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-soft"
            >
              Sign Up as Student
            </Link>
            <Link
              href="/company-interest"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
            >
              Post as Company
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className="text-xl font-bold">Tech Compass</span>
              </div>
              <p className="text-gray-400">
                Bridging the gap between Nigerian students and tech opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/intern-interest" className="hover:text-white transition-colors">For Students</Link></li>
                <li><Link href="/company-interest" className="hover:text-white transition-colors">For Companies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Have questions? Reach out to us at<br />
                <a href="mailto:hello@techcompass.ng" className="text-primary hover:underline">
                  hello@techcompass.ng
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Tech Compass. All rights reserved. Made with ❤️ in Nigeria</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}