// src/app/intern-interest/page.tsx
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

const internSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  university: z.string().min(1, "University is required"),
  skills: z.string().optional(),
  resume: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Resume must be under 5MB"
    ),
});

type InternFormData = z.infer<typeof internSchema>;

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

export default function InternInterest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [resumePreview, setResumePreview] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InternFormData>({
    resolver: zodResolver(internSchema),
  });

  const onSubmit: SubmitHandler<InternFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("university", data.university);
      if (data.skills) formData.append("skills", data.skills);
      if (data.resume) formData.append("resume", data.resume);

      const response = await fetch("/api/intern-interest", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
      toast.success(
        "🎉 Application submitted successfully! We'll be in touch soon.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
      reset();
      setResumePreview(null);
    } catch (error) {
      setSubmitStatus("error");
      toast.error("❌ Error submitting. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumePreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:py-20 sm:px-8"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-10 rounded-full mb-4"
            variants={itemVariants}
          >
            <span className="text-2xl">🎓</span>
            <span className="text-primary font-semibold">For Students</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Start Your Tech Journey
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join hundreds of ambitious Nigerian students connecting with top
            tech companies. Fill out the form below and let's find your perfect
            internship match!
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
              <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Quick Process
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Submit your application in under 5 minutes. We'll review and get
                back to you within 48 hours.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                Smart Matching
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our algorithm matches you with opportunities aligned to your
                skills and career goals.
              </p>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-success bg-opacity-10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                No Fees
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completely free for students. Focus on building your skills, not
                paying fees.
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
                  label="Full Name"
                  name="name"
                  register={register}
                  error={errors.name}
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Email Address"
                  name="email"
                  register={register}
                  error={errors.email}
                  type="email"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="University"
                  name="university"
                  register={register}
                  error={errors.university}
                  placeholder="University of Lagos"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Skills (comma-separated)"
                  name="skills"
                  register={register}
                  error={errors.skills}
                  placeholder="JavaScript, Python, React, UI/UX Design"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="resume"
                  className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                >
                  Upload Resume (PDF/DOC, max 5MB)
                </label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("resume")}
                    onChange={handleFileChange}
                    className="w-full text-gray-700 dark:text-gray-200 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-primary file:to-primary-dark file:text-white hover:file:from-primary-dark hover:file:to-primary file:transition-all file:duration-300 file:cursor-pointer cursor-pointer border-2 border-gray-200 dark:border-gray-700 rounded-xl p-2 hover:border-primary transition-all duration-300"
                  />
                </div>
                {errors.resume && (
                  <motion.p
                    className="text-error text-sm mt-2 flex items-center gap-1"
                    role="alert"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.resume.message}
                  </motion.p>
                )}
                {resumePreview && (
                  <motion.a
                    href={resumePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm mt-2 flex items-center gap-1 hover:underline font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Preview Resume
                  </motion.a>
                )}
              </motion.div>

              {isSubmitting && (
                <motion.div
                  className="flex justify-center items-center gap-2 mb-4 py-3 bg-primary bg-opacity-5 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-5 h-5">
                    <div className="absolute w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span className="text-primary font-medium">
                    Submitting your application...
                  </span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {isSubmitting
                  ? "Submitting Application..."
                  : "Submit Application 🚀"}
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
                    Application submitted successfully! Check your email for
                    next steps.
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
                    Error submitting application. Please try again.
                  </p>
                </motion.div>
              )}
            </motion.form>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary font-medium transition-colors"
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
