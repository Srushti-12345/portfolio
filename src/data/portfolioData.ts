export interface Project {
  id: string;
  name: string;
  status: "live" | "in-progress" | "completed" | string;
  statusText: string;
  category: "Production Client Project" | "Personal Project" | string;
  description: string;
  extendedDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrivateRepo?: boolean;
  badges: string[];
  features?: string[];
  challenges?: string[];
  contribution?: string[];
  imageUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    icon?: string;
  }[];
}

export const portfolioData = {
  personalInfo: {
    name: "Srushti Sanjay Tingane",
    shortName: "Srushti Tingane",
    initials: "ST",
    tagline: "Crafting scalable web applications with clean architecture, intuitive user experiences, and modern technologies. Passionate about transforming ideas into impactful digital products.",
    titles: [
      "Full Stack Web Developer",
      "MERN Stack Developer",
      "UI/UX Enthusiast",
      "Creative Designer",
      "Problem Solver"
    ],
    email: "srushtitingane25@gmail.com",
    phone: "",
    location: "Amravati, Maharashtra",
    github: "https://github.com/Srushti-12345",
    linkedin: "https://www.linkedin.com/in/srushti-tingane-97387327b",
    portfolioUrl: "#",
    resumeUrl: "/assets/Srushti_Tingane_Resume.pdf", // Direct download or preview link
  },
  about: {
    story: "Hi, I'm Srushti Tingane, a passionate Full Stack Web Developer currently pursuing my Bachelor's in Computer Science & Engineering. I enjoy building scalable web applications, crafting intuitive user experiences, and solving real-world problems through technology.\n\nCurrently working as a Web Developer Intern at Axinex Technologies, where I contribute to production-level client projects. Previously, I completed my internship at Pugarch Technology Pvt. Ltd. I continuously learn new technologies while building meaningful digital experiences.",
    highlights: [
      { id: "cs-student", title: "Final Year CS Student", icon: "GraduationCap", desc: "Computer Science & Engineering at Sipna College" },
      { id: "internships", title: "2 Internship Experiences", icon: "Briefcase", desc: "Axinex Technologies & Pugarch Technology" },
      { id: "production-dev", title: "Production Level Dev", icon: "Rocket", desc: "Shipped fully functional real client websites" },
      { id: "real-clients", title: "Real Client Projects", icon: "Globe", desc: "Active business and regional portal deployments" },
      { id: "uiux", title: "UI/UX Enthusiast", icon: "Palette", desc: "Focused on premium interfaces and smooth motion" },
      { id: "collab", title: "Team Collaboration", icon: "Users", desc: "Worked with design, backend, and marketing teams" },
      { id: "scholarship", title: "Scholarship Recipient", icon: "Award", desc: "Leela Poonawalla Foundation Scholar" },
      { id: "mc", title: "Master of Ceremonies", icon: "Mic", desc: "Host of HackGenX, Vidyotan & major college fests" }
    ]
  },
  journey: [
    { year: "2023", title: "Started Bachelor of Engineering", desc: "Enrolled in Computer Science & Engineering at Sipna College, Amravati." },
    { year: "2024", title: "Foundations & Web Stack", desc: "Mastered core algorithms, HTML, CSS, JavaScript, and database concepts." },
    { year: "2024 - Mid", title: "MERN Stack Development", desc: "Deep dived into Node.js, React, Express, MongoDB and API architectures." },
    { year: "2024 - End", title: "Personal Ventures", desc: "Built DonorSync, Expense Tracker, and multiple standalone SaaS projects." },
    { year: "2025 (Jul - Dec)", title: "Internship at Pugarch Technology", desc: "Web Developer Intern. Delivered responsive applications, REST APIs, and client widgets." },
    { year: "2026 (May - Present)", title: "Internship at Axinex Technologies", desc: "Web Developer Intern. Building appraisal engines, secure company sites, and full-stack integrations." }
  ],
  experience: [
    {
      company: "Axinex Technologies",
      role: "Web Developer Intern",
      duration: "May 2026 – Present",
      logoPlaceholder: "AT",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Nodemailer", "MongoDB Atlas", "Render", "Vercel"],
      responsibilities: [
        "Developing production-level web applications and frontend/backend modular systems.",
        "Developing and structuring the official company portal and high-conversion landing pages.",
        "Engineering a dynamic Employee Appraisal Management System with complex role permissions.",
        "Implementing secure JWT token authentication, route guards, and Nodemailer email automation.",
        "Managing cloud environments across Vercel, Render, and MongoDB Atlas clusters."
      ],
      achievements: [
        "Successfully finalized core modules of the official corporate website.",
        "Accelerated data fetching workflows in the appraisal dashboard by 40%."
      ]
    },
    {
      company: "Pugarch Technology Pvt. Ltd.",
      role: "Web Developer Intern",
      duration: "July 2025 – December 2025",
      logoPlaceholder: "PT",
      technologies: ["React.js", "MongoDB", "Node.js", "Express.js", "REST APIs", "Tailwind CSS", "Bootstrap"],
      responsibilities: [
        "Created fully responsive client websites and interactive MERN stack widgets.",
        "Engineered modular financial engines including the Pugarch Expense Tracker.",
        "Developed dynamic Weather monitoring cards connected to external REST APIs.",
        "Collaborated with UI teams to audit accessibility standards across critical pages."
      ],
      achievements: [
        "Boosted mobile page performance across client sites by 25%.",
        "Wrote clean, documentation-first code standardizing future intern codebases."
      ]
    }
  ],
  featuredProjects: [
    {
      id: "axinex",
      name: "Axinex Technologies Portal",
      status: "live",
      statusText: "🟢 LIVE",
      category: "Production Client Project",
      description: "Developed and contributed to the official company website with modern responsive UI, dynamic service management, enquiry handling system, secure authentication, admin management, email automation, and deployment.",
      extendedDescription: "A comprehensive corporate solution containing client-facing service interfaces, a rich dynamic blog/service listing system, multi-level admin authentication, interactive contact inquiries with email notification loops, and modern cloud deployment configurations.",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer", "MongoDB Atlas", "Render", "Vercel"],
      liveUrl: "https://axinextechnologies.com",
      isPrivateRepo: true,
      imageUrl: "/assets/axinex-project.png",
      badges: ["Production Project", "Real Client", "Responsive", "Full Stack", "Modern UI"],
      features: [
        "Secure Admin Panel with full CRUD operations on corporate offerings.",
        "Robust enquiry routing system utilizing Nodemailer with rate-limiting.",
        "High-performance assets caching and optimized bundle delivery.",
        "Elegant dark glassmorphic styling aligned with modern design libraries."
      ],
      challenges: [
        "Handling concurrent customer enquiries without flooding administrative email boxes.",
        "Ensuring fluid UX across extreme screen breakpoints (foldable devices to 4K displays)."
      ],
      contribution: [
        "Designed the responsive pricing & services matrices from scratch.",
        "Configured the secure SMTP transport and custom transactional HTML emails.",
        "Orchestrated Vercel and Render auto-deployments synced with master branches."
      ]
    },
    {
      id: "abvp",
      name: "ABVP Portal Deogiri Region",
      status: "in-progress",
      statusText: "🚧 Frontend Completed (Backend In Progress)",
      category: "Production Client Project",
      description: "A modern portal developed for ABVP Deogiri Region featuring a responsive user interface and scalable architecture. The frontend has been completed and deployed, while backend integration is currently under development.",
      extendedDescription: "A large-scale student community platform supporting announcements, event registration lists, local unit dashboards, and resource repositories. Built using Next.js for pristine search-engine visibility and performance.",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
      liveUrl: "https://abvp-portal-link.vercel.app/",
      isPrivateRepo: true,
      imageUrl: "/assets/abvp-project.png",
      badges: ["Community Portal", "Student Network", "Modern UX", "Under Active Dev"],
      features: [
        "Fluid dynamic routing with optimized Static Site Generation (SSG).",
        "Comprehensive localized notification hub for region-wide student events.",
        "Custom responsive navigation with fast, filterable category lists."
      ],
      challenges: [
        "Optimizing loading times for regional regions with variable mobile network coverage."
      ],
      contribution: [
        "Constructed the responsive dashboard widgets and notification timeline.",
        "Designed and built the fluid visual layout from scratch."
      ]
    },
    {
      id: "anklet",
      name: "Anklet Construction",
      status: "in-progress",
      statusText: "🚧 Frontend Completed (Backend In Progress)",
      category: "Production Client Project",
      description: "A modern corporate website for a construction company focused on professional design, responsive layouts, and a scalable architecture. Backend integration is currently in progress.",
      extendedDescription: "A premium marketing and portfolio showcase for heavy construction projects, featuring high-fidelity architectural photo grids, project status trackers, and detailed project specification pages.",
      technologies: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
      liveUrl: "https://anklet-construction.vercel.app/",
      isPrivateRepo: true,
      imageUrl: "/assets/anklet-website.png",
      badges: ["Corporate Site", "3D Elements", "Visual Showcase", "Active Build"],
      features: [
        "Highly interactive visual galleries with smooth overlay overlays.",
        "Custom request-quote module with dynamic estimation calculations.",
        "Mobile-first responsive grids presenting master plans and layout drafts."
      ],
      challenges: [
        "Presenting high-resolution asset images without causing significant initial layout shifts."
      ],
      contribution: [
        "Created the portfolio gallery grid with staggered layout transitions.",
        "Built responsive client consultation and contact forms."
      ]
    }
  ],
  personalProjects: [
    {
      id: "donorsync",
      name: "DonorSync",
      status: "completed",
      statusText: "🟢 Completed",
      category: "Personal Project",
      description: "DonorSync is a full-stack blood donation management platform that connects blood donors and recipients through a clean and responsive interface. It includes role-based authentication, request management, and dashboards for donors, requesters, and administrators.",
      extendedDescription: "A mission-critical medical utility bridging blood donors with urgent patient requirements. Incorporates interactive geographical routing, donation logs, verified donor certificates, and secure role-based portals.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Tailwind CSS", "REST APIs"],
      liveUrl: "https://donorsync-frontend.vercel.app/",
      githubUrl: "https://github.com/Srushti-12345/donorsync",
      imageUrl: "/assets/donorsync.png",
      badges: ["MERN Stack", "Authentication", "Dashboard", "CRUD Operations", "Responsive Design"],
      features: [
        "Secure multi-role dashboards (Admin, Donor, Requestor).",
        "Real-time blood stock meters grouped by critical blood types.",
        "Automated status workflow from initial request to successful donation matching."
      ],
      challenges: [
        "Preventing duplicate active donations from the same donor within the medical waiting period.",
        "Structuring complex Mongo collections for optimized geospatial lookup."
      ],
      contribution: [
        "Coded the entire state system for donor-recipient request tracking.",
        "Designed the glassmorphism admin metric panels and data tables."
      ]
    },
    {
      id: "expense-tracker",
      name: "Expense Tracker",
      status: "completed",
      statusText: "🟢 Completed",
      category: "Personal Project",
      description: "A responsive full-stack expense tracking application that allows users to manage their expenses with CRUD operations, persistent storage, and an intuitive user interface.",
      extendedDescription: "An elegant ledger utility designed to facilitate modern budgeting. Offers categorization systems, visual cost breakdowns, monthly budgets, and spreadsheet export triggers.",
      technologies: ["React.js", "MongoDB", "Node.js", "Express.js", "Tailwind CSS", "REST APIs"],
      liveUrl: "https://exp-tracker-rho.vercel.app/",
      githubUrl: "https://github.com/Srushti-12345/expense-tracker",
      imageUrl: "/assets/expense-tracker.png",
      badges: ["CRUD", "Responsive", "Dashboard", "Full Stack", "Data Visualization"],
      features: [
        "Detailed transactions feed with multi-parameter keyword filters.",
        "Interactive analytics charts showing spending proportions.",
        "Local token storage guaranteeing seamless session logins."
      ],
      challenges: [
        "Syncing immediate budget charts with backend mutations without full page reloads."
      ],
      contribution: [
        "Configured Express route controllers and written Mongoose schemas with indexing."
      ]
    }
  ],
  additionalProjects: [
    { name: "Weather App", desc: "Interactive weather forecaster showing meteorological indexes, 5-day forecasts, and beautiful context-aware animated climates.", tech: ["React", "Weather API", "Tailwind"] },
    { name: "Event Hub", desc: "A community event management service to organize, search, and register for student hackathons, local workshops, and cultural events.", tech: ["Node.js", "MongoDB", "Express", "React"] },
    { name: "Food Ordering Platform", desc: "Premium restaurant landing page with live search, custom checkout carts, and elegant item animations.", tech: ["React", "Framer Motion", "Tailwind"] },
    { name: "Book Store Web App", desc: "An e-commerce book catalog featuring category selectors, administrative stock controls, and checkout simulations.", tech: ["MERN Stack", "JWT", "Tailwind"] },
    { name: "Interactive Portfolio v1", desc: "Early iteration of personal branding, built to research interactive CSS techniques and layouts.", tech: ["HTML5", "CSS3", "JavaScript"] },
    { name: "Appraisal Management Engine", desc: "A complex enterprise HR tool designed to support employees, managers, and admins through cyclic performance review pipelines.", tech: ["React", "TypeScript", "Node.js", "MongoDB"] }
  ],
  skills: {
    frontend: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT", "Nodemailer"],
    database: ["MongoDB", "MySQL", "MongoDB Atlas", "MongoDB Compass"],
    languages: ["Java", "JavaScript", "Python", "C", "C++", "TypeScript"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render", "MongoDB Atlas", "MongoDB Compass"],
    core: ["Full Stack Development", "MERN Stack", "JWT Authentication", "REST API Development", "API Integration", "Responsive Design", "UI/UX Design", "Team Collaboration", "Problem Solving"]
  },
  education: [
    {
      degree: "Bachelor of Engineering (Computer Science & Engineering)",
      institution: "Sipna College of Engineering and Technology, Amravati",
      duration: "2023 – 2027",
      grade: "Current CGPA: 8.72",
      description: "Pursuing Computer Science Engineering while gaining practical industry experience through internships and production-level projects."
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Shri Ramkrishna Junior College, Amravati",
      duration: "Completed 2023",
      grade: "Score: 84.17%",
      description: "Completed Higher Secondary education with strong academic performance while developing an interest in programming and technology."
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Shri Ramkrishna Krida Vidyalaya, Amravati",
      duration: "Completed 2021",
      grade: "Score: 99% (School Topper)",
      description: "School Topper with 99% under Maharashtra State Board, recognizing academic excellence across all core science and mathematical streams."
    }
  ],
  achievements: [
    { title: "Leela Poonawalla Foundation Scholar", desc: "Highly competitive academic scholarship awarded to outstanding women pursuing engineering degrees." },
    { title: "SSC School Topper (99%)", desc: "Ranked 1st among over 400 graduating students under the Maharashtra State Board curriculum." },
    { title: "Master of Ceremonies", desc: "Hosted HackGenX Hackathon, Vidyotan Technical Fest, and prestigious university seminars." },
    { title: "Deloitte Australia Data Analytics", desc: "Completed the official Job Simulation program covering structured analytics pipelines and client reports." },
    { title: "Java Development Bootcamp", desc: "Successfully certified through Dr. Angela Yu's comprehensive full-stack programming bootcamp." },
    { title: "Java Programming Certification", desc: "Received formal credentialing from CCIT covering advanced object-oriented paradigms." }
  ]
};
