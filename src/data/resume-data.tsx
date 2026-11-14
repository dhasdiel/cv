import { ConsultlyLogo, MonitoLogo } from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import MyAvatar from "@/images/logos/daniel_avatar.jpeg";

export const RESUME_DATA = {
  name: "Daniel Hasdiel",
  initials: "DH",
  location: "Bnei Brak, Israel",
  locationLink: "https://www.google.com/maps/place/Bnei+Brak",
  about:
    "Founding Full-Stack Engineer — Command & Control platforms for autonomous robotics.",
  summary: (
    <>
      Full Stack developer building the platform that connects robots to the
      people who use them. Currently developing a Kotlin Multiplatform C2 app
      at Algolight, operating drones and ground robots from a single
      Android/Linux client for the IDF Robotics and Automation Division, now
      serving 100+ operators in the field. I own the robot-to-user platform
      end to end: live operations views, real-time video and telemetry,
      control pipelines, and deployment and monitoring in the field — working
      directly with founders and defense stakeholders in a small team.
      Previously Lead Frontend Developer at IDF Robotics & Automation, leading
      frontend development of a vehicle remote control system deployed across
      100+ remote vehicles.
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
      start: "2020",
      end: "2021",
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
            Developing a Kotlin Multiplatform Command and Control (C2)
            application for operating and supervising heterogeneous robotic
            units — drones and ground robots — from a single Android/Linux
            client, serving the IDF’s Robotics and Automation Division, now
            serving 100+ operators in the field.
          </p>
          <br />
          <ul className="list-inside list-disc">
            <li>
              Owning the robot-to-user platform end to end: building a
              unit-agnostic architecture where live video (GStreamer/RTSP),
              MAVLink telemetry, recording, and control are shared pipelines
              across all unit types.
            </li>
            <li>
              Designing and building the real-time operations view operators
              actually work with — live video, telemetry, and control in one
              client — now serving 100+ operators in the field.
            </li>
            <li>
              Taking end-to-end technical responsibility from design to
              production release, including deployment and monitoring in live
              field operations.
            </li>
            <li>
              Leading system design and strategic planning for multi-faceted
              defense projects, working directly with defense industry
              stakeholders to deliver field-ready solutions.
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
              across multiple projects, collaborating with defense industry
              partners to deliver mission-critical software.
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
    "TypeScript",
    "Node.js",
    "React/Next.js",
    "Python",
    "WebSockets",
    "WebRTC",
    "GStreamer/RTSP",
    "MAVLink",
    "ROS2",
    "Kotlin Multiplatform",
    "Kotlin",
    "Tailwind CSS",
    "Design Systems",
    "State Management",
    "Microfrontends",
    "System Architecture",
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
