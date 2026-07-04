import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Terminal, ArrowUpRight, HelpCircle } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface AIAssistantProps {
  onDownloadResume: () => void;
}

export default function AIAssistant({ onDownloadResume }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      sender: "assistant",
      text: "Hi there! 👋 I'm Srushti's Portfolio Assistant. I can answer questions about her technical projects, professional experience, education, and achievements. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about Srushti.",
    "Axinex internship?",
    "Show her projects.",
    "What is her CGPA?",
    "Leela Poonawalla?",
    "Contact Srushti."
  ];

  // Auto scroll to chat end
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Guard/Trigger local download resume in frontend directly
    if (text.toLowerCase().includes("download resume") || text.toLowerCase().includes("resume link")) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: "assistant",
            text: "Certainly! I have triggered the download for Srushti's PDF resume. Let me know if you need any other assistance!",
            timestamp: new Date()
          }
        ]);
        onDownloadResume();
      }, 800);
      return;
    }

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          text: data.text || "I'm sorry, I'm having trouble matching that details. Ask me specifically about Srushti's projects or skills!",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error("Assistant API Error:", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "assistant",
          text: "I'm Srushti's Portfolio Assistant. I can answer questions about her projects, experience, education, skills, and achievements.",
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expand/Collapse Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-500 text-white flex items-center justify-center shadow-[0_4px_24px_rgba(139,92,246,0.4)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Small subtle notification beacon */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[500px] rounded-3xl glass-panel border border-white/[0.08] shadow-2xl flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Header */}
            <div className="p-4 bg-white/[0.02] border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px] flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-xl bg-[#0B1120] flex items-center justify-center">
                    <Sparkles size={13} className="text-purple-400" />
                  </div>
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-white">Srushti's Copilot</h4>
                  <p className="font-mono text-[8px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                    Powered by Gemini 3.5
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[8px] text-white/40 uppercase">Interactive Sandbox</span>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-purple-600/80 text-white rounded-br-none border border-purple-500/10"
                        : "bg-white/[0.03] text-[#F8FAFC]/95 border border-white/[0.05] rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line font-sans font-light">{m.text}</p>
                  </div>
                </div>
              ))}

              {/* Typing indicator inside assistant frame */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl rounded-bl-none p-3 flex space-x-1 items-center">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts carousel */}
            <div className="px-4 py-2 bg-black/20 border-t border-white/[0.03] overflow-x-auto whitespace-nowrap flex items-center space-x-1.5 scrollbar-none">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white/[0.02] border border-white/[0.04] rounded-full text-[10px] text-slate-300 hover:text-white hover:bg-white/[0.04] hover:border-purple-500/20 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
                >
                  <span>{s}</span>
                  <ArrowUpRight size={10} className="opacity-40" />
                </button>
              ))}
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-white/[0.02] border-t border-white/[0.04] flex items-center space-x-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about projects, education, skills..."
                className="flex-1 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
