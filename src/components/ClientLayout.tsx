"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Modern spinner with gradient */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-transparent border-t-primary border-r-secondary rounded-full animate-spin absolute top-0 left-0"></div>
            </div>

            {/* Optional loading text */}
            <motion.p
              className="text-gray-600 dark:text-gray-400 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading Tech Compass...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
