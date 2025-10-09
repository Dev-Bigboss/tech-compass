// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/testimonials", label: "Testimonials" },
    { href: "/news", label: "News" },
    { href: "/partners", label: "Partners" },
  ];

  const ctaLinks = [
    { href: "/intern-interest", label: "Become a Mentee", isPrimary: true },
    { href: "/company-interest", label: "Become a Partner", isPrimary: false },
  ];

  return (
    <motion.nav
      className="bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div variants={linkVariants} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                width={200}
                height={40}
                alt="tech compass logo"
                className="rounded-lg"
              />
             
            </Link>
          </motion.div>

          {/* Desktop Navigation - Center Links */}
          <motion.div
            className="hidden lg:flex items-center gap-1"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={linkVariants}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-gray-100 dark:bg-gray-800 text-primary"
                      : "text-gray-300  hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop Navigation - Right CTA Buttons */}
          <motion.div
            className="hidden lg:flex items-center gap-2"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {ctaLinks.map((link) => (
              <motion.div key={link.href} variants={linkVariants}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    link.isPrimary
                      ? isActive(link.href)
                        ? "bg-primary text-white shadow-soft"
                        : "bg-primary text-white hover:bg-primary-dark shadow-soft"
                      : isActive(link.href)
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-soft"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden pb-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-gray-100 dark:bg-gray-800 text-primary"
                    : "text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA Links */}
            <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
              {ctaLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 rounded-lg font-medium text-center transition-all duration-300 ${
                    link.isPrimary
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
