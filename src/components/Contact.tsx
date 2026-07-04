import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email formatting.";
    }
    if (!formData.message.trim()) newErrors.message = "Please include an enquiry message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setIsSending(false);

      if (response.ok && data.success) {
        setSendSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSendSuccess(false), 5000); // Clear checkmark after 5 seconds
      } else {
        setErrors({ form: data.error || "Sending failed. Try again." });
      }
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setIsSending(false);
      setErrors({ form: "Network error. Srushti is reachable directly via email." });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0B1120]/30">
      {/* Background radial lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-16 text-left">
          <span className="font-mono text-xs text-purple-400 tracking-[0.2em] font-semibold uppercase flex items-center gap-1.5">
            <Sparkles size={11} />
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Get In Touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mt-3">
            Whether you are a recruiter looking to fill an internship position or a client seeking custom full-stack solutions, drop Srushti a line!
          </p>
        </div>

        {/* Contact Dual Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-6">
              <h3 className="font-sans text-xl font-bold text-white leading-snug">
                Connect Directly
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
                Feel free to utilize the secure messaging portal or connect through Srushti's primary communication handles.
              </p>
            </div>

            {/* Structured details stack */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/15 text-purple-400">
                  <Mail size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-widest block font-bold">Email</span>
                  <a href={`mailto:${portfolioData.personalInfo.email}`} className="font-sans text-xs sm:text-sm text-white hover:text-purple-400 transition-colors">
                    {portfolioData.personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/15 text-cyan-400">
                  <Phone size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-widest block font-bold">Phone</span>
                  <a href={`tel:${portfolioData.personalInfo.phone}`} className="font-sans text-xs sm:text-sm text-white hover:text-cyan-400 transition-colors">
                    {portfolioData.personalInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/15 text-pink-400">
                  <MapPin size={16} />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-widest block font-bold">Location</span>
                  <span className="font-sans text-xs sm:text-sm text-white block">
                    {portfolioData.personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="flex items-center space-x-3 pt-4 border-t border-white/[0.03]">
              <a
                href={portfolioData.personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Github size={18} />
              </a>
              <a
                href={portfolioData.personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.05] shadow-xl relative overflow-hidden h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!sendSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase font-bold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full bg-[#111827]/80 border border-white/[0.04] focus:border-purple-500/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={10} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase font-bold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="yourname@gmail.com"
                          className="w-full bg-[#111827]/80 border border-white/[0.04] focus:border-purple-500/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                            <AlertCircle size={10} />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase font-bold">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Inquiry Topic"
                        className="w-full bg-[#111827]/80 border border-white/[0.04] focus:border-purple-500/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-[#94A3B8] tracking-widest uppercase font-bold">
                        Message Content
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="How can Srushti assist your project or team?"
                        className="w-full bg-[#111827]/80 border border-white/[0.04] focus:border-purple-500/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                      />
                      {errors.message && (
                        <p className="text-[10px] text-red-400 flex items-center gap-1 font-mono">
                          <AlertCircle size={10} />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Form error warning */}
                    {errors.form && (
                      <p className="text-xs text-red-400 flex items-center gap-1.5 font-sans justify-center bg-red-950/20 py-2.5 rounded-xl border border-red-500/10">
                        <AlertCircle size={13} />
                        {errors.form}
                      </p>
                    )}

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 active:scale-95 text-white text-xs font-semibold tracking-wider transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-55"
                    >
                      {isSending ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing Message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <CheckCircle2 size={32} className="text-emerald-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-sans text-lg font-bold text-white">Transmission Successful</h4>
                      <p className="font-sans text-xs text-[#94A3B8] font-light max-w-sm">
                        Thank you for reaching out! Srushti has received your enquiry and will reply via your provided inbox details shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
