import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

function getDatabaseName(uri: string): string {
  try {
    const cleanUri = uri.replace(/^mongodb(\+srv)?:\/\//, "http://");
    const parsed = new URL(cleanUri);
    // Remove leading slash
    const db = parsed.pathname.substring(1);
    if (db && db !== "" && db !== "/") {
      return db;
    }
  } catch (e) {
    console.error("Error parsing database name from MONGODB_URI:", e);
  }
  return "axinex";
}

// Lazily initialized MongoDB Client
let mongoClient: MongoClient | null = null;

async function getMongoClient() {
  if (!mongoClient) {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn("WARNING: MONGODB_URI environment variable is not set. Contact submissions will only be logged to the console.");
      return null;
    }
    try {
      mongoClient = new MongoClient(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      await mongoClient.connect();
      console.log("Successfully connected to MongoDB Database.");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      mongoClient = null;
    }
  }
  return mongoClient;
}

// Lazily initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Portfolio assistant will run in backup offline-matching mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "srushti-portfolio",
        }
      }
    });
  }
  return aiClient;
}

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Structured context for Srushti's Portfolio Assistant
const assistantContext = {
  name: "Srushti Sanjay Tingane",
  role: "Full Stack Web Developer & UI/UX Enthusiast",
  education: {
    bachelor: "Bachelor of Engineering (Computer Science & Engineering) at Sipna College of Engineering and Technology, Amravati (2023 - 2027). Current CGPA is 8.72.",
    hsc: "Higher Secondary Certificate (HSC) at Shri Ramkrishna Junior College, Amravati (2023) with 84.17%.",
    ssc: "Secondary School Certificate (SSC) at Shri Ramkrishna Krida Vidyalaya, Amravati (2021) with 99% (School Topper)."
  },
  experience: [
    {
      company: "Axinex Technologies",
      role: "Web Developer Intern",
      duration: "May 2026 – Present",
      responsibilities: [
        "Developing production-level web applications",
        "Building scalable frontend and backend modules",
        "Developing the official company website",
        "Working on a dynamic employee appraisal management platform",
        "Implementing secure JWT authentication and role-based access control",
        "API integration and email automation using Nodemailer",
        "Deploying applications using Vercel, Render, and MongoDB Atlas"
      ],
      stack: "Next.js, React.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, JWT Authentication, Nodemailer"
    },
    {
      company: "Pugarch Technology Pvt. Ltd.",
      role: "Web Developer Intern",
      duration: "July 2025 – December 2025",
      responsibilities: [
        "Developed responsive websites and MERN Stack applications",
        "Built projects including Expense Tracker, Weather App, and UI-based applications",
        "Worked with REST APIs and MongoDB",
        "Improved frontend communication and application responsiveness"
      ]
    }
  ],
  featuredProjects: [
    {
      name: "Axinex Technologies Official Website",
      category: "Production Client Project",
      status: "Live (https://axinextechnologies.com)",
      description: "Official corporate website featuring modern responsive UI, dynamic service catalogs, enquiry handling system, secure authentication, and Nodemailer email automation.",
      tech: "Next.js, React, TypeScript, Tailwind, Node.js, Express, MongoDB, JWT, Nodemailer, Render, Vercel"
    },
    {
      name: "ABVP Portal",
      category: "Production Client Project",
      status: "Frontend Completed, Backend In Progress (https://abvp-portal-link.vercel.app/)",
      description: "Regional student network portal built with a responsive user interface and scalable frontend components."
    },
    {
      name: "Anklet Construction",
      category: "Production Client Project",
      status: "Frontend Completed, Backend In Progress (https://anklet-construction.vercel.app/)",
      description: "Modern corporate website for a premier construction company highlighting high-fidelity grids, specs, and clean responsive templates."
    }
  ],
  personalProjects: [
    {
      name: "DonorSync",
      category: "Personal Project",
      status: "Completed (Demo: https://donorsync-frontend.vercel.app/, GitHub: https://github.com/Srushti-12345/donorsync)",
      description: "Full-stack blood donation platform connecting donors and recipients with role-based auth, live dashboards, and matching workflows.",
      tech: "React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS"
    },
    {
      name: "Expense Tracker",
      category: "Personal Project",
      status: "Completed (Demo: https://exp-tracker-rho.vercel.app/, GitHub: https://github.com/Srushti-12345/expense-tracker)",
      description: "Ledger dashboard supporting categorizations, transactional streams, and budget tracking metrics.",
      tech: "React, Node, Express, MongoDB, Tailwind"
    }
  ],
  miniProjects: [
    "Weather App: Forecaster connected to external REST APIs with visual climate transitions.",
    "Event Hub: Student hackathon and university event planner.",
    "Food Ordering Website: Interactive menus, shopping cart states, and beautiful animation loops.",
    "Book Store Website: Shopping portal with dynamic inventory catalogs.",
    "Dynamic Appraisal Management System: Enterprise performance tracker built at Axinex Technologies."
  ],
  skills: {
    frontend: "HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, React.js, Next.js, Framer Motion",
    backend: "Node.js, Express.js, REST APIs, JWT, Nodemailer",
    database: "MongoDB, MySQL, MongoDB Atlas, MongoDB Compass",
    languages: "Java, JavaScript, Python, C, C++",
    tools: "Git, GitHub, Postman, VS Code, Vercel, Render, MongoDB Atlas, MongoDB Compass",
    core: "Full Stack Development, MERN Stack, JWT Authentication, REST API Development, API Integration, Responsive Design, UI/UX Design, Team Collaboration, Problem Solving"
  },
  achievements: [
    "Leela Poonawalla Foundation Scholarship Recipient (engineering scholar).",
    "SSC School Topper with 99%.",
    "Master of Ceremonies for major events including HackGenX Hackathon, Vidyotan Technical Fest, and academic summits.",
    "Deloitte Australia Data Analytics Job Simulation Certification.",
    "Java Development Bootcamp Certification by Angela Yu.",
    "Java Programming Certification by CCIT."
  ],
  contact: {
    email: "srushtitingane25@gmail.com",
    phone: "+91 8766400264",
    location: "Amravati, Maharashtra",
    github: "https://github.com/Srushti-12345",
    linkedin: "https://www.linkedin.com/in/srushti-tingane-97387327b"
  }
};

function getOfflineAssistantReply(lowercaseMsg: string): string {
  let reply = "I'm Srushti's Portfolio Assistant. I'm currently running in local backup mode. Here is what I can tell you:\n\n";

  if (lowercaseMsg.includes("project") || lowercaseMsg.includes("donorsync") || lowercaseMsg.includes("expense")) {
    reply += "• **DonorSync**: Full-stack blood donation platform (React, Node, MongoDB).\n• **Axinex Technologies Website**: Production corporate site with secure enquiry modules.\n• **ABVP Portal & Anklet Construction**: Current responsive client portals.";
  } else if (lowercaseMsg.includes("experience") || lowercaseMsg.includes("internship")) {
    reply += "• **Axinex Technologies** (Web Developer Intern, May 2026 - Present)\n• **Pugarch Technology** (Web Developer Intern, July 2025 - December 2025)";
  } else if (lowercaseMsg.includes("skills") || lowercaseMsg.includes("tech")) {
    reply += "• **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, Express.js, MongoDB, REST APIs";
  } else if (lowercaseMsg.includes("education") || lowercaseMsg.includes("cgpa")) {
    reply += "• **Bachelor of Engineering**: CSE at Sipna College (CGPA: 8.72)\n• **SSC**: School Topper (99%)";
  } else {
    reply += "Srushti Sanjay Tingane is a talented Full Stack Web Developer and final year Computer Science student. Ask me specifically about her **projects**, **experience**, **skills**, **achievements**, or **education**!";
  }

  return reply;
}

// System instruction enforcing strict scope rules
const systemPrompt = `You are the Portfolio Assistant for Srushti Sanjay Tingane. You represent Srushti, an accomplished Computer Science & Engineering student and Full Stack Developer.
Your task is to answer queries strictly about Srushti's background, professional projects, academic journey, achievements, and technical stack.

Here is Srushti's professional portfolio data:
${JSON.stringify(assistantContext, null, 2)}

Strict Guidelines:
1. Speak in a premium, warm, professional, and friendly third-person or representative first-person voice.
2. ONLY answer questions directly related to Srushti's projects, experience, education, skills, achievements, or contact details.
3. If the user asks about unrelated topics (such as writing general code unrelated to Srushti, cooking recipes, general science questions, solving random math equations, or anything outside Srushti's professional details), you MUST reply EXACTLY with:
"I'm Srushti's Portfolio Assistant. I can answer questions about her projects, experience, education, skills, and achievements."
4. If they ask about downloading her resume, kindly instruct them to click the "Download Resume" button on the website.
5. Keep your responses highly concise, beautifully structured (using markdown bullet points where appropriate), and polite. Avoid long paragraphs.`;

// Assistant API endpoint
app.post("/api/assistant", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array." });
  }

  const latestMessage = messages[messages.length - 1]?.text || "";

  // Guard: Quick safety scan to verify if it is Srushti-related
  const lowercaseMsg = latestMessage.toLowerCase();
  const portfolioKeywords = [
    "srushti", "tingane", "project", "work", "experience", "internship", "college", 
    "skills", "education", "achievements", "contact", "email", "phone", "resume", "cv",
    "axinex", "pugarch", "donorsync", "expense", "weather", "event", "react", "mern",
    "mongodb", "scholarship", "poonawalla", "leela", "mc", "hackgenx", "vidyotan"
  ];
  
  const isRelated = portfolioKeywords.some(keyword => lowercaseMsg.includes(keyword)) || 
                     lowercaseMsg.includes("who are you") || 
                     lowercaseMsg.includes("tell me about") ||
                     lowercaseMsg.includes("hello") || 
                     lowercaseMsg.includes("hi");

  if (!isRelated) {
    return res.json({
      text: "I'm Srushti's Portfolio Assistant. I can answer questions about her projects, experience, education, skills, and achievements."
    });
  }

  const client = getGeminiClient();

  if (!client) {
    return res.json({ text: getOfflineAssistantReply(lowercaseMsg) });
  }

  try {
    // Map recent messages to Gemini client generateContent
    // Since we want to include conversational context, we format recent chat items
    const conversation = messages.map(m => {
      return `${m.sender === "user" ? "User" : "Assistant"}: ${m.text}`;
    }).join("\n");

    const response = await client.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: `Conversation context:\n${conversation}\n\nLatest User Message: ${latestMessage}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      }
    });

    const replyText = response.text || "I'm here to help you learn more about Srushti's work! Ask me about her projects or technical experience.";
    res.json({ text: replyText });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.json({ text: getOfflineAssistantReply(lowercaseMsg) });
  }
});

// Serve Contact Enquiry endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please provide name, email, and message." });
  }

  const timestamp = new Date();
  
  // Log message internally
  console.log(`[Contact Submission] From: ${name} <${email}>, Subject: ${subject || "None"}, Msg: ${message}`);

  try {
    const dbClient = await getMongoClient();
    if (dbClient && process.env.MONGODB_URI) {
      const dbName = getDatabaseName(process.env.MONGODB_URI);
      const db = dbClient.db(dbName);
      const collection = db.collection("enquiries");
      await collection.insertOne({
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp
      });
      console.log("Successfully saved contact submission to MongoDB.");
    }
  } catch (dbErr) {
    console.error("Failed to save contact submission to MongoDB database:", dbErr);
    // Continue and return success to the user so user experience isn't broken
  }

  res.json({ success: true, message: "Thank you for reaching out! Srushti will get back to you shortly." });
});

// Vite server integrations
async function startServer() {
  // Serve files inside the "assets" folder on /assets route
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  const isBuiltServer = process.argv[1]?.includes(`${path.sep}dist${path.sep}`) ?? false;
  const isProduction = process.env.NODE_ENV === "production" || isBuiltServer;

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        hmr: false,
        middlewareMode: true,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(DEFAULT_PORT, "0.0.0.0", () => {
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : DEFAULT_PORT;
    console.log(`Server successfully started at http://localhost:${port}`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE" && !process.env.PORT) {
      const nextPort = DEFAULT_PORT + 1;
      console.warn(`Port ${DEFAULT_PORT} is already in use. Trying http://localhost:${nextPort} instead...`);
      server.close(() => {
        app.listen(nextPort, "0.0.0.0", () => {
          console.log(`Server successfully started at http://localhost:${nextPort}`);
        });
      });
      return;
    }

    throw error;
  });
}

startServer();
