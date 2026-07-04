import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Sparkles, Terminal } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface HeroProps {
  onDownloadResume: () => void;
}

export default function Hero({ onDownloadResume }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotating roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.personalInfo.titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Spotlight mouse effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToWork = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Floating micro tech icons data
  const techBubbles = [
    { name: "React", x: "12%", y: "20%", delay: 0, color: "text-cyan-400" },
    { name: "TypeScript", x: "85%", y: "25%", delay: 1, color: "text-blue-500" },
    { name: "NodeJS", x: "78%", y: "70%", delay: 2, color: "text-emerald-500" },
    { name: "MongoDB", x: "15%", y: "68%", delay: 1.5, color: "text-green-400" },
    { name: "NextJS", x: "50%", y: "15%", delay: 0.5, color: "text-white" },
    { name: "Tailwind", x: "88%", y: "48%", delay: 2.5, color: "text-sky-400" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#0B1120] overflow-hidden pt-28 pb-16"
    >
      {/* Dynamic Mouse Spotlight Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />

      {/* Grid Pattern and Ambient Blobs */}
      <div className="absolute inset-0 ambient-dot-grid opacity-30 pointer-events-none" />
      
      {/* Left Blob */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"
      />

      {/* Right Blob */}
      <motion.div
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"
      />

      {/* Floating Interactive Technology Tags */}
      {techBubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute hidden md:flex items-center space-x-1.5 glass-panel px-3 py-1.5 rounded-full border border-white/5 shadow-lg select-none text-[11px] font-mono tracking-wider ${bubble.color}`}
          style={{ left: bubble.x, top: bubble.y }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{bubble.name}</span>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Column: Core Info */}
        <div className="lg:col-span-7 flex flex-col space-y-8 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start flex items-center space-x-2 glass-panel border border-purple-500/10 px-3.5 py-1.5 rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#F8FAFC]/90 uppercase font-semibold flex items-center gap-1">
              <Sparkles size={11} className="text-purple-400" />
              Available for Collaboration & Projects
            </span>
          </motion.div>

          {/* Large Name Header */}
          <div className="space-y-3">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-xs text-cyan-400 tracking-[0.2em] font-semibold uppercase"
            >
              CS STUDENT & SOFTWARE DEVELOPER
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-none"
            >
              SRUSHTI{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text-primary">
                TINGANE
              </span>
            </motion.h1>
          </div>

          {/* Rotating Role Slot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="h-10 flex items-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-2 text-xl sm:text-2xl font-semibold text-slate-300 font-sans"
              >
                <Terminal size={18} className="text-purple-400" />
                <span>{portfolioData.personalInfo.titles[roleIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Slogan details */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed max-w-xl border-l border-white/5 pl-4"
          >
            {portfolioData.personalInfo.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={scrollToWork}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-[1.02] active:scale-95 text-white text-xs font-semibold tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(139,92,246,0.3)] flex items-center space-x-2 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="/assets/Srushti_Tingane_Resume.pdf"
              download="Srushti_Tingane_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] active:scale-95 text-white text-xs font-semibold tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer no-underline"
            >
              <Download size={14} className="text-[#94A3B8]" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Quick Stats Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 max-w-md text-left"
          >
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">2+</p>
              <p className="text-[10px] tracking-wider text-[#94A3B8] font-mono uppercase">Internships</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">10+</p>
              <p className="text-[10px] tracking-wider text-[#94A3B8] font-mono uppercase">Projects</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white font-mono">8.72</p>
              <p className="text-[10px] tracking-wider text-[#94A3B8] font-mono uppercase">CGPA CSE</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Right Column: Beautiful Glass Interactive Device card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center relative group"
        >
          {/* Subtle spinning backdrop glow */}
          <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-cyan-400/30 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

          {/* Premium Device Frame Card mock */}
          <div className="relative w-full max-w-[340px] rounded-[28px] glass-panel border border-white/[0.08] p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient inner light */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Simulated window control indicators */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="font-mono text-[9px] text-[#94A3B8]/60 uppercase tracking-widest">
                srushti_tingane.sh
              </span>
            </div>

            {/* Visually impressive placeholder avatar & details */}
            <div className="relative flex flex-col items-center py-6 text-center">
              <div className="relative mb-6">
                {/* Orbital dots */}
                <motion.div 
                  className="absolute -inset-3 rounded-full border border-dashed border-purple-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Srushti Monogram/Image Sphere */}
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#111827] via-[#1E293B] to-[#0F172A] p-1.5 border border-white/[0.06] shadow-xl flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600/25 via-pink-600/10 to-cyan-500/25 flex flex-col items-center justify-center relative overflow-hidden">
                    {!imageError ? (
                      <img 
                        src="/assets/profile-image (1).jpeg" 
                        alt="Srushti Sanjay Tingane" 
                        className="w-full h-full object-cover rounded-full select-none"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <>
                        <span className="font-sans text-5xl font-extrabold tracking-wider text-white glow-text-primary">
                          ST
                        </span>
                        <span className="text-[7.5px] font-mono text-cyan-400 mt-1 uppercase tracking-widest font-bold">
                          Interactive
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Developer Credentials List */}
              <div className="w-full space-y-2 text-left font-mono text-[10px] text-slate-300">
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-[#94A3B8]">const name =</span>
                  <span className="text-purple-300 font-semibold">"Srushti Tingane"</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-[#94A3B8]">const college =</span>
                  <span className="text-cyan-300">"Sipna COET"</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                  <span className="text-[#94A3B8]">const focus =</span>
                  <span className="text-pink-300">"Full Stack Web"</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span className="text-[#94A3B8]">const status =</span>
                  <span className="text-emerald-400 font-bold">"Ready To Deploy"</span>
                </div>
              </div>
            </div>

            {/* Simulated mini analytics dashboard overlay */}
            <div className="mt-4 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[9px] text-[#94A3B8]">Live Preview Sandbox</span>
              </div>
              <span className="font-mono text-[9px] text-cyan-400 font-semibold">60 FPS</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Elegant animated scroll indicator at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-[#94A3B8]/60 uppercase select-none">
          Scroll Down
        </span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-4 h-7 rounded-full border border-white/20 p-1 flex justify-center"
        >
          <div className="w-1 h-1.5 bg-purple-400 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
