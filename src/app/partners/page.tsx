// src/app/partners/page.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

// Partners data
const partners = [
  {
    name: "Hyperspace",
    logo: "/partners/hyperspace.png",
    website: "https://hyperspace.ng",
    category: "Tech Solutions",
    description:
      "Leading provider of innovative tech solutions and digital transformation services",
  },
  {
    name: "Crop2Cash",
    logo: "/partners/crop2cash.png",
    website: "https://crop2cash.com",
    category: "Agritech",
    description:
      "Revolutionizing agriculture through technology and financial inclusion",
  },
  {
    name: "Deimos",
    logo: "/partners/deimos.png",
    website: "#",
    category: "Tech Innovation",
    description:
      "Driving innovation in software development and digital solutions",
  },
  {
    name: "GMind AI",
    logo: "/partners/gmind.png",
    website: "#",
    category: "Artificial Intelligence",
    description:
      "Pioneering AI solutions for businesses and educational institutions",
  },
  {
    name: "Octave Analytics",
    logo: "/partners/octave.png",
    website: "#",
    category: "Data Analytics",
    description: "Transforming data into actionable insights for businesses",
  },
  {
    name: "Solab Technologies",
    logo: "/partners/solab.png",
    website: "#",
    category: "Technology",
    description:
      "Building cutting-edge technology solutions for modern challenges",
  },
  {
    name: "Tombell Education",
    logo: "/partners/tombell.png",
    website: "#",
    category: "EdTech",
    description:
      "Empowering education through technology and innovative learning platforms",
  },
];

// Partnership tiers
const tiers = [
  {
    name: "Platinum Partners",
    icon: "💎",
    benefits: [
      "Featured placement in all Tech Compass events",
      "Direct access to our talent database",
      "Dedicated account manager",
      "Priority intern selection",
      "Co-branded marketing materials",
    ],
    color: "from-purple-500 to-blue-500",
  },
  {
    name: "Gold Partners",
    icon: "🥇",
    benefits: [
      "Premium event placement",
      "Access to talent pool",
      "Quarterly partnership reviews",
      "Early access to new features",
      "Social media mentions",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Silver Partners",
    icon: "🥈",
    benefits: [
      "Event participation opportunities",
      "Talent pool access",
      "Bi-annual check-ins",
      "Partnership badge",
      "Newsletter features",
    ],
    color: "from-gray-400 to-gray-600",
  },
];

// Statistics
const stats = [
  { value: "7+", label: "Active Partners" },
  { value: "50+", label: "Internships Posted" },
  { value: "200+", label: "Students Placed" },
  { value: "95%", label: "Partner Satisfaction" },
];

export default function Partners() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-primary to-primary-dark text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="text-sm text-primary font-semibold">🤝 Our Network</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Our Trusted Partners
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Together, we're building Nigeria's tech ecosystem by connecting
            talented students with industry-leading companies
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6"
                variants={itemVariants}
              >
                <div className="text-3xl text-primary md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-800">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Companies We Work With
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leading organizations that trust Tech Compass to connect them with
              Nigeria's brightest tech talent
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
              >
                {/* Logo Placeholder */}
                <div className="h-20 flex items-center justify-center mb-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {partner.name}
                    </span>
                    {/* When you have real logos, replace with:
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={150}
                      height={60}
                      className="object-contain"
                    />
                    */}
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-white text-sm font-semibold rounded-full mb-3">
                    {partner.category}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {partner.description}
                  </p>
                  {partner.website !== "#" && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Visit Website
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Partnership Tiers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the partnership level that best fits your organization's
              needs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300"
                variants={itemVariants}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center text-3xl mb-4`}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                    >
                      <svg
                        className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Partner With Us?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "🎯",
                title: "Pre-Screened Talent",
                description:
                  "Access a curated pool of motivated students from top Nigerian universities who are ready to contribute from day one",
              },
              {
                icon: "💰",
                title: "Cost-Effective Hiring",
                description:
                  "Reduce recruitment costs while finding quality interns who can grow into full-time team members",
              },
              {
                icon: "🌟",
                title: "Brand Visibility",
                description:
                  "Showcase your company to hundreds of talented students and position yourself as an employer of choice",
              },
              {
                icon: "🤝",
                title: "Community Impact",
                description:
                  "Contribute to Nigeria's tech ecosystem by providing opportunities that shape the next generation of tech leaders",
              },
              {
                icon: "📈",
                title: "Growth Opportunities",
                description:
                  "Build your talent pipeline with interns who understand your company culture and can transition smoothly to full-time roles",
              },
              {
                icon: "🔄",
                title: "Flexible Engagement",
                description:
                  "Choose from various partnership models that align with your hiring needs and company goals",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="text-4xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-secondary to-primary rounded-3xl p-12 text-center text-white shadow-soft-lg">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Partner Today
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join leading companies in shaping Nigeria's tech future and access
              exceptional talent
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/company-interest"
                className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-soft"
              >
                Partner With Us 🤝
              </Link>
              <a
                href="mailto:partnerships@techcompass.ng"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                Contact Us 📧
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
