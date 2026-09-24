import { isValidElement, type ReactNode } from "react";
import { Resolver, Query } from "type-graphql";
import { Me } from "./type-defs";
import { RESUME_DATA } from "../data/resume-data";

// Resume data stores summary/descriptions as JSX; the API serves plain text.
function jsxToText(node: ReactNode): string {
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

@Resolver(() => Me)
export class MeResolver {
  @Query(() => Me)
  me() {
    const d = RESUME_DATA;
    return {
      ...d,
      summary: jsxToText(d.summary).trim(),
      avatarUrl: d.avatarUrl.src,
      work: d.work.map((w) => ({
        ...w,
        description: jsxToText(w.description).trim(),
      })),
      army: d.army.map((a) => ({
        ...a,
        description: jsxToText(a.description).trim(),
      })),
    };
  }
}
