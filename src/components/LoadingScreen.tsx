import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 500); // Allow fade-out animation to complete
          }, 400);
          return 100;
        }
        // Random incremental steps for organic feel
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B1120]"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />

          <div className="relative flex flex-col items-center max-w-xs w-full px-4">
            {/* Logo Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mb-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_40px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full rounded-2xl bg-[#0B1120] flex items-center justify-center">
                  <span className="font-sans text-3xl font-extrabold tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text-primary">
                    ST
                  </span>
                </div>
              </div>
              
              {/* Dynamic decorative outer ring */}
              <motion.div 
                className="absolute -inset-2 rounded-2xl border border-purple-500/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full flex justify-between items-center mb-2 font-mono text-xs text-[#94A3B8]"
            >
              <span>SRUSHTI TINGANE</span>
              <span className="text-purple-400 font-semibold">{progress}%</span>
            </motion.div>

            {/* Progress bar wrapper */}
            <div className="h-[3px] w-full bg-gray-800/80 rounded-full overflow-hidden relative border border-white/[0.02]">
              {/* Actual progressing fill */}
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                style={{ width: `${progress}%` }}
                layoutId="progressBarFill"
              />
            </div>

            {/* Subtle motivational quote/slogan underneath */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-[10px] uppercase tracking-[0.25em] text-center text-[#94A3B8] font-mono"
            >
              Initializing Portfolio Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
