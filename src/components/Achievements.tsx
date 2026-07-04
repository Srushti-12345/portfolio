import { motion } from "motion/react";
import { Award, CheckCircle2, Trophy, Mic, ShieldCheck, FileCheck, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Achievements() {
  const getAchievementIcon = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes("scholarship") || lowercaseTitle.includes("scholar")) {
      return <Trophy size={20} className="text-yellow-400" />;
    } else if (lowercaseTitle.includes("topper")) {
      return <Award size={20} className="text-pink-400" />;
    } else if (lowercaseTitle.includes("ceremonies") || lowercaseTitle.includes("host")) {
      return <Mic size={20} className="text-purple-400" />;
    } else if (lowercaseTitle.includes("deloitte") || lowercaseTitle.includes("simulation")) {
      return <ShieldCheck size={20} className="text-cyan-400" />;
    } else {
      return <FileCheck size={20} className="text-blue-400" />;
    }
  };

  const getCardColor = (title: string) => {
    const lowercaseTitle = title.toLowerCase();
    if (lowercaseTitle.includes("scholarship") || lowercaseTitle.includes("scholar")) {
      return "group-hover:border-yellow-500/20 group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.08)]";
    } else if (lowercaseTitle.includes("topper")) {
      return "group-hover:border-pink-500/20 group-hover:shadow-[0_10px_30px_rgba(236,72,153,0.08)]";
    } else if (lowercaseTitle.includes("ceremonies")) {
      return "group-hover:border-purple-500/20 group-hover:shadow-[0_10px_30px_rgba(139,92,246,0.08)]";
    } else {
      return "group-hover:border-cyan-500/20 group-hover:shadow-[0_10px_30px_rgba(6,182,212,0.08)]";
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#0B1120]/50">
      {/* Ambient background blob */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            Honors & Certifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Achievements & Professional Credentials
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            A listing of recognized academic honors, industry-standard training certifications, and public leadership roles.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portfolioData.achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`glass-panel p-6 rounded-2xl border border-white/[0.04] flex flex-col justify-between text-left group transition-all duration-300 ${getCardColor(ach.title)}`}
            >
              <div className="space-y-4">
                {/* Monogram category and Icon */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.03]">
                  <div className="p-2.5 rounded-xl bg-[#111827]/80 border border-white/[0.04] shadow-md group-hover:scale-105 transition-transform">
                    {getAchievementIcon(ach.title)}
                  </div>
                  <span className="font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase font-semibold">
                    Verified Credential
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-purple-400 transition-colors leading-snug">
                    {ach.title}
                  </h4>
                  <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center space-x-1.5 pt-4 border-t border-white/[0.02] mt-4">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span className="font-mono text-[9px] uppercase font-bold text-[#94A3B8]/80">
                  Certified / Active
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
