import { motion } from "motion/react";
import { Milestone, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Journey() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#0B1120]/50">
      {/* Decorative Blur Orbs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-20 text-center items-center">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            My Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            How Far I've Come
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-lg mt-3">
            A chronological look into my learning curve, shifting from basic syntax to shipping live production applications.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central spine connecting line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-600 via-pink-500 to-cyan-500/20 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {portfolioData.journey.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Milestones glowing dot on central spine */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0B1120] border-2 border-purple-500 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <Milestone size={12} className="text-purple-400" />
                  </div>

                  {/* Left spacing panel to balance alignment on large screens */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.04] inline-block w-full text-left relative overflow-hidden">
                      {/* Top border ambient highlight */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500/50 to-cyan-500/50" />
                      
                      {/* Milestone Date Accent */}
                      <span className="font-mono text-[11px] font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1.5 block">
                        {item.year}
                      </span>
                      
                      <h4 className="font-sans text-base font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      
                      <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
