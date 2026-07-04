import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import ResumeSection from "./components/ResumeSection";
import Contact from "./components/Contact";
import AIAssistant from "./components/AIAssistant";
import ProjectModal from "./components/ProjectModal";
import { Project } from "./data/portfolioData";
import { ArrowUp, Terminal, ShieldCheck } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadResume = () => {
    // Trigger direct download of the real uploaded PDF resume
    const link = document.createElement("a");
    link.href = "/assets/Srushti_Tingane_Resume.pdf";
    link.download = "Srushti_Tingane_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Premium Loading Screen Entrance */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen text-[#F8FAFC] selection:bg-purple-500/30 selection:text-white print:bg-white print:text-black"
        >
          {/* Main sticky navigation */}
          <div className="print:hidden">
            <Navbar onDownloadResume={handleDownloadResume} />
          </div>

          {/* Interactive Core Sections */}
          <main className="relative">
            <Hero onDownloadResume={handleDownloadResume} />
            
            <div id="about-group" className="relative">
              <About />
              <Journey />
            </div>

            <Experience />
            
            <Projects onSelectProject={(project) => setSelectedProject(project)} />
            
            <Skills />
            
            <Education />
            
            <Achievements />
            
            <ResumeSection onDownloadResume={handleDownloadResume} />
            
            <Contact />
          </main>

          {/* Premium Professional Footer */}
          <footer className="py-12 border-t border-white/[0.04] bg-[#070B16] relative overflow-hidden print:hidden">
            {/* Visual background grid inside footer */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center md:text-left">
              <div className="space-y-1.5">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
                    <div className="w-full h-full rounded-md bg-[#0B1120] flex items-center justify-center">
                      <span className="font-mono text-[9px] font-bold text-white">ST</span>
                    </div>
                  </div>
                  <span className="font-sans font-extrabold text-sm text-white">
                    Srushti Sanjay Tingane
                  </span>
                </div>
                <p className="font-sans text-xs text-[#94A3B8] font-light">
                  MERN & Full-Stack Developer • Sipna COET Amravati Class of 2027
                </p>
              </div>

              {/* Security and stack credentials */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[#94A3B8] text-[10px] font-mono">
                <span className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] px-2.5 py-1 rounded-lg">
                  <Terminal size={11} className="text-purple-400" />
                  React + Express fullstack
                </span>
                <span className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] px-2.5 py-1 rounded-lg">
                  <ShieldCheck size={11} className="text-cyan-400" />
                  Secure JWT API
                </span>
              </div>
            </div>
          </footer>

          {/* Floating AI Assistant Chatbot Panel */}
          <div className="print:hidden">
            <AIAssistant onDownloadResume={handleDownloadResume} />
          </div>

          {/* Scroll To Top Anchor Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] shadow-lg transition-colors cursor-pointer print:hidden"
                title="Back to top"
              >
                <ArrowUp size={16} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Project Details Modal */}
          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
