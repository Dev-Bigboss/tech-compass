// src/app/news/page.tsx
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

// Event speakers data
const speakers = [
  {
    name: "Olorunfemi Oluwaniran",
    title: "Chief Technical Officer",
    company: "AWA Bike",
    image: "/speakers/oluwaniran.jpg",
    bio: "Leading tech innovation in sustainable transportation",
  },
  {
    name: "Oluwatosin Adesua",
    title: "Senior System Engineer",
    company: "Interswitch Group",
    image: "/speakers/adesua.jpg",
    bio: "Expert in enterprise system architecture and fintech solutions",
  },
  {
    name: "Dr. Khadijat Ladoja",
    title: "Founder & Pioneer",
    company: "Tech Compass",
    image: "/speakers/ladoja.jpg",
    bio: "Passionate about bridging the gap between education and industry",
  },
];

// Event sessions
const sessions = [
  {
    title: "Initiative Unveiling",
    speaker: "Dr. Khadijat Ladoja",
    description:
      "Official launch of Tech Compass initiative and vision for connecting Nigerian students with tech opportunities",
    icon: "🚀",
    time: "10:00 AM",
  },
  {
    title: "Software Costing & Project Management",
    speaker: "Olorunfemi Oluwaniran",
    description:
      "Deep dive into pricing software projects, understanding market rates, and delivering value to clients",
    icon: "💰",
    time: "11:00 AM",
  },
  {
    title: "Resume Workshop",
    speaker: "Industry Experts",
    description:
      "Hands-on session on crafting compelling tech resumes that get noticed by recruiters",
    icon: "📄",
    time: "1:00 PM",
  },
  {
    title: "System Design & Architecture",
    speaker: "Oluwatosin Adesua",
    description:
      "Best practices in building scalable systems and career growth in system engineering",
    icon: "🏗️",
    time: "2:30 PM",
  },
  {
    title: "Networking Session",
    speaker: "All Attendees",
    description:
      "Connect with fellow students, industry professionals, and potential mentors",
    icon: "🤝",
    time: "4:00 PM",
  },
];

// Event highlights
const highlights = [
  {
    stat: "200+",
    label: "Students Attended",
    icon: "🎓",
  },
  {
    stat: "5",
    label: "Industry Speakers",
    icon: "🎤",
  },
  {
    stat: "6hrs",
    label: "Of Learning",
    icon: "⏰",
  },
  {
    stat: "50+",
    label: "Companies Interested",
    icon: "🏢",
  },
];

export default function News() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="text-sm text-primary font-semibold">📰 Latest News</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Tech Compass Unveils: A Historic Launch
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-4 text-lg mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>November 2, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>KAAF Auditorium, University of Ibadan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>10:00 AM</span>
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl max-w-3xl text-gray-100 leading-relaxed"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            The inaugural Tech Compass event brought together over 200 students,
            industry leaders, and tech enthusiasts to launch Nigeria's premier
            platform for connecting university students with transformative
            internship opportunities.
          </motion.p>
        </div>
      </section>

      {/* Event Highlights Stats */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                variants={itemVariants}
              >
                <div className="text-4xl mb-2">{highlight.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {highlight.stat}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {highlight.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Summary */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Event Summary
            </motion.h2>

            <motion.div
              className="prose prose-lg dark:prose-invert max-w-none"
              variants={itemVariants}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-100 dark:border-gray-700 space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  The KAAF Auditorium at the University of Ibadan was electric
                  with energy as over 200 ambitious students gathered for the
                  historic unveiling of Tech Compass. The event marked a
                  significant milestone in Nigeria's tech education landscape,
                  bringing together students eager to break into the tech
                  industry and seasoned professionals ready to share their
                  wisdom.
                </p>

                <p>
                  Dr. Khadijat Ladoja, the visionary founder of Tech Compass,
                  delivered an inspiring keynote that set the tone for the day.
                  She articulated the critical gap between academic learning and
                  industry requirements, emphasizing how Tech Compass aims to
                  bridge this divide by connecting talented Nigerian students
                  with meaningful internship opportunities.
                </p>

                <p>
                  The session on software costing by Olorunfemi Oluwaniran, CTO
                  of AWA Bike, was particularly enlightening. Students learned
                  the intricacies of pricing software projects, understanding
                  client value, and positioning themselves competitively in the
                  freelance and startup ecosystem.
                </p>

                <p>
                  Oluwatosin Adesua from Interswitch Group captivated the
                  audience with real-world insights into system architecture and
                  engineering best practices. His talk on building scalable
                  systems resonated strongly with students aspiring to work in
                  fintech and enterprise technology.
                </p>

                <p>
                  The resume workshop was a hands-on favorite, where students
                  received personalized feedback on their CVs and learned how to
                  showcase their skills effectively. Many participants left with
                  completely revamped resumes that better highlighted their
                  potential.
                </p>

                <p>
                  The networking session that concluded the event was perhaps
                  the most valuable part of the day. Students connected with
                  industry professionals, exchanged contacts, and some even
                  secured interview opportunities on the spot. The energy was
                  palpable as partnerships were formed and mentorship
                  relationships began.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Featured Speakers
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {speaker.name}
                </h3>
                <p className="text-primary font-semibold mb-1">
                  {speaker.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {speaker.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {speaker.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sessions Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Event Sessions
          </motion.h2>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sessions.map((session, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-soft-lg transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{session.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {session.title}
                      </h3>
                      <span className="text-sm font-semibold text-white bg-primary bg-opacity-10 px-3 py-1 rounded-full">
                        {session.time}
                      </span>
                    </div>
                    <p className="text-secondary font-medium mb-2">
                      {session.speaker}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {session.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Gallery Placeholder */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Event Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 flex items-center justify-center"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                <div className="text-center p-6">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Event Photo {index}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            📸 Add your event photos to:{" "}
            <code className="text-primary">/public/gallery/</code>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center text-white shadow-soft-lg">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't Miss the Next Event!
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Be part of the next Tech Compass event and connect with industry
              leaders
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/intern-interest"
                className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-soft"
              >
                Register as Student 🎓
              </Link>
              <Link
                href="/company-interest"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all duration-300"
              >
                Partner with Us 🏢
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
