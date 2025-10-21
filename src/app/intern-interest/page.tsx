// src/app/intern-interest/page.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tr } from "zod/locales";

const internSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  courseOfStudy: z.string().min(1, "Course of study is required"),
  levelOfStudy: z.string().min(1, "Level of study is required"),
  institution: z.string().min(1, "Institution is required"),
  skills: z.string().optional(),
  trackOfInterest: z.string().min(1, "Track of interest is required"),
  linkedinProfile: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
});

type InternFormData = z.infer<typeof internSchema>;

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function InternInterest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<InternFormData>({
    resolver: zodResolver(internSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setResumeFile(null);
      setResumeUrl("");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("resume" as any, {
        type: "manual",
        message: "Resume must be under 5MB",
      });
      setResumeFile(null);
      setResumeUrl("");
      return;
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      setError("resume" as any, {
        type: "manual",
        message: "Only PDF and DOC files are allowed",
      });
      setResumeFile(null);
      setResumeUrl("");
      return;
    }

    clearErrors("resume" as any);
    setResumeFile(file);
    setResumeUrl(""); // Clear previous upload

    toast.info(`📄 ${file.name} selected. Click "Upload Resume" to upload.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const res = await fetch("https://tech-compass.onrender.com/student");
          if (!res.ok) {
            throw new Error("Failed to fetch students");
          }
          const data = await res.json();
          console.log("📊 Students response:", data);
        } catch (error) {
          console.error("❌ Error fetching students:", error);
        }
      };

      fetchStudents();
    }, []);

  const handleResumeUpload = async () => {
    if (!resumeFile) {
      toast.error("Please select a file first", {
        position: "top-right",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileData = new FormData();
      fileData.append("file", resumeFile);

      const uploadRes = await fetch(
        "https://tech-compass.onrender.com/file-upload",
        {
          method: "POST",
          body: fileData,
        }
      );

      if (!uploadRes.ok) {
        throw new Error("File upload failed");
      }

      const response = await uploadRes.json();
      setResumeUrl(response.fileUrl);

      toast.success("✅ Resume uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to upload resume. Please try again.", {
        position: "top-right",
      });
      setResumeUrl("");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<InternFormData> = async (data) => {
    // Check if resume is selected but not uploaded
    if (resumeFile && !resumeUrl) {
      toast.warning("⚠️ Please upload your resume before submitting", {
        position: "top-right",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        courseOfStudy: data.courseOfStudy,
        levelOfStudy: data.levelOfStudy,
        track: data.trackOfInterest,
        institution: data.institution,
        resumeUrl,
        skills: data.skills || "",
        linkedinProfile: data.linkedinProfile || "",
      };

      const response = await fetch(
        "https://tech-compass.onrender.com/student",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Application submission failed");
      }

      toast.success("🎉 Application submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setShowModal(true);
      reset();
      setResumeFile(null);
      setResumeUrl("");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error submitting application. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
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
        {/* Header */}
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
            <span className="text-white font-semibold">For Students</span>
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
            tech companies. Fill out the form below and let&apos;s find your
            perfect internship match!
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
                Submit your application in under 5 minutes. We&apos;ll review
                and get back to you within 48 hours.
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

          {/* Form */}
          <motion.div
            className="lg:col-span-2"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-soft-lg border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto"
              variants={formVariants}
              initial="hidden"
              animate="visible"
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
                  label="Phone Number"
                  name="phone"
                  register={register}
                  error={errors.phone}
                  placeholder="+234 801 234 5678"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Institution"
                  name="institution"
                  register={register}
                  error={errors.institution}
                  placeholder="University of Lagos"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Course of Study"
                  name="courseOfStudy"
                  register={register}
                  error={errors.courseOfStudy}
                  placeholder="Computer Science"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Level of Study"
                  name="levelOfStudy"
                  register={register}
                  error={errors.levelOfStudy}
                  placeholder="300 Level"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="trackOfInterest"
                  className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                >
                  Track of Interest
                </label>
                <select
                  id="trackOfInterest"
                  {...register("trackOfInterest")}
                  defaultValue=""
                  className={`w-full rounded-xl border-2 p-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition`}
                >
                  <option value="" disabled>
                    Select your preferred track
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Product Design">Product Design</option>
                </select>
                {errors.trackOfInterest && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.trackOfInterest.message}
                  </p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="Skills (comma-separated)"
                  name="skills"
                  register={register}
                  error={errors.skills}
                  placeholder="JavaScript, React, Python"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  label="LinkedIn Profile"
                  name="linkedinProfile"
                  register={register}
                  error={errors.linkedinProfile}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </motion.div>

              {/* Resume Upload Section */}
              <motion.div variants={itemVariants} className="mb-6">
                <label
                  htmlFor="resume"
                  className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
                >
                  Upload Resume (PDF/DOC, max 5MB)
                </label>

                <div className="space-y-3">
                  {/* File Input */}
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full text-gray-700 dark:text-gray-200 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-gray-600 file:to-gray-700 file:text-white hover:file:from-gray-700 hover:file:to-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-2"
                  />

                  {/* File Info & Upload Button */}
                  {resumeFile && (
                    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center gap-2 text-sm flex-1 min-w-0">
                        <span className="text-gray-600 dark:text-gray-400 truncate">
                          📄 {resumeFile.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-500 flex-shrink-0">
                          ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>

                      {!resumeUrl ? (
                        <button
                          type="button"
                          onClick={handleResumeUpload}
                          disabled={isUploading}
                          className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg text-sm font-semibold hover:from-primary-dark hover:to-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        >
                          {isUploading ? "Uploading..." : "Upload Resume"}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 flex-shrink-0">
                          <span>✅</span>
                          <span className="font-semibold">Uploaded</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-4 rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5"
              >
                {isSubmitting
                  ? "Submitting Application..."
                  : "Submit Application 🚀"}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* Success Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                🎉 Application Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your application is under review. Please check your email for
                updates.
              </p>
              <button
                onClick={() => {
                  setShowModal(false);
                  router.push("/");
                }}
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-semibold hover:from-primary-dark hover:to-primary transition-all"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </motion.div>
  );
}
