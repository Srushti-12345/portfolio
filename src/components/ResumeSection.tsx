import { motion } from "motion/react";
import { FileText, Download, Eye, Sparkles, Printer } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface ResumeSectionProps {
  onDownloadResume: () => void;
}

export default function ResumeSection({ onDownloadResume }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-[#0B1120]">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-[#06B6D4] tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            My Curriculum Vitae
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Professional Resume Preview
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            Inspect Srushti's structured qualifications or print/download a high-quality copy designed to highlight core development milestones.
          </p>
        </div>

        {/* Resume Preview layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Left Column: CTA details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="font-sans text-xl font-bold text-white leading-snug">
                Designed for Recruiters & Hiring Managers
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                This resume summarizes four years of theoretical training in Computer Science & Engineering paired with hands-on industrial internships, API security workflows, and full-stack deployments.
              </p>
            </div>

            {/* Resume Features bullet list */}
            <div className="space-y-3 bg-white/[0.01] border border-white/[0.03] p-5 rounded-2xl">
              <div className="flex items-start space-x-3 text-xs text-[#94A3B8] font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>Structured around ATS (Applicant Tracking System) friendly parameters.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-[#94A3B8] font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>Emphasizes verified MERN & Next.js production deployments.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-[#94A3B8] font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span>Explicitly presents GPA credentials and certification details.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/assets/Srushti_Tingane_Resume.pdf"
                download="Srushti_Tingane_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-[1.01] active:scale-95 text-white text-xs font-semibold tracking-wider transition-all duration-200 shadow-md flex items-center space-x-2 cursor-pointer no-underline"
              >
                <Download size={14} />
                <span>Download PDF Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: Premium High-Fidelity A4 Paper Preview */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full aspect-[1/1.4] rounded-[24px] bg-[#111827]/90 border border-white/[0.08] shadow-2xl p-6 sm:p-8 overflow-hidden relative select-none flex flex-col justify-between"
            >
              {/* Overlay shading to suggest paper dimension */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.02] pointer-events-none" />

              {/* Header inside Resume previews */}
              <div className="text-left border-b border-white/[0.05] pb-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans text-base sm:text-lg font-extrabold tracking-tight text-white uppercase">
                      {portfolioData.personalInfo.name}
                    </h4>
                    <p className="font-sans text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                      Computer Science Undergrad & Full Stack Dev
                    </p>
                  </div>
                  <FileText size={18} className="text-[#94A3B8]/40" />
                </div>
                
                {/* Meta details list */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[8px] text-[#94A3B8]">
                  <span>📧 {portfolioData.personalInfo.email}</span>
                  {portfolioData.personalInfo.phone?.trim() && <span>📱 {portfolioData.personalInfo.phone}</span>}
                  <span>📍 {portfolioData.personalInfo.location}</span>
                </div>
              </div>

              {/* Experience block inside preview */}
              <div className="space-y-3 text-left py-4 flex-1 overflow-hidden">
                {/* Section title */}
                <h5 className="font-mono text-[9px] text-[#06B6D4] uppercase tracking-widest font-extrabold border-b border-white/[0.03] pb-1">
                  WORK EXPERIENCE
                </h5>
                
                <div className="space-y-3">
                  {portfolioData.experience.map((exp, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-white font-bold">{exp.company} — {exp.role}</span>
                        <span className="font-mono text-[#94A3B8]/80">{exp.duration}</span>
                      </div>
                      <p className="text-[8px] text-[#94A3B8] leading-relaxed font-light line-clamp-2">
                        {exp.responsibilities[0]} {exp.responsibilities[1]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Education section inside preview */}
                <h5 className="font-mono text-[9px] text-[#06B6D4] uppercase tracking-widest font-extrabold border-b border-white/[0.03] pb-1 pt-2">
                  EDUCATION
                </h5>
                <div className="space-y-2">
                  {portfolioData.education.slice(0, 2).map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start text-[8px] sm:text-[9px]">
                      <div>
                        <span className="text-white font-bold block">{edu.degree}</span>
                        <span className="text-[#94A3B8]/80 block text-[8px]">{edu.institution}</span>
                      </div>
                      <span className="font-mono text-[#06B6D4] font-bold shrink-0">{edu.grade}</span>
                    </div>
                  ))}
                </div>

                {/* Skills overview inside preview */}
                <h5 className="font-mono text-[9px] text-[#06B6D4] uppercase tracking-widest font-extrabold border-b border-white/[0.03] pb-1 pt-2">
                  CORE TECHNICAL STACK
                </h5>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[8px] sm:text-[9px]">
                  <div>
                    <span className="text-slate-300 font-bold block">Frontend frameworks:</span>
                    <span className="text-[#94A3B8]/80 font-light block">React.js, Next.js, HTML5, CSS3, Tailwind CSS</span>
                  </div>
                  <div>
                    <span className="text-slate-300 font-bold block">Backend & DB:</span>
                    <span className="text-[#94A3B8]/80 font-light block">Node.js, Express, MongoDB, MySQL, REST APIs</span>
                  </div>
                </div>
              </div>

              {/* Watermark/Footer */}
              <div className="border-t border-white/[0.04] pt-3 flex justify-between items-center text-[8px] font-mono text-[#94A3B8]/50">
                <span>ATS Compatible Format</span>
                <span>© Srushti Sanjay Tingane</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
