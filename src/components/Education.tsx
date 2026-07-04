import { motion } from "motion/react";
import { GraduationCap, Calendar, Award, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#0B1120]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-[#06B6D4] tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Education & Academic Honors
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            An outstanding academic track record combining computer science foundations with excellent grades, capped by top state board ranks.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.04] flex flex-col justify-between group hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Dynamic light highlight on hover */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-6 text-left relative z-10">
                {/* Meta details */}
                <div className="flex justify-between items-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <GraduationCap size={18} className="text-purple-400" />
                  </div>
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-slate-300 bg-white/[0.01] border border-white/[0.05] px-2.5 py-1 rounded-lg">
                    <Calendar size={11} className="text-purple-400" />
                    <span>{edu.duration}</span>
                  </div>
                </div>

                {/* Main Titles */}
                <div className="space-y-1">
                  <h3 className="font-sans text-base font-bold text-white leading-snug group-hover:text-purple-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed">
                    {edu.institution}
                  </p>
                </div>

                {/* Score badge */}
                <div className="flex items-center space-x-1.5 self-start py-1.5 px-3 rounded-lg bg-cyan-950/20 border border-cyan-500/15 text-cyan-400 font-mono text-xs font-extrabold w-fit uppercase">
                  <Award size={13} />
                  <span>{edu.grade}</span>
                </div>

                {/* Core description */}
                <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed pt-2 border-t border-white/[0.03]">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
