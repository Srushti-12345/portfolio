import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, FileText } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface NavbarProps {
  onDownloadResume: () => void;
}

export default function Navbar({ onDownloadResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Journey", id: "journey" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Achievements", id: "achievements" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B1120]/80 backdrop-blur-md border-b border-white/[0.05] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center cursor-pointer focus:outline-none group"
          >
            <span className="font-sans font-bold text-sm tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
              Srushti Tingane
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 relative cursor-pointer ${
                  activeSection === link.id
                    ? "text-white"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                {/* Active Indicator Backdrop */}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/[0.07] border border-white/[0.05] rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop Call to Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Social Icons */}
            <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={portfolioData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            {/* Resume Button */}
            <a
              href="/assets/Srushti_Tingane_Resume.pdf"
              download="Srushti_Tingane_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold tracking-wide hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[0_4px_12px_rgba(139,92,246,0.25)] flex items-center space-x-1.5 cursor-pointer no-underline"
            >
              <FileText size={14} />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            <a
              href="/assets/Srushti_Tingane_Resume.pdf"
              download="Srushti_Tingane_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-semibold tracking-wide no-underline"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08]"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#0B1120]/95 backdrop-blur-xl flex flex-col justify-center"
          >
            {/* Background Blob */}
            <div className="absolute top-1/3 left-1/2 w-64 h-64 -translate-x-1/2 rounded-full bg-purple-600/10 blur-[80px]" />

            <div className="relative px-8 flex flex-col items-center space-y-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xl font-semibold tracking-wide transition-all ${
                    activeSection === link.id
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-6 pt-6 border-t border-white/10 w-full max-w-xs justify-center"
              >
                <a
                  href={portfolioData.personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] text-[#94A3B8] hover:text-white border border-white/5"
                >
                  <Github size={20} />
                </a>
                <a
                  href={portfolioData.personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/[0.03] text-[#94A3B8] hover:text-white border border-white/5"
                >
                  <Linkedin size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
