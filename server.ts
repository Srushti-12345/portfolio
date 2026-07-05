import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";


// Load environment variables
dotenv.config();

const AI_RESPONSE_TIMEOUT_MS = Number(process.env.AI_RESPONSE_TIMEOUT_MS) || 3500;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeout);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function maskEmail(value?: string) {
  if (!value || !value.includes("@")) {
    return value ? "***" : null;
  }

  const [name, domain] = value.split("@");
  const visible = name.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(name.length - 2, 1))}@${domain}`;
}

function getNotificationDiagnostics() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser;

  return {
    smtpHost: process.env.SMTP_HOST || null,
    smtpPort: process.env.SMTP_PORT || "587",
    smtpUserConfigured: Boolean(smtpUser),
    smtpPassConfigured: Boolean(smtpPass),
    notificationEmailConfigured: Boolean(notificationEmail),
    smtpUser: maskEmail(smtpUser),
    notificationEmail: maskEmail(notificationEmail),
  };
}

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

// Lazily initialized Nodemailer Transporter
let mailTransporter: any = null;

function getMailTransporter() {
  if (!mailTransporter) {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("WARNING: SMTP_USER or SMTP_PASS environment variables are not set. Email notifications for contact form submissions will be skipped.");
      return null;
    }

    try {
      mailTransporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465, // true for port 465, false for other ports
        pool: true,
        maxConnections: 1,
        maxMessages: 50,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        requireTLS: port === 587,
        auth: {
          user,
          pass,
        },
      });
      console.log("Nodemailer SMTP Transporter initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Nodemailer transporter:", err);
      mailTransporter = null;
    }
  }
  return mailTransporter;
}

async function sendEmailNotification(name: string, email: string, subject: string, message: string, timestamp: Date) {
  const transporter = getMailTransporter();
  if (!transporter) {
    console.log("Skipping email notification because SMTP is not configured in .env.");
    return {
      ok: false,
      status: "skipped",
      reason: "SMTP_USER or SMTP_PASS is not configured",
      ...getNotificationDiagnostics(),
    };
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!notificationEmail) {
    console.warn("WARNING: NOTIFICATION_EMAIL is not set, and unable to fallback to SMTP_USER.");
    return {
      ok: false,
      status: "skipped",
      reason: "Notification recipient is not configured",
      ...getNotificationDiagnostics(),
    };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "No Subject");
  const safeMessage = escapeHtml(message);
  const receivedAt = timestamp.toLocaleString();

  const mailOptions = {
    from: `"Portfolio Enquiry" <${process.env.SMTP_USER}>`,
    to: notificationEmail,
    subject: `[Portfolio Contact] ${subject || "New enquiry"} - ${name} <${email}>`,
    priority: "high" as const,
    headers: {
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
      Importance: "high",
    },
    text: `You have received a new message from your portfolio contact form:
    
Name: ${name}
Email: ${email}
Subject: ${subject || "No Subject"}
Received At: ${receivedAt}

Message:
------------------------------------------
${message}
------------------------------------------

Contact the sender at: ${email}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Portfolio Enquiry</h2>
        <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #2d3748;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
            <td style="padding: 8px 0; color: #2d3748;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Subject:</td>
            <td style="padding: 8px 0; color: #2d3748;">${safeSubject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Received At:</td>
            <td style="padding: 8px 0; color: #2d3748;">${receivedAt}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 15px; background-color: #f7fafc; border-left: 4px solid #4f46e5; border-radius: 4px;">
          <p style="margin: 0; font-weight: bold; color: #4a5568;">Message:</p>
          <p style="margin: 10px 0 0 0; color: #2d3748; white-space: pre-wrap; font-style: italic;">"${safeMessage}"</p>
        </div>
        <p style="margin-top: 25px; font-size: 13px; color: #2d3748; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          Reply to the sender here: <a href="mailto:${safeEmail}" style="color: #4f46e5;">${safeEmail}</a>
        </p>
        <p style="margin-top: 10px; font-size: 11px; color: #718096; text-align: center;">
          This message was sent automatically from your portfolio contact form.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const accepted = Array.isArray(info.accepted) ? info.accepted.join(", ") : "";
    const rejected = Array.isArray(info.rejected) ? info.rejected.join(", ") : "";

    if (rejected) {
      console.warn(`Email notification had rejected recipients. Accepted: ${accepted || "none"}. Rejected: ${rejected}. Message ID: ${info.messageId}`);
      return {
        ok: false,
        status: "failed",
        messageId: info.messageId,
        accepted,
        rejected,
        reason: "SMTP rejected one or more recipients",
      };
    }

    console.log(`Email notification accepted by SMTP. Accepted: ${accepted || notificationEmail}. Message ID: ${info.messageId}`);
    return {
      ok: true,
      status: "sent",
      messageId: info.messageId,
      accepted: accepted || notificationEmail,
      rejected,
    };
  } catch (err) {
    console.error("Failed to send email notification:", err);
    return {
      ok: false,
      status: "failed",
      reason: err instanceof Error ? err.message : "Unknown email notification error",
    };
  }
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

async function saveContactSubmission(name: string, email: string, subject: string, message: string, timestamp: Date) {
  try {
    const dbClient = await getMongoClient();
    if (dbClient && process.env.MONGODB_URI) {
      const dbName = getDatabaseName(process.env.MONGODB_URI);
      const db = dbClient.db(dbName);
      const collection = db.collection("enquiries");
      const result = await collection.insertOne({
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp,
        emailNotification: {
          status: "pending",
          updatedAt: new Date(),
        },
      });
      console.log("Successfully saved contact submission to MongoDB.");
      return result.insertedId;
    }
  } catch (dbErr) {
    console.error("Failed to save contact submission to MongoDB database:", dbErr);
  }

  return null;
}

async function updateContactEmailNotification(contactId: ObjectId | null, emailNotification: Record<string, unknown>) {
  if (!contactId) {
    return;
  }

  try {
    const dbClient = await getMongoClient();
    if (dbClient && process.env.MONGODB_URI) {
      const dbName = getDatabaseName(process.env.MONGODB_URI);
      await dbClient
        .db(dbName)
        .collection("enquiries")
        .updateOne(
          { _id: contactId },
          {
            $set: {
              emailNotification: {
                ...emailNotification,
                updatedAt: new Date(),
              },
            },
          }
        );
    }
  } catch (dbErr) {
    console.error("Failed to update email notification status in MongoDB:", dbErr);
  }
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

app.use((req, res, next) => {
  const allowedOrigins = (process.env.CORS_ORIGIN || "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const requestOrigin = req.headers.origin;
  const allowAnyOrigin = allowedOrigins.includes("*");

  if (allowAnyOrigin) {
    res.header("Access-Control-Allow-Origin", "*");
  } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.header("Access-Control-Allow-Origin", requestOrigin);
    res.header("Vary", "Origin");
  }

  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

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

  if (lowercaseMsg.includes("project") || lowercaseMsg.includes("donorsync") || lowercaseMsg.includes("expense") || lowercaseMsg.includes("portfolio") || lowercaseMsg.includes("work")) {
    reply += "• **DonorSync**: Full-stack blood donation platform using React, Node, Express, MongoDB, JWT, and Tailwind CSS.\n• **Axinex Technologies Website**: Production corporate site with responsive UI, enquiry handling, authentication, and email automation.\n• **ABVP Portal & Anklet Construction**: Responsive client portals with clean frontend architecture.";
  } else if (lowercaseMsg.includes("experience") || lowercaseMsg.includes("internship") || lowercaseMsg.includes("company") || lowercaseMsg.includes("job")) {
    reply += "• **Axinex Technologies**: Web Developer Intern from May 2026, working on production-level frontend and backend modules.\n• **Pugarch Technology Pvt. Ltd.**: Web Developer Intern from July 2025 to December 2025, building MERN and responsive web projects.";
  } else if (lowercaseMsg.includes("skills") || lowercaseMsg.includes("tech") || lowercaseMsg.includes("stack") || lowercaseMsg.includes("technology") || lowercaseMsg.includes("language")) {
    reply += "• **Frontend**: React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion.\n• **Backend**: Node.js, Express.js, REST APIs, JWT, Nodemailer.\n• **Database & tools**: MongoDB, MySQL, Git, GitHub, Postman, Vercel, Render.";
  } else if (lowercaseMsg.includes("education") || lowercaseMsg.includes("cgpa") || lowercaseMsg.includes("college") || lowercaseMsg.includes("degree") || lowercaseMsg.includes("school")) {
    reply += "• **B.E. Computer Science & Engineering**: Sipna College of Engineering and Technology, Amravati. Current CGPA: 8.72.\n• **HSC**: 84.17%.\n• **SSC**: 99%, school topper.";
  } else if (lowercaseMsg.includes("achievement") || lowercaseMsg.includes("award") || lowercaseMsg.includes("scholarship") || lowercaseMsg.includes("certification")) {
    reply += "• Leela Poonawalla Foundation Scholarship recipient.\n• SSC school topper with 99%.\n• Master of Ceremonies for major college events.\n• Deloitte Australia Data Analytics Job Simulation and Java certifications.";
  } else if (lowercaseMsg.includes("contact") || lowercaseMsg.includes("email") || lowercaseMsg.includes("phone") || lowercaseMsg.includes("linkedin") || lowercaseMsg.includes("github")) {
    reply += "• **Email**: srushtitingane25@gmail.com\n• **Phone**: +91 8766400264\n• **GitHub**: https://github.com/Srushti-12345\n• **LinkedIn**: https://www.linkedin.com/in/srushti-tingane-97387327b";
  } else {
    reply += "Srushti Sanjay Tingane is a Computer Science Engineering student and Full Stack Web Developer with experience in React, Next.js, Node.js, Express, MongoDB, responsive UI, authentication, and production client projects.";
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
  const lowercaseMsg = latestMessage.toLowerCase();

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

    const response = await withTimeout(
      client.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
        contents: `Conversation context:\n${conversation}\n\nLatest User Message: ${latestMessage}`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        }
      }),
      AI_RESPONSE_TIMEOUT_MS,
      "Gemini assistant response"
    );

    const replyText = response.text || "I'm here to help you learn more about Srushti's work! Ask me about her projects or technical experience.";
    res.json({ text: replyText });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    res.json({ text: getOfflineAssistantReply(lowercaseMsg) });
  }
});

app.get("/api/notification-health", (req, res) => {
  res.json({
    ok: true,
    ...getNotificationDiagnostics(),
  });
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

  res.json({ success: true, message: "Thank you for reaching out! Srushti will get back to you shortly." });

  // Save and notify after responding so database and SMTP latency never slow down the form.
  void (async () => {
    const contactSavePromise = saveContactSubmission(name, email, subject, message, timestamp);
    const emailNotificationPromise = sendEmailNotification(name, email, subject, message, timestamp);
    const [contactId, emailNotification] = await Promise.all([
      contactSavePromise,
      emailNotificationPromise,
    ]);

    if (!emailNotification.ok) {
      console.warn("Email notification did not send:", emailNotification);
    }

    await updateContactEmailNotification(contactId, emailNotification);
  })().catch((error) => {
    console.error("Contact background task failed:", error);
  });
});

// Vite server integrations
async function startServer() {
  // Serve files inside the "assets" folder on /assets route
  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  const isBuiltServer = process.argv[1]?.includes(`${path.sep}dist${path.sep}`) ?? false;
  const isProduction = process.env.NODE_ENV === "production" || isBuiltServer;

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
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

export default app;

if (!process.env.VERCEL) {
  startServer();
}
