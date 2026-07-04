import { motion } from "motion/react";
import { X, Globe, Github, Lock, CheckCircle2, AlertCircle, ShieldAlert, Sparkles } from "lucide-react";
import { Project } from "../data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop backdrop-blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-md cursor-pointer"
      />

      {/* Main Modal Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl max-h-[85vh] rounded-[24px] glass-panel border border-white/[0.08] shadow-2xl overflow-y-auto z-10 flex flex-col text-left"
      >
        {/* Banner with Status Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 flex items-start justify-between border-b border-white/[0.04] mt-2 shrink-0">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-[#06B6D4] font-semibold uppercase">
              {project.category}
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-white">
              {project.name}
            </h3>
            
            {/* Status indicators */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[#94A3B8]">
                {project.statusText}
              </span>
              {project.isPrivateRepo && (
                <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/15 text-red-400 flex items-center gap-1">
                  <Lock size={10} />
                  Private Repository
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Project Screenshot Showcase if exists */}
          {project.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0B1120]/40 aspect-[16/9] shadow-inner select-none mb-6">
              <img 
                src={project.imageUrl} 
                alt={`${project.name} preview`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Extended description block */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold">
              PROJECT OVERVIEW
            </h4>
            <p className="font-sans text-[#F8FAFC]/90 text-sm sm:text-base leading-relaxed font-light">
              {project.extendedDescription || project.description}
            </p>
          </div>

          {/* Project Technical Stack */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-[#94A3B8] tracking-[0.2em] uppercase font-bold">
              TECHNOLOGIES DEPLOYED
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs text-slate-300 bg-[#111827]/60 border border-white/[0.04] px-3.5 py-1.5 rounded-xl shadow-inner"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Dynamic lists (Features, Challenges, Contribution) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Features list */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-mono text-[10px] text-[#06B6D4] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                  <Sparkles size={11} />
                  KEY CAPABILITIES & FEATURES
                </h4>
                <ul className="space-y-3">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#94A3B8] font-light">
                      <CheckCircle2 size={15} className="text-[#06B6D4] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges list */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-mono text-[10px] text-pink-400 tracking-[0.2em] uppercase font-bold flex items-center gap-1.5">
                  <AlertCircle size={12} />
                  DEVELOPMENT CHALLENGES OVERCOME
                </h4>
                <ul className="space-y-3">
                  {project.challenges.map((chal, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#94A3B8] font-light">
                      <ShieldAlert size={15} className="text-pink-400/80 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* My contribution list */}
          {project.contribution && project.contribution.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-white/[0.04]">
              <h4 className="font-mono text-[10px] text-purple-400 tracking-[0.2em] uppercase font-bold">
                MY INDIVIDUAL CONTRIBUTIONS
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.contribution.map((contrib, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-[#94A3B8] font-light bg-white/[0.01] border border-white/[0.02] p-3 rounded-xl">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer (Action Links) */}
        <div className="p-6 sm:p-8 border-t border-white/[0.04] flex flex-wrap gap-4 shrink-0 bg-black/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 active:scale-95 text-white text-xs font-semibold tracking-wide flex items-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <Globe size={14} />
              <span>Launch Live Site</span>
            </a>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] active:scale-95 text-white text-xs font-semibold tracking-wide flex items-center space-x-2 transition-all cursor-pointer"
            >
              <Github size={14} className="text-[#94A3B8]" />
              <span>Browse Source Code</span>
            </a>
          ) : (
            project.isPrivateRepo && (
              <span className="px-5 py-2.5 rounded-xl bg-white/[0.01] border border-white/[0.04] text-[#94A3B8] text-xs font-semibold tracking-wide flex items-center space-x-2 cursor-not-allowed">
                <Lock size={14} className="opacity-40" />
                <span>Source Code Confidential</span>
              </span>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
