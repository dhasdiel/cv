import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { RESUME_DATA } from "@/data/resume-data";
import { WorkExperience } from "./components/WorkExperience";
import { Education } from "./components/Education";
import { Summary } from "./components/Summary";
import { Skills } from "./components/Skills";
import { Header } from "./components/Header";
import { ArmyService } from "./components/ArmyService";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume`,
  description: RESUME_DATA.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "https://dhasdiel-cv.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name}'s profile picture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    images: ["https://dhasdiel-cv.vercel.app/opengraph-image"],
  },
};

/**
 * Transform social links for command menu
 */
function getCommandMenuLinks() {
  return RESUME_DATA.contact.social.map((socialMediaLink) => ({
    url: socialMediaLink.url,
    title: socialMediaLink.name,
  }));
}

export default function ResumePage() {
  return (
    <main
      className="container relative mx-auto scroll-my-12 p-4 print:p-11 md:p-16"
      id="main-content"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>

      <section
        className="bg-background mx-auto w-full max-w-2xl space-y-8 print:space-y-4"
        aria-label="Resume Content"
      >
        <Header />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={RESUME_DATA.summary} />

          <WorkExperience work={RESUME_DATA.work} />

          <ArmyService army={RESUME_DATA.army} />

          <Skills skills={RESUME_DATA.skills} />

          <Education education={RESUME_DATA.education} />
        </div>
      </section>

      <nav className="print:hidden" aria-label="Quick navigation">
        <CommandMenu links={getCommandMenuLinks()} />
      </nav>
    </main>
  );
}
