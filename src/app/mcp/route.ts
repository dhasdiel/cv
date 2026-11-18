// MCP server: exposes the resume to AI agents.
// Read tools (get_resume, get_section, get_contact) are public and
// read-only. The write tool (update_resume_variant) is gated by a secret
// token (MCP_WRITE_TOKEN env var) and commits variant JSON files to the
// repo via a GitHub token (GITHUB_TOKEN env var) — never from the repo.
// Same data as the GraphQL `me` query and the page itself (src/data/resume-data.tsx).
import { timingSafeEqual } from "node:crypto";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import { resumeJson, resumeVariantSchema } from "@/lib/resume";
import { commitVariantFile } from "@/lib/github";

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

    // Write tool: NOT public. The caller must know the secret token.
    // Saves a tailored resume variant (full resume JSON, same shape as
    // get_resume returns) as src/data/variants/<variant>.json on branch
    // mcp/variant-<variant>. The site renders it at /?variant=<variant>
    // after Vercel redeploys the branch. Deliberately excluded from the
    // in-browser WebMCP tools below.
    server.registerTool(
      "update_resume_variant",
      {
        title: "Save a tailored resume variant",
        description:
          "Save a tailored copy of Daniel Hasdiel's resume as a named variant. Pass the full resume JSON (same shape as get_resume returns) with the fields you tailored — about, summary, work descriptions, skills, education. Requires the secret write token. The variant is committed to branch mcp/variant-<variant> and renders at /?variant=<variant> once Vercel redeploys. The base resume is never touched.",
        inputSchema: z.object({
          token: z
            .string()
            .min(1)
            .describe("Secret write token (MCP_WRITE_TOKEN env var)"),
          variant: z
            .string()
            .regex(/^[a-z0-9][a-z0-9-]*$/)
            .describe(
              "URL-safe variant slug, e.g. robotic-imaging. Lowercase letters, digits and dashes only.",
            ),
          resume: resumeVariantSchema.describe(
            "Full resume JSON in the get_resume shape",
          ),
        }),
      },
      async ({ token, variant, resume }) => {
        const expected = process.env.MCP_WRITE_TOKEN;
        const tokenBuf = Buffer.from(token);
        const expectedBuf = expected ? Buffer.from(expected) : null;
        if (
          !expectedBuf ||
          tokenBuf.length !== expectedBuf.length ||
          !timingSafeEqual(tokenBuf, expectedBuf)
        ) {
          return json({ ok: false, error: "unauthorized" });
        }
        const ghToken = process.env.GITHUB_TOKEN;
        if (!ghToken) {
          return json({
            ok: false,
            error: "server_not_configured",
            detail: "GITHUB_TOKEN is not set on the server",
          });
        }
        try {
          const result = await commitVariantFile({
            token: ghToken,
            variant,
            content: JSON.stringify(resume, null, 2) + "\n",
            message: `feat: resume variant ${variant} via MCP`,
          });
          return json({ ok: true, ...result });
        } catch (e) {
          return json({
            ok: false,
            error: e instanceof Error ? e.message : "commit failed",
          });
        }
      },
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
