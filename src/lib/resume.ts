import {
  createElement,
  Fragment,
  isValidElement,
  type ReactNode,
} from "react";
import { z } from "zod";

import { RESUME_DATA } from "@/data/resume-data";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

// Resume data stores summary/descriptions as JSX; APIs serve plain text.
export function jsxToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(jsxToText).join("");
  if (isValidElement(node)) {
    const children = jsxToText(
      (node.props as { children?: ReactNode }).children,
    );
    switch (node.type) {
      case "br":
        return "\n";
      case "p":
        return children + "\n";
      case "li":
        return "- " + children + "\n";
      default:
        return children;
    }
  }
  return "";
}

// Serializable resume — same shape the GraphQL `me` query returns, minus
// component refs (social icons, project logos) that cannot cross the wire.
export function resumeJson() {
  const d = RESUME_DATA;
  return {
    name: d.name,
    initials: d.initials,
    location: d.location,
    locationLink: d.locationLink,
    about: d.about,
    summary: jsxToText(d.summary).trim(),
    avatarUrl: d.avatarUrl.src,
    contact: {
      email: d.contact.email,
      tel: d.contact.tel,
      social: d.contact.social.map(({ name, url }) => ({ name, url })),
    },
    education: d.education,
    work: d.work.map((w) => ({
      ...w,
      description: jsxToText(w.description).trim(),
    })),
    army: d.army.map((a) => ({
      ...a,
      description: jsxToText(a.description).trim(),
    })),
    skills: d.skills,
    projects: d.projects.map(({ title, techStack, description, link }) => ({
      title,
      techStack,
      description,
      link,
    })),
  };
}

// ---------------------------------------------------------------------------
// Resume variants
//
// A variant is a tailored copy of the resume in the plain-text JSON shape
// above, stored as src/data/variants/<slug>.json in the repo. The site
// renders it at /?variant=<slug>; without the parameter it renders the
// base resume. Variants are written through the token-gated MCP tool
// `update_resume_variant`, never by hand-editing the TSX data file.
// ---------------------------------------------------------------------------

const VARIANT_SLUG = /^[a-z0-9][a-z0-9-]*$/;

export const resumeVariantSchema = z.object({
  name: z.string().min(1),
  initials: z.string().min(1).max(4),
  location: z.string().min(1),
  locationLink: z.string().url(),
  about: z.string().min(1),
  summary: z.string().min(1),
  contact: z.object({
    email: z.string().email(),
    tel: z.string().min(1),
    social: z
      .array(z.object({ name: z.string().min(1), url: z.string().url() }))
      .min(1),
  }),
  education: z.array(
    z.object({
      school: z.string().min(1),
      degree: z.string().min(1),
      start: z.string().nullable(),
      end: z.string().nullable(),
    }),
  ),
  work: z.array(
    z.object({
      company: z.string().min(1),
      badges: z.array(z.string()),
      title: z.string().min(1),
      start: z.string().min(1),
      end: z.string().nullable(),
      description: z.string().min(1),
    }),
  ),
  army: z.array(
    z.object({
      title: z.string().min(1),
      company: z.string().min(1),
      badges: z.array(z.string()),
      start: z.string().min(1),
      end: z.string().nullable(),
      description: z.string().min(1),
    }),
  ),
  skills: z.array(z.string().min(1)).min(1),
  projects: z.array(
    z.object({
      title: z.string().min(1),
      techStack: z.array(z.string()),
      description: z.string().min(1),
      link: z.object({ label: z.string().min(1), href: z.string().url() }),
    }),
  ),
});

export type ResumeVariantJson = z.infer<typeof resumeVariantSchema>;

// Inverse of jsxToText for descriptions: plain text back to the JSX the
// page components render — a <p>, then a <ul> of "- " lines.
export function descriptionToJsx(text: string): ReactNode {
  const lines = text.split("\n").map((l) => l.trim());
  const children: ReactNode[] = [];
  let para: string[] = [];
  let bullets: string[] = [];
  let key = 0;
  const flushPara = () => {
    if (para.length > 0) {
      children.push(createElement("p", { key: key++ }, para.join(" ")));
      para = [];
    }
  };
  const flushBullets = () => {
    if (bullets.length > 0) {
      children.push(
        createElement(
          "ul",
          { key: key++, className: "list-inside list-disc" },
          bullets.map((b, i) => createElement("li", { key: i }, b)),
        ),
      );
      bullets = [];
    }
  };
  for (const line of lines) {
    if (line.startsWith("- ")) {
      flushPara();
      bullets.push(line.slice(2));
    } else if (line === "") {
      flushPara();
      flushBullets();
      children.push(createElement("br", { key: key++ }));
    } else {
      flushBullets();
      para.push(line);
    }
  }
  flushPara();
  flushBullets();
  return createElement(Fragment, null, ...children);
}

const SOCIAL_ICONS: Record<string, typeof GitHubIcon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
};

// Variant JSON (plain text) -> the TSX-shaped data the page renders.
// Avatar and project logos never vary per role, so they come from the base.
export function variantToResumeData(v: ResumeVariantJson): typeof RESUME_DATA {
  const projects = v.projects.map((p) => {
    const base =
      RESUME_DATA.projects.find((b) => b.title === p.title) ??
      RESUME_DATA.projects[0];
    return { ...p, logo: base.logo };
  });
  return {
    name: v.name,
    initials: v.initials,
    location: v.location,
    locationLink: v.locationLink,
    about: v.about,
    summary: v.summary,
    avatarUrl: RESUME_DATA.avatarUrl,
    contact: {
      email: v.contact.email,
      tel: v.contact.tel,
      social: v.contact.social.map((s) => ({
        name: s.name,
        url: s.url,
        icon: SOCIAL_ICONS[s.name] ?? GitHubIcon,
      })),
    },
    education: v.education,
    work: v.work.map((w) => ({
      ...w,
      description: descriptionToJsx(w.description),
    })),
    army: v.army.map((a) => ({
      ...a,
      description: descriptionToJsx(a.description),
    })),
    skills: v.skills,
    projects,
  } as unknown as typeof RESUME_DATA;
}

export async function loadVariant(
  name: string,
): Promise<ResumeVariantJson | null> {
  if (!VARIANT_SLUG.test(name)) return null;
  try {
    const mod = await import(`@/data/variants/${name}.json`);
    const parsed = resumeVariantSchema.safeParse(mod.default ?? mod);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

// Base resume when no (or an unknown) variant is requested.
export async function resolveResumeData(
  variant?: string,
): Promise<typeof RESUME_DATA> {
  if (!variant) return RESUME_DATA;
  const json = await loadVariant(variant);
  return json ? variantToResumeData(json) : RESUME_DATA;
}
