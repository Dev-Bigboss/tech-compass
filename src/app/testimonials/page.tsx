// src/app/testimonials/page.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Software Engineering Intern",
    company: "TechCorp Nigeria",
    university: "University of Lagos",
    image: "/testimonials/student1.jpg", // You'll need to add actual images
    content: "Tech Compass connected me with an amazing internship opportunity at TechCorp. The experience I gained was invaluable, and I'm now a full-time software engineer there!",
    rating: 5,
    category: "student"
  },
  {
    id: 2,
    name: "Chioma Okafor",
    role: "Data Science Intern",
    company: "DataFlow Solutions",
    university: "University of Ibadan",
    image: "/testimonials/student2.jpg",
    content: "I never thought finding an internship would be this easy. Tech Compass matched me with a company that aligned perfectly with my career goals. Highly recommended!",
    rating: 5,
    category: "student"
  },
  {
    id: 3,
    name: "Oluwaseun Adeyemi",
    role: "HR Manager",
    company: "InnovateTech Ltd",
    university: "",
    image: "/testimonials/company1.jpg",
    content: "We've hired 5 interns through Tech Compass and each one has been exceptional. The platform makes it incredibly easy to find talented, motivated students.",
    rating: 5,
    category: "company"
  },
  {
    id: 4,
    name: "Fatima Abubakar",
    role: "UI/UX Design Intern",
    company: "Creative Hub",
    university: "Ahmadu Bello University",
    image: "/testimonials/student3.jpg",
    content: "Tech Compass gave me the opportunity to work on real-world projects. The mentorship and guidance I received helped me grow tremendously as a designer.",
    rating: 5,
    category: "student"
  },
  {
    id: 5,
    name: "Emmanuel Nwosu",
    role: "CTO",
    company: "StartupX",
    university: "",
    image: "/testimonials/company2.jpg",
    content: "As a startup, finding quality interns within our budget was challenging. Tech Compass solved that problem and connected us with brilliant students who contributed significantly to our projects.",
    rating: 5,
    category: "company"
  },
  {
    id: 6,
    name: "Blessing Okoro",
    role: "Full Stack Development Intern",
    company: "WebTech Solutions",
    university: "Covenant University",
    image: "/testimonials/student4.jpg",
    content: "The internship I got through Tech Compass transformed my career. I learned so much and built connections that continue to benefit me today.",
    rating: 5,
    category: "student"
  },
];

const stats = [
  { label: "Happy Students", value: "500+" },
  { label: "Partner Companies", value: "50+" },
  { label: "Success Stories", value: "200+" },
  { label: "Average Rating", value: "4.9/5" },
];

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<"all" | "student" | "company">("all");

  const filteredTestimonials = testimonials.filter(
    (testimonial) => filter === "all" || testimonial.category === filter
  );

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

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="text-sm text-primary font-semibold">⭐ Success Stories</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Hear from Our Community
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Real stories from students who found their dream internships and companies who discovered exceptional talent
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
                <div className="text-3xl text-primary md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-gray-800">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-primary text-white shadow-soft"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilter("student")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "student"
                  ? "bg-primary text-white shadow-soft"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              🎓 Students
            </button>
            <button
              onClick={() => setFilter("company")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "company"
                  ? "bg-secondary text-white shadow-soft"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              🏢 Companies
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={filter}
          >
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-warning"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-primary font-medium">
                      {testimonial.category === "student" 
                        ? testimonial.university 
                        : testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join hundreds of students and companies already building the future of Nigerian tech
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/intern-interest"
                className="inline-block bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-soft hover:shadow-soft-lg"
              >
                Start as a Student 🎓
              </a>
              <a
                href="/company-interest"
                className="inline-block bg-gradient-to-r from-secondary to-secondary-dark text-white px-8 py-4 rounded-xl font-semibold hover:from-secondary-dark hover:to-secondary transition-all duration-300 shadow-soft hover:shadow-soft-lg"
              >
                Post as a Company 🏢
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
