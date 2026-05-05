export const personalInfo = {
  name: "Fali Irham Maulana",
  role: "Full-Stack Developer & AI Engineer",
  tagline: "Building Scalable Systems with Data & Intelligence",
  bio: "I'm an Informatics Engineering student at Politeknik Negeri Malang with a strong focus on full-stack development, artificial intelligence, and data-driven systems. I bridge the gap between complex backend architectures and intelligent user interfaces, creating solutions that are not just functional, but genuinely impactful.",
  location: "Malang, Indonesia",
  email: "fali.irham@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  whatsapp: "https://wa.me/6281234567890",
  availableForWork: true,
};

export const skills = [
  {
    category: "Backend",
    items: ["Laravel", "Node.js", "REST API", "MVC"],
  },
  {
    category: "Frontend",
    items: ["React", "Flutter", "Next.js", "Tailwind CSS"],
  },
  {
    category: "AI & Data",
    items: ["Python", "Machine Learning", "Data Analysis", "Hadoop", "MobileNetV2"],
  },
  {
    category: "Database & Tools",
    items: ["MySQL", "Database Design", "Optimization", "Git"],
  },
];

export const projects = [
  {
    slug: "finwise",
    title: "FinWise",
    shortDesc: "Smart financial and e-wallet system leveraging machine learning.",
    description: "FinWise is an intelligent financial management and e-wallet application designed to simplify personal finance. By integrating machine learning, it provides smart analytics and automated insights for users.",
    role: "Project Manager & Full-Stack Developer",
    contributions: [
      "Built RESTful APIs using Laravel",
      "Implemented financial analytics with machine learning",
      "Collaborated on Flutter frontend",
      "Designed database for financial data"
    ],
    impact: "Delivered a secure, high-performance financial platform that simplifies expense tracking and provides actionable financial insights.",
    tech: ["Laravel", "Flutter", "Machine Learning", "MySQL"],
    github: "#",
    live: "#",
    featured: true,
    year: "2024",
  },
  {
    slug: "tollytics",
    title: "Tollytics",
    shortDesc: "Smart toll analytics system utilizing IoT and big data.",
    description: "Tollytics is a comprehensive big data solution built to monitor, analyze, and optimize toll road operations. By combining real-time IoT data streams with Hadoop for massive data processing, the system provides actionable intelligence.",
    role: "Project Manager & Backend / IoT Developer",
    contributions: [
      "Developed backend with Node.js",
      "Integrated IoT real-time data",
      "Implemented Hadoop for big data processing",
      "Designed scalable cloud architecture"
    ],
    impact: "Enabled real-time monitoring and analytics of toll operations, significantly improving decision-making speed and infrastructure management.",
    tech: ["Node.js", "IoT", "Hadoop", "Big Data", "Cloud Architecture"],
    github: "#",
    live: "#",
    featured: true,
    year: "2023",
  },
  {
    slug: "jawara",
    title: "JAWARA",
    shortDesc: "Image classification application utilizing MobileNetV2.",
    description: "JAWARA is an AI-powered mobile application capable of performing accurate image classification on edge devices. It utilizes a highly optimized MobileNetV2 architecture to provide real-time inference.",
    role: "Machine Learning & Mobile Developer",
    contributions: [
      "Built MobileNetV2 model",
      "Data preprocessing & optimization",
      "Integrated model to Flutter app",
      "Designed interactive UI"
    ],
    impact: "Achieved high-accuracy real-time image recognition on mobile devices, providing a seamless and intelligent user experience.",
    tech: ["Python", "MobileNetV2", "Flutter", "TensorFlow"],
    github: "#",
    live: "#",
    featured: true,
    year: "2023",
  },
  {
    slug: "simpera",
    title: "SIMPERA",
    shortDesc: "Decision Support System for campus facilities using PSI & WSM.",
    description: "SIMPERA is an advanced Decision Support System (SPK) designed to optimize the allocation and management of campus facilities. It mathematically evaluates multiple criteria using PSI and WSM methods to generate objective recommendations.",
    role: "Backend Developer",
    contributions: [
      "Implemented PSI & WSM methods",
      "Built backend with Laravel",
      "Processed decision-making data",
      "Designed ranking system"
    ],
    impact: "Streamlined the facility allocation process, transforming subjective decision-making into an objective, data-driven workflow.",
    tech: ["Laravel", "MySQL", "Algorithms", "PHP"],
    github: "#",
    live: "#",
    featured: false,
    year: "2022",
  },
];

export const experiences = [
  {
    type: "org",
    title: "Steering Committee",
    org: "HMTI",
    location: "Head of Research & Talent Division",
    period: "2023 – 2024",
    desc: "Led the Research & Talent Division, driving strategic initiatives and fostering technical excellence.",
    bullets: [
      "Led division activities",
      "Directed strategic programs",
      "Coordinated cross-team collaboration",
      "Provided evaluation & decision support"
    ],
    impact: "Cultivated a culture of research and skill development, elevating the overall technical competency of the student body."
  },
  {
    type: "org",
    title: "Event & Program Staff",
    org: "HMTI",
    location: "Politeknik Negeri Malang",
    period: "2022 – 2023",
    desc: "Managed large-scale events and operational programs aimed at boosting student engagement.",
    bullets: [
      "Led Brainboost program",
      "Managed PR & events",
      "Coordinated major activities",
      "Handled operations & mentoring programs"
    ],
    impact: "Increased student participation in technical workshops and established a sustainable mentoring framework."
  }
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  credentialUrl: string;
};

export const certifications: Certification[] = [
  {
    title: "Building LLM Applications With Prompt Engineering",
    issuer: "Nvdia",
    year: "2025",
    credentialUrl: "#",
  },
];