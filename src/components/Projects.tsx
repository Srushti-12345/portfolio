import { motion } from "motion/react";
import { Globe, Github, Lock, ArrowUpRight, Code, Sparkles, FolderGit2 } from "lucide-react";
import { portfolioData, Project } from "../data/portfolioData";

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  // Combine featured and personal projects for uniform listing, or split them
  const allMainProjects: Project[] = [
    ...portfolioData.featuredProjects,
    ...portfolioData.personalProjects
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0B1120]/30">
      {/* Decorative Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-center items-center">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            My Creations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Featured Production & Personal Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            A selective catalog showcasing end-to-end full stack products, secure community portals, and high-performance business applications.
          </p>
        </div>

        {/* Bento Grid layout for main projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {allMainProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="glass-panel rounded-3xl border border-white/[0.04] overflow-hidden flex flex-col justify-between group hover:border-purple-500/20 hover:shadow-[0_15px_30px_rgba(139,92,246,0.1)] transition-all duration-300 relative text-left"
            >
              {/* Premium Card Glow on Hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

              {/* Card Header Media slot mockup */}
              <div className="h-44 bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-b border-white/[0.04] p-5 flex flex-col justify-between relative overflow-hidden shrink-0 select-none">
                {/* Real screenshot background overlay if exists */}
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-all duration-500 scale-100 group-hover:scale-105 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Visual grid overlay inside header */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Flowing overlay lines */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/90 via-transparent to-transparent pointer-events-none" />

                {/* Status and category tags */}
                <div className="flex justify-between items-start relative z-10">
                  <span className="font-mono text-[9px] font-extrabold px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/20 text-purple-400 uppercase tracking-wider shadow-sm">
                    {project.category}
                  </span>
                  
                  <span className="font-mono text-[9px] font-semibold px-2.5 py-1 rounded-md bg-[#0B1120]/80 border border-white/5 text-slate-300 shadow-md">
                    {project.statusText}
                  </span>
                </div>

                {/* Project Monogram visuals inside card */}
                <div className="flex items-end justify-between relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 border border-white/10 flex items-center justify-center">
                    <Code size={16} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  {project.isPrivateRepo && (
                    <span className="text-red-400/80 bg-red-950/20 border border-red-500/10 rounded-full p-1.5" title="Private Repo">
                      <Lock size={11} />
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-sans text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#94A3B8] font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Micro tech tags */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] text-[#94A3B8] bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="font-mono text-[9px] text-purple-400 font-semibold bg-purple-500/5 px-2 py-0.5 rounded">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-1 border-t border-white/[0.03] pt-3">
                    {project.badges.slice(0, 2).map((b, i) => (
                      <span key={i} className="text-[8px] font-mono uppercase font-bold text-cyan-400/80 bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 shrink-0 flex items-center justify-between border-t border-white/[0.03] mt-auto">
                <button
                  onClick={() => onSelectProject(project)}
                  className="font-mono text-[10px] text-[#94A3B8] group-hover:text-purple-400 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Details</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center space-x-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
                      title="Launch App"
                    >
                      <Globe size={13} />
                    </a>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
                      title="View GitHub"
                    >
                      <Github size={13} />
                    </a>
                  ) : (
                    project.isPrivateRepo && (
                      <span className="p-2 rounded-lg text-slate-600 cursor-not-allowed" title="Confidential Source Code">
                        <Lock size={13} />
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects Section (Mini cards list) */}
        <div className="mt-24 space-y-6 max-w-5xl mx-auto">
          <div className="flex flex-col space-y-1 text-left">
            <span className="font-mono text-[10px] text-[#06B6D4] tracking-[0.22em] font-semibold uppercase flex items-center gap-1.5">
              <FolderGit2 size={13} />
              Supplemental Archive
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-white">
              Other Personal & Internship Projects
            </h3>
            <div className="h-0.5 w-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.additionalProjects.map((mini, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-panel p-5 rounded-2xl border border-white/[0.04] hover:border-cyan-500/20 flex flex-col justify-between text-left group transition-all"
              >
                <div className="space-y-2">
                  <h4 className="font-sans text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {mini.name}
                  </h4>
                  <p className="font-sans text-xs text-[#94A3B8] leading-relaxed font-light">
                    {mini.desc}
                  </p>
                </div>
                
                {/* Mini tech badges */}
                <div className="flex flex-wrap gap-1 pt-4 border-t border-white/[0.02] mt-3">
                  {mini.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[8px] text-cyan-400 bg-cyan-950/15 border border-cyan-500/5 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
