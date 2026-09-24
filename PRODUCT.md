# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers evaluating Daniel Hasdiel for software developer roles. They arrive via a shared link (LinkedIn, GitHub, X, direct), scan for seniority and fit in under a minute, and should either reach out through the contact links or print/save the CV. Secondary audience: anyone who receives the link.

## Product Purpose

Daniel Hasdiel's personal CV website — a single page presenting his work history (Algolight/Shor C2 systems for robotics, IDF Robotics & Automation), skills, education, army service, and projects. It exists to make his seniority legible fast and to make contacting or saving his CV frictionless.

Success is a recruiter understanding who Daniel is and what level he operates at within one scan, then either contacting him or printing a clean one-pager — without the page getting in the way.

## Positioning

Three capabilities are load-bearing; a neighboring CV template that lacked any one of them would not be this product:

1. **Print-perfect one-pager** — browser print produces a clean A4 CV (dedicated print CSS, print drawer). The saved/printed artifact is a first-class output, not a fallback.
2. **Interactive, shareable link** — a live URL with command menu, theme switching, and direct contact/social actions; richer than a document.
3. **Queryable resume API** — a GraphQL endpoint exposing the resume as structured data; the site itself doubles as a technical signal about the author.

## Operating Context

- Read in seconds on desktop or mobile; often immediately printed or saved as PDF.
- Viewed in both light and dark themes (`next-themes` is wired); both must remain fully functional.
- Single source of truth: `src/data/resume-data.tsx` drives the page, metadata, and OG image — content edits propagate everywhere.
- Repo: github.com/dhasdiel/cv, forked from the BartoszJarocki/cv minimalist template; deployed with Vercel analytics.

## Capabilities and Constraints

- **Minimalist single-page identity is binding** — density, whitespace, and legibility over decoration; no drift toward a louder marketing surface.
- **Dark + light themes are binding** — both must keep working, including print behavior.
- Content is real resume data: Algolight Ltd (Software Developer, Shor C2 platform), IDF Robotics & Automation, army service, skills, and projects (Monito, Consultly, Minimalist CV). No fabricated claims, testimonials, or metrics.
- Print output is a feature: A4 sizing, reduced type scale, print-hidden interactive chrome.

## Brand Commitments

- Product name / person: **Daniel Hasdiel**.
- Proper nouns from real history: Algolight Ltd, Shor, IDF Robotics & Automation, Monito, Consultly — preserve as-is.
- Voice: restrained, factual, no marketing adjectives about the author.

## Evidence on Hand

- Real resume content in `src/data/resume-data.tsx` (work history, skills, education, projects with links).
- No testimonials, press, or case studies exist — do not fabricate any.

## Product Principles

1. Seniority must be legible in under a minute — hierarchy serves the scanning recruiter, not the reader browsing leisurely.
2. Print parity — the A4 a recruiter saves must look as considered as the live page.
3. One data source — `resume-data.tsx` is the only place content lives; components stay dumb renderers.
4. Minimalist restraint — when in doubt, remove; the template's identity is what it doesn't do.
5. The site is itself a portfolio artifact — the GraphQL API and code quality are part of the signal to technical evaluators.
