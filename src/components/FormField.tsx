"use client";

import { FieldError, UseFormRegister } from "react-hook-form";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

type BaseProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
};

type InputProps = BaseProps & {
  as?: "input";
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & {
  as: "textarea";
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = InputProps | TextareaProps;

export default function FormField(props: FormFieldProps) {
  const { label, name, register, error, as = "input", ...rest } = props;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
    >
      <label
        htmlFor={name}
        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary hover:border-gray-300 dark:hover:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm hover:shadow-soft`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={name}
          type={(props as InputProps).type ?? "text"}
          {...register(name)}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary hover:border-gray-300 dark:hover:border-gray-600"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 shadow-sm hover:shadow-soft`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <motion.p
          id={`${name}-error`}
          className="text-error text-sm mt-2 flex items-center gap-1"
          role="alert"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
}
