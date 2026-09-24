import { ConsultlyLogo, MonitoLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import MyAvatar from "@/images/logos/daniel_avatar.jpeg";

export const RESUME_DATA = {
  name: "Daniel Hasdiel",
  initials: "DH",
  location: "Bnei Brak, Israel",
  locationLink: "https://www.google.com/maps/place/Bnei+Brak",
  about:
    "Software Developer with 4+ years building command-and-control systems for autonomous robotics.",
  summary: (
    <>
      Software Developer experienced in building mission-critical
      command-and-control systems for autonomous robotics — from field
      applications to real-time control, video, and telemetry pipelines.
      Passionate about system architecture, performance optimization, and
      reliable software operating real hardware.
    </>
  ),
  avatarUrl: MyAvatar,
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
      company: "Algolight Ltd",
      badges: [],
      title: "Software Developer",
      start: "2025",
      end: null,
      description: (
        <>
          <p>
            Developing Shor, a Kotlin Multiplatform Command and Control (C2)
            application for operating and supervising heterogeneous robotic
            units — drones and ground robots — from a single Android/Linux
            client, serving the IDF’s Robotics and Automation Division.
          </p>
          <br />
          <ul className="list-inside list-disc">
            <li>
              Driving system design and strategic planning for multi-faceted
              defense projects, ensuring high-performance and robust software
              delivery.
            </li>
            <li>
              Building a robotic-unit-agnostic architecture where live video
              (GStreamer/RTSP), MAVLink telemetry, recording, and control are
              shared pipelines across all unit types.
            </li>
            <li>
              Partnering with leading defense industry stakeholders to deliver
              cutting-edge, field-ready solutions tailored to operational
              requirements.
            </li>
          </ul>
        </>
      ),
    },
    {
      company: "IDF - Robotics & Automation",
      badges: [],
      title: "Full Stack Developer | Lead Frontend Developer | Advisor",
      start: "2024",
      end: 2025,
      description: (
        <>
          <p>
            Leading the design and development of frontend architecture and
            backend features for full-stack applications in the field of
            autonomous robotics and drones.
          </p>
          <br />
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
      badges: [],
      start: "2022",
      end: "2024",
      description: (
        <>
          <p>
            Designing and developing frontend and backend features for
            full-stack applications in the field of autonomous robotics and
            drones.
          </p>
          <br />
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
      badges: [],
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
    "Microfrontends",
    "Kotlin Multiplatform",
    "ROS2",
    "System Architecture",
    "Node.js",
    "Python",
    "WebRTC",
    "WebSockets",
    "Git",
    "Docker",
    "Claude Code",
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
