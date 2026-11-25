// ============================================
// DATA — Projects
// Edit this file to update project cards
// ============================================

const BASE = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 1,
    title: "Epiderma",
    description:
      "An AI-powered skin disease detection platform that connects a Flask machine-learning model to a React frontend and Node.js backend. Users upload skin images and receive instant diagnostic predictions with confidence scores.",
    technologies: ["React", "Node.js", "MongoDB", "Python", "Flask"],
    githubUrl: "https://github.com/abdallh376/EpiDerma",
    liveUrl: "#",
    image: `${BASE}assets/projects/mk1.png`,
    featured: true,
  },
  {
    id: 2,
    title: "DAR",
    description:
      "A competitive programming tournament platform with team registration, automated elimination brackets, real-time scoreboard updates, and admin controls for managing contests and participants.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "https://github.com/abdallh376/Dar-Prj",
    liveUrl: "#",
    image: `${BASE}assets/projects/z2.png`,
    featured: true,
  },
  {
    id: 3,
    title: "CraveCraft",
    description:
      "An online food ordering and delivery web application featuring dynamic menu categorization (Burgers, Pizza, Pasta), bilingual support (Arabic & English), real-time cart management, and interactive item favorites for a fast and delightful ordering experience.",
    technologies: ["Angular", "Node.js", "Express.js", "HTML", "CSS"],
    githubUrl: "https://github.com/abdallh376",
    liveUrl: "#",
    image: `${BASE}assets/projects/cravecraft.jpg`,
    featured: true,
  },
  {
    id: 4,
    title: "Real Estate (Homyz)",
    description:
      "A modern real estate property discovery platform helping users find suitable residencies effortlessly. Built with location-based property searching, interactive residency showcases, credibility metrics, and an elegant, responsive UI design.",
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/abdallh376",
    liveUrl: "#",
    image: `${BASE}assets/projects/realestate.jpg`,
    featured: true,
  },
];

export default projects;
