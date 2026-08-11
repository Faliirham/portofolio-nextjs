import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import CursorTrail from "@/components/ui/CursorTrail";
import Marquee from "@/components/ui/Marquee";
import {
  getConfig,
  getAboutSection,
  getSkillsSection,
  getProjects,
  getExperienceSection,
  getCertificationsSection,
  getContactSection,
} from "@/lib/content";

export default function Home() {
  const config = getConfig();
  const about = getAboutSection();
  const skills = getSkillsSection();
  const projects = getProjects();
  const experience = getExperienceSection();
  const certifications = getCertificationsSection();
  const contact = getContactSection();

  const skillTicker = skills.categories.flatMap((c) => c.items).slice(0, 12);
  const zoneTicker = [
    `Rider #${config.riderNumber.replace("#", "")}`,
    config.role,
    config.location,
    config.email,
  ];

  return (
    <>
      <CursorTrail />
      <main id="main">
        <Navbar config={config} />
        <Hero config={config} />
        <Marquee items={zoneTicker} variant="dark" />
        <About section={about} config={config} />
        <Marquee items={skillTicker} variant="red" />
        <Skills section={skills} />
        <Marquee items={zoneTicker} variant="dark" />
        <Projects projects={projects} />
        <Marquee items={skillTicker} variant="red" />
        <Experience section={experience} />
        <Marquee items={zoneTicker} variant="dark" />
        <Certifications section={certifications} />
        <Marquee items={skillTicker} variant="red" />
        <Contact section={contact} config={config} />
      </main>
    </>
  );
}
