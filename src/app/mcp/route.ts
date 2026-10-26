// Public MCP server: exposes the resume to AI agents. Read-only — no auth.
// Same data as the GraphQL `me` query and the page itself (src/data/resume-data.tsx).
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import { resumeJson } from "@/lib/resume";

const json = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data) }],
});

const SECTIONS = [
  "work",
  "army",
  "skills",
  "education",
  "projects",
  "summary",
  "contact",
] as const;

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_resume",
      {
        title: "Get full resume",
        description:
          "Daniel Hasdiel's complete resume as JSON: about, summary, work history, army service, skills, education, projects, and contact info.",
      },
      async () => json(resumeJson()),
    );

    server.registerTool(
      "get_section",
      {
        title: "Get resume section",
        description:
          "One section of Daniel Hasdiel's resume. Use 'work' for professional experience (Algolight/Shor, IDF lead roles) and 'army' for IDF service roles.",
        inputSchema: z.object({
          section: z
            .enum(SECTIONS)
            .describe("Resume section to return"),
        }),
      },
      async ({ section }) => {
        const data = resumeJson();
        const value =
          section === "summary"
            ? data.summary
            : section === "contact"
              ? data.contact
              : data[section];
        return json({ [section]: value });
      },
    );

    server.registerTool(
      "get_contact",
      {
        title: "Get contact info",
        description:
          "Email, phone, and social/profile links (GitHub, LinkedIn, X) for reaching Daniel Hasdiel.",
      },
      async () => json(resumeJson().contact),
    );
  },
  {
    serverInfo: { name: "dhasdiel-cv", version: "0.1.0" },
    // WebMCP: the same tools, registered on navigator.modelContext for agents
    // running inside the user's browser. Loaded via <script src="/mcp?webmcp-script">.
    experimental_webMcp: {
      tools: ["get_resume", "get_section", "get_contact"],
    },
  },
);

export { handler as GET, handler as POST };
