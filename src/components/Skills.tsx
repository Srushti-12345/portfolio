import { motion } from "motion/react";
import { 
  Laptop, 
  Server, 
  Database as DbIcon, 
  Code2, 
  Wrench, 
  HeartHandshake, 
  Sparkles,
  Terminal
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Skills() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Laptop size={18} className="text-purple-400" />;
      case "backend":
        return <Server size={18} className="text-cyan-400" />;
      case "database":
        return <DbIcon size={18} className="text-emerald-400" />;
      case "languages":
        return <Code2 size={18} className="text-pink-400" />;
      case "tools":
        return <Wrench size={18} className="text-blue-400" />;
      case "core":
        return <HeartHandshake size={18} className="text-yellow-400" />;
      default:
        return <Terminal size={18} className="text-purple-400" />;
    }
  };

  const getCategoryGlow = (category: string) => {
    switch (category) {
      case "frontend":
        return "group-hover:border-purple-500/20 group-hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)]";
      case "backend":
        return "group-hover:border-cyan-500/20 group-hover:shadow-[0_10px_30px_rgba(6,182,212,0.1)]";
      case "database":
        return "group-hover:border-emerald-500/20 group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]";
      case "languages":
        return "group-hover:border-pink-500/20 group-hover:shadow-[0_10px_30px_rgba(236,72,153,0.1)]";
      case "tools":
        return "group-hover:border-blue-500/20 group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]";
      case "core":
        return "group-hover:border-yellow-500/20 group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.1)]";
      default:
        return "group-hover:border-purple-500/20";
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0B1120]/50">
      {/* Decorative background blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            My Toolkit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Technical Stack & Core Strengths
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            An extensive compilation of languages, frameworks, developer tools, and structural practices I apply across industrial projects.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Frontend Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("frontend")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("frontend")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">Client Frontend</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.frontend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-purple-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Backend Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("backend")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("backend")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">Backend Systems</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.backend.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-cyan-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Databases Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("database")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("database")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">Databases</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.database.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-emerald-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Programming Languages Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("languages")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("languages")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.languages.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-pink-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Developer Tools Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("tools")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("tools")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">DevOps & Tooling</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.tools.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-blue-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Strengths Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between group transition-all duration-300 ${getCategoryGlow("core")}`}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3 pb-3 border-b border-white/[0.04]">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  {getCategoryIcon("core")}
                </div>
                <h3 className="font-sans text-base font-bold text-white">Core Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {portfolioData.skills.core.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3.5 py-2 rounded-xl group-hover:border-yellow-500/10 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
