import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import CursorTrail from "@/components/ui/CursorTrail";
import CheckeredTransition from "@/components/ui/CheckeredTransition";
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

  return (
    <>
      <CursorTrail />
      <main>
        <Navbar config={config} />
        <Hero config={config} />
        <CheckeredTransition />
        <About section={about} />
        <CheckeredTransition />
        <Skills section={skills} />
        <CheckeredTransition />
        <Projects projects={projects} />
        <CheckeredTransition />
        <Experience section={experience} />
        <CheckeredTransition />
        <Certifications section={certifications} />
        <CheckeredTransition />
        <Contact section={contact} config={config} />
      </main>
    </>
  );
}
