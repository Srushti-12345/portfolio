import { motion } from "motion/react";
import { Briefcase, Calendar, CheckCircle2, Award, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0B1120]">
      {/* Background ambient radial light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-[#06B6D4] tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            Professional History
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Relevant Industry Internships
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            Hands-on software development roles contributing to live commercial portals, user authentication modules, and transactional tools.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.04] relative overflow-hidden group hover:border-purple-500/20 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.1)] transition-all duration-300"
            >
              {/* Corner decorative visual mesh */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent pointer-events-none rounded-bl-full" />

              {/* Company & Role Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.04]">
                <div className="flex items-center space-x-4 text-left">
                  {/* Monogram placeholder logo */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E293B] to-[#0F172A] border border-white/[0.06] p-[1px] flex items-center justify-center shrink-0 shadow-lg">
                    <span className="font-mono font-bold text-sm text-cyan-400 uppercase tracking-widest">
                      {exp.logoPlaceholder}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-sans text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {exp.company}
                    </h3>
                    <p className="font-sans text-sm text-[#94A3B8] font-medium flex items-center gap-1.5">
                      <Briefcase size={14} className="text-[#94A3B8]/60" />
                      {exp.role}
                    </p>
                  </div>
                </div>

                {/* Timeline Duration */}
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-300 bg-white/[0.02] border border-white/[0.05] px-4 py-2 rounded-xl self-start md:self-auto">
                  <Calendar size={13} className="text-purple-400" />
                  <span>{exp.duration}</span>
                </div>
              </div>

              {/* Technical Stack Tags */}
              <div className="py-6">
                <h4 className="font-mono text-[9px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold mb-3 text-left">
                  ROLE TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] text-slate-300 bg-[#111827]/80 border border-white/[0.03] px-3 py-1.5 rounded-lg group-hover:border-purple-500/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Responsibilities & Achievements Dual Column */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/[0.03] text-left">
                {/* Core Responsibilities */}
                <div className="md:col-span-8 space-y-4">
                  <h4 className="font-mono text-[9px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold">
                    CORE RESPONSIBILITIES & TASKS
                  </h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#94A3B8] font-light">
                        <CheckCircle2 size={15} className="text-[#06B6D4] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Accomplishments */}
                <div className="md:col-span-4 space-y-4">
                  <h4 className="font-mono text-[9px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold">
                    KEY ACHIEVEMENTS
                  </h4>
                  <div className="space-y-3">
                    {exp.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] space-y-1.5 relative overflow-hidden"
                      >
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-purple-500" />
                        <Award size={15} className="text-purple-400" />
                        <p className="font-sans text-xs text-white font-medium leading-relaxed">
                          {ach}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
