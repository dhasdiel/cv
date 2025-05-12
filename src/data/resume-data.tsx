import { ConsultlyLogo, MonitoLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import MyAvatar from "@/images/logos/daniel_avatar.jpeg";

export const RESUME_DATA = {
  name: "Daniel Hasdiel",
  initials: "DH",
  location: "Bnei Brak, Israel",
  locationLink: "https://www.google.com/maps/place/Bnei+Brak",
  about:
    "Detail-oriented Full Stack Developer dedicated to building high-quality products.",
  summary: (
    <>
      Detail-oriented Full Stack Engineer with a strong focus on frontend
      technologies. Experienced in building robust React applications, scalable
      Node.js backends, and real-time control systems for robotics. Passionate
      about system architecture, performance optimization, and delivering
      mission-critical software.
    </>
  ),
  avatarUrl: MyAvatar,
  personalWebsiteUrl: "",
  contact: {
    email: "danielhasdiel@gmail.com",
    tel: "+972506991754",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/dhasdiel",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/daniel-hasdiel",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/dhasdiel",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "IDF with Ort",
      degree:
        "Software Technician Diploma, MAHAT, specializing in Full Stack Development.",
      start: null,
      end: null,
    },
  ],
  work: [
    {
      company: "IDF - Robotics & Automation",
      badges: ["React", "TypeScript", "Python", "ROS2"],
      title: "Full Stack Developer / Lead Frontend Developer / Advisor",
      start: "2024",
      end: null,
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>
              Led the frontend development of a vehicle remote control system
              deployed across 100+ remote vehicles used in live field
              operations.
            </li>
            <li>
              Architected and implemented a Microfrontends solution to improve
              development scalability and team efficiency.
            </li>
            <li>
              Took an active role in system design, planning, and implementation
              across multiple projects.
            </li>
            <li>
              Collaborated with leading defense industry partners to deliver
              cutting-edge front-end solutions.
            </li>
          </ul>
        </>
      ),
    },
  ],
  army: [
    {
      title: "Full Stack Developer",
      company: "IDF - Robotics & Automation",
      badges: ["React", "TypeScript", "Node.js"],
      start: "2022",
      end: "2024",
      description: (
        <>
          <ul className="list-inside list-disc">
            <li>
              Developed and maintained a drone fleet control system as part of a
              high-performing technological unit.
            </li>
            <li>
              Took full responsibility for designing and implementing key
              client-side features, ensuring high usability and performance.
            </li>
            <li>
              Collaborated with teammates to meet operational needs and deliver
              mission-critical software.
            </li>
            <li>
              Contributed to problem-solving processes and the introduction of
              innovative technological solutions under tight deadlines.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Full Stack Development Trainee",
      company: "IDF",
      badges: ["React", "Node.js", "C", "Java"],
      start: "2021",
      end: "2022",
      description: (
        <>
          Successfully completed a comprehensive Full Stack Development course,
          acquiring hands-on experience in both front-end and back-end
          technologies.
        </>
      ),
    },
  ],
  skills: [
    "React/Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
    "State Management",
    "WebRTC",
    "WebSockets",
    "Node.js",
    "Python",
    "ROS2",
    "System Architecture",
    "Git",
    "Docker",
  ],
  projects: [
    {
      title: "Monito",
      techStack: ["TypeScript", "Next.js", "Browser Extension", "PostgreSQL"],
      description:
        "Browser extension for debugging web applications. Includes taking screenshots, screen recording, E2E tests generation and generating bug reports",
      logo: MonitoLogo,
      link: {
        label: "monito.dev",
        href: "https://monito.dev/",
      },
    },
    {
      title: "Consultly",
      techStack: [
        "TypeScript",
        "Next.js",
        "Vite",
        "GraphQL",
        "WebRTC",
        "Tailwind CSS",
        "PostgreSQL",
        "Redis",
      ],
      description:
        "Platform for online consultations with real-time video meetings and scheduling",
      logo: ConsultlyLogo,
      link: {
        label: "consultly.com",
        href: "https://consultly.com/",
      },
    },
    {
      title: "Minimalist CV",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "An open source minimalist, print friendly CV template with a focus on readability and clean design. >9k stars on GitHub",
      logo: MonitoLogo,
      link: {
        label: "Minimalist CV",
        href: "https://github.com/BartoszJarocki/cv",
      },
    },
  ],
} as const;
