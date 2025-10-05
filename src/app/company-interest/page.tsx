// src/app/company-interest/page.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import FormField from "@/components/FormField";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(100),
  contactEmail: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  positions: z.string().optional(),
  requirements: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function CompanyInterest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/company-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      toast.success(
        "🎉 Company registered successfully! We'll reach out soon.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      reset();
    } catch (error) {
      setSubmitStatus("error");
      toast.error("❌ Error submitting. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:py-20 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary bg-opacity-10 rounded-full mb-4"
            variants={itemVariants}
          >
            <span className="text-2xl">🏢</span>
            <span className="text-secondary font-semibold">For Companies</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Find Top Tech Talent
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Connect with ambitious Nigerian university students ready to
            contribute to your team. Post your internship opportunities and
            discover exceptional talent!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards - Left Side */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Quality Candidates
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access pre-screened students from top Nigerian universities with
                verified skills and passion for tech.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Easy Hiring
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Streamlined process from posting to hiring. Review profiles,
                conduct interviews, and onboard seamlessly.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-success bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Impact Nigeria's Future
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help build Nigeria's tech ecosystem by providing opportunities
                for the next generation of innovators.
              </p>
            </motion.div>
          </motion.div>

          {/* Form - Right Side */}
          <motion.div
            className="lg:col-span-2"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-soft-lg border border-gray-100 dark:border-gray-700"
              variants={formVariants}
            >
              <motion.div variants={itemVariants}>
                <FormField
                  label="Company Name"
                  name="companyName"
                  register={register}
                  error={errors.companyName}
                  placeholder="Acme Technologies Ltd"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Contact Email"
                  name="contactEmail"
                  register={register}
                  error={errors.contactEmail}
                  type="email"
                  placeholder="hr@acmetechnologies.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Location"
                  name="location"
                  register={register}
                  error={errors.location}
                  placeholder="Lagos, Nigeria"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Available Positions (comma-separated)"
                  name="positions"
                  register={register}
                  error={errors.positions}
                  placeholder="Software Developer, Data Analyst, UI/UX Designer"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Requirements & Expectations"
                  name="requirements"
                  register={register}
                  error={errors.requirements}
                  as="textarea"
                  rows={5}
                  placeholder="e.g., Proficiency in Python and JavaScript, strong problem-solving skills, team player, passionate about technology..."
                />
              </motion.div>

              {isSubmitting && (
                <motion.div
                  className="flex justify-center items-center gap-2 mb-4 py-3 bg-secondary bg-opacity-5 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-5 h-5">
                    <div className="absolute w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span className="text-secondary font-medium">
                    Submitting your opportunity...
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-secondary to-secondary-dark text-white py-4 rounded-xl font-semibold hover:from-secondary-dark hover:to-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {isSubmitting
                  ? "Submitting Opportunity..."
                  : "Post Opportunity 🚀"}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div
                  className="mt-4 p-4 bg-success bg-opacity-10 border border-success rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6 text-success flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-success font-medium">
                    Opportunity posted successfully! We'll connect you with
                    matching candidates soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="mt-4 p-4 bg-error bg-opacity-10 border border-error rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-6 h-6 text-error flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-error font-medium">
                    Error posting opportunity. Please try again.
                  </p>
                </motion.div>
              )}
            </motion.form>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary font-medium transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
}
