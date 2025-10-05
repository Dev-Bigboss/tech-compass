// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div variants={linkVariants}>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-all duration-300">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tech Compass
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="flex gap-2"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={linkVariants}>
              <Link
                href="/intern-interest"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/intern-interest")
                    ? "bg-primary text-white shadow-soft"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                }`}
              >
                For Students
              </Link>
            </motion.div>
            <motion.div variants={linkVariants}>
              <Link
                href="/company-interest"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive("/company-interest")
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-soft"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-secondary"
                }`}
              >
                For Companies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
