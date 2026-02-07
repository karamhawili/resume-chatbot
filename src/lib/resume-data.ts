export const resumeData = {
  personal: {
    name: "Karam Abou Hawili",
    title: "Frontend Developer & UI/UX Designer",
    location: "Beirut, Lebanon",
    phone: "+96171214184",
    email: "karam.hawili2@gmail.com",
    linkedin: "LinkedIn",
  },

  about:
    "Three-year Hybrid Developer and UI/UX Designer specializing in the full user interface lifecycle: from Figma wireframes to production-ready code (Next.js, React, TypeScript).",

  experience: [
    {
      role: "UI/UX Engineer",
      company: "ITXI, Beirut",
      duration: "Dec 2024 — Present",
      stack: "Figma, React, Angular, TypeScript",
      achievements: [
        "Creating interfaces for web, mobile, and kiosk platforms, working closely with developers to ensure the final product matches the design.",
        "Refreshing legacy applications by updating outdated layouts to improve usability.",
        "Designing and prototyping a new AI-powered platform optimized for both desktop and mobile workflows.",
      ],
    },
    {
      role: "Frontend Developer / UI/UX Designer",
      company: "ITXI, Beirut",
      duration: "Dec 2022 — Dec 2024",
      stack: "Angular, React, TypeScript, REST APIs, Wordpress",
      achievements: [
        "Built data dashboards and web applications for both admin and customer using Angular and React.",
        "Refined component structures to ensure apps were easier to maintain.",
        "Contributed to UI design, handling layout adjustments and UX improvements.",
        "Migrated plugin development from PHP to React, which modernized the codebase and improved UI performance.",
      ],
    },
    {
      role: "Frontend Developer — Freelance",
      company: "Independent",
      duration: "July 2025 — Present",
      stack: "React, Next.js, Sanity, Firebase",
      achievements: [
        "Building a portfolio website for an interior design agency using Next.js and Sanity CMS.",
        "Developed a custom wedding invitation app featuring a digital RSVP form and an admin dashboard powered by Firebase.",
        "Created a health clinic website with an integrated reservation system and optimized SEO.",
      ],
    },
  ],

  skills: {
    frontend: [
      "React",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
    ],
    uiux: [
      "Figma",
      "Design Systems",
      "Wireframing",
      "Prototyping",
      "User Flows",
    ],
    backend: ["Firebase", "Node.js (basic)", "REST APIs"],
  },

  education: {
    degree: "BS in Computer Science",
    institution: "American University of Science and Technology, Beirut",
    duration: "Oct 2018 — Jun 2022",
    gpa: "Major GPA: 3.6",
  },

  languages: ["English (Fluent)", "Arabic (Native)", "French (Basic)"],
};

// Helper function to convert resume data to a text format for the LLM
export const getResumeAsText = (): string => {
  return `
PERSONAL INFORMATION:
Name: ${resumeData.personal.name}
Title: ${resumeData.personal.title}
Location: ${resumeData.personal.location}
Phone: ${resumeData.personal.phone}
Email: ${resumeData.personal.email}
LinkedIn: ${resumeData.personal.linkedin}

ABOUT:
${resumeData.about}

PROFESSIONAL EXPERIENCE:
${resumeData.experience
  .map(
    (exp) => `
${exp.role} at ${exp.company}
Duration: ${exp.duration}
Stack: ${exp.stack}
Achievements:
${exp.achievements.map((ach) => `- ${ach}`).join("\n")}
`,
  )
  .join("\n")}

TECHNICAL SKILLS:
Frontend Development: ${resumeData.skills.frontend.join(", ")}
UI/UX Design: ${resumeData.skills.uiux.join(", ")}
Backend Exposure: ${resumeData.skills.backend.join(", ")}

EDUCATION:
${resumeData.education.degree}
${resumeData.education.institution}
${resumeData.education.duration}
${resumeData.education.gpa}

LANGUAGES:
${resumeData.languages.join(" • ")}
  `.trim();
};
