import { site } from "../../data/site.js";
import { projects, CATEGORIES } from "../../data/projects.js";
import { tools } from "../../data/tools.js";
import { skills } from "../../data/skills.js";
import { research } from "../../data/research.js";
import { contact, socialLinks } from "../../data/social-links.js";

import { $ } from "./lib/dom.js";
import { fullName, initials, isMissing } from "./lib/content.js";
import { renderHero } from "./sections/hero.js";
import { renderAbout } from "./sections/about.js";
import { renderProjects } from "./sections/projects.js";
import { renderTools } from "./sections/tools.js";
import { renderSkills } from "./sections/skills.js";
import { renderResearch } from "./sections/research.js";
import { renderContact } from "./sections/contact.js";
import { initNav } from "./ui/nav.js";
import { initTheme } from "./ui/theme.js";
import { initAudit } from "./ui/audit.js";

function applySiteMeta() {
  const name = fullName(site);
  document.title = `${name} | Cyber Security Portfolio`;
  $(".brand__mark").textContent = initials(site);
  $(".brand__name").textContent = name;
  $(".footer__name").textContent = name;
  $(".footer__year").textContent = new Date().getFullYear();
  if (!isMissing(site.seo.url)) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.append(link);
    }
    link.href = site.seo.url;
  }
}

function run(name, fn) {
  try {
    fn();
  } catch (err) {
    // One broken data entry shouldn't take down the whole page.
    console.error(`[portfolio] ${name} failed to render:`, err);
  }
}

run("meta", applySiteMeta);
run("hero", () => renderHero($("#home"), { site, socialLinks }));
run("about", () => renderAbout($("#about .section__content"), { site }));
run("projects", () => renderProjects($("#projects .section__content"), { projects, categories: CATEGORIES }));
run("tools", () => renderTools($("#tools .section__content"), { tools }));
run("skills", () => renderSkills($("#skills .section__content"), { skills, projects }));
run("research", () => renderResearch($("#research .section__content"), { research }));
run("contact", () => renderContact($("#contact .section__content"), { contact, socialLinks }));
run("nav", initNav);
run("theme", initTheme);
run("audit", initAudit);

document.documentElement.classList.add("is-ready");

// Deep link to a section after content has rendered (e.g. /#skills).
if (location.hash && !location.hash.startsWith("#project=")) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView();
}
