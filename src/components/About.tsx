import { motion } from "motion/react";
import { 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  Globe, 
  Palette, 
  Users, 
  Award, 
  Mic, 
  User,
  Sparkles
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function About() {
  // Map string to actual Lucide Icon Component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap size={22} className="text-purple-400" />;
      case "Briefcase":
        return <Briefcase size={22} className="text-cyan-400" />;
      case "Rocket":
        return <Rocket size={22} className="text-pink-400" />;
      case "Globe":
        return <Globe size={22} className="text-blue-400" />;
      case "Palette":
        return <Palette size={22} className="text-purple-400" />;
      case "Users":
        return <Users size={22} className="text-emerald-400" />;
      case "Award":
        return <Award size={22} className="text-yellow-400" />;
      case "Mic":
        return <Mic size={22} className="text-pink-400" />;
      default:
        return <User size={22} className="text-purple-400" />;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0B1120]">
      {/* Decorative Blur Background Orb */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            Who Is Srushti?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Crafting Digital Stories Through Code
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
        </div>

        {/* About Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Narrative Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl glass-panel border border-white/[0.06] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500" />
              
              <h3 className="font-sans text-xl font-bold text-white mb-4">
                Hi, I'm Srushti Sanjay Tingane
              </h3>
              
              <p className="text-[#94A3B8] text-sm leading-relaxed font-light whitespace-pre-line">
                {portfolioData.about.story}
              </p>

              {/* Dynamic tag indicators */}
              <div className="pt-8 flex flex-wrap gap-2">
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/15 text-purple-400 font-semibold uppercase tracking-wider">
                  #FullStack
                </span>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/15 text-cyan-400 font-semibold uppercase tracking-wider">
                  #MERNstack
                </span>
                <span className="font-mono text-[9px] px-2.5 py-1 rounded-md bg-pink-500/10 border border-pink-500/15 text-pink-400 font-semibold uppercase tracking-wider">
                  #UIUXDesign
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Beautiful Highlights Interactive Grid */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <h4 className="font-mono text-[10px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold mb-4">
                CORE PROFESSIONAL HIGHLIGHTS
              </h4>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {portfolioData.about.highlights.map((highlight) => (
                <motion.div
                  key={highlight.id}
                  variants={itemVariants}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl flex items-start space-x-4 border border-white/[0.04] text-left"
                >
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] shadow-inner shrink-0">
                    {getIcon(highlight.icon)}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-sans text-sm font-semibold text-white">
                      {highlight.title}
                    </h5>
                    <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed">
                      {highlight.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
