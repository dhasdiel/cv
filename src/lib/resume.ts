import { isValidElement, type ReactNode } from "react";

import { RESUME_DATA } from "@/data/resume-data";

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
