import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { RESUME_DATA } from "@/data/resume-data";
import { resolveResumeData } from "@/lib/resume";
import { WorkExperience } from "./components/WorkExperience";
import { Education } from "./components/Education";
import { Summary } from "./components/Summary";
import { Skills } from "./components/Skills";
import { Header } from "./components/Header";
import { ArmyService } from "./components/ArmyService";

/**
 * Transform social links for command menu
 */
function getCommandMenuLinks() {
  return RESUME_DATA.contact.social.map((socialMediaLink) => ({
    url: socialMediaLink.url,
    title: socialMediaLink.name,
  }));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}): Promise<Metadata> {
  const { variant } = await searchParams;
  const data = await resolveResumeData(variant);
  return {
    title: `${data.name} - Resume`,
    description: data.about,
    openGraph: {
      title: `${data.name} - Resume`,
      description: data.about,
      type: "profile",
      locale: "en_US",
      images: [
        {
          url: "https://dhasdiel-cv.vercel.app/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${data.name}'s profile picture`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} - Resume`,
      description: data.about,
      images: ["https://dhasdiel-cv.vercel.app/opengraph-image"],
    },
  };
}

export default async function ResumePage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const data = await resolveResumeData(variant);
  return (
    <main
      className="container relative mx-auto scroll-my-12 p-4 print:p-8 md:p-16"
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
        <Header data={data} />

        <div className="space-y-8 print:space-y-4">
          <Summary summary={data.summary} />

          <WorkExperience work={data.work} />

          <ArmyService army={data.army} />

          <Skills skills={data.skills} />

          <Education education={data.education} />
        </div>
      </section>

      <nav className="print:hidden" aria-label="Quick navigation">
        <CommandMenu links={getCommandMenuLinks()} />
      </nav>
    </main>
  );
}
