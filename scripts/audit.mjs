#!/usr/bin/env node
/**
 * Lists every placeholder still in the data files and checks the data loads.
 *
 *   node scripts/audit.mjs            report placeholders (exit 0)
 *   node scripts/audit.mjs --strict   exit 1 if any placeholders remain
 *
 * A syntax error in a data file always exits 1, so the deploy workflow
 * stops before publishing a broken site.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const issues = [];
const add = (file, where, what) => issues.push({ file, where, what });
const missing = (v) => v === null || v === undefined || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && !v.length);

async function load(file) {
  try {
    return await import(pathToFileURL(path.join(root, "data", file)).href);
  } catch (err) {
    console.error(`\n✖ data/${file} could not be loaded:\n  ${err.message}\n`);
    process.exit(1);
  }
}

const { site } = await load("site.js");
const { projects, CATEGORIES } = await load("projects.js");
const { tools } = await load("tools.js");
const { skills } = await load("skills.js");
const { research } = await load("research.js");
const { contact, socialLinks } = await load("social-links.js");

// site.js
if (missing(site.name.last)) add("site.js", "name.last", "surname (optional)");
if (missing(site.seo.url)) add("site.js", "seo.url", "site URL");
if (missing(site.about.education.graduation)) add("site.js", "about.education.graduation", "graduation date");

// projects.js
const ids = new Set();
const cats = new Set(CATEGORIES.map((c) => c.id));
for (const p of projects) {
  const at = `projects["${p.id}"]`;
  if (ids.has(p.id)) add("projects.js", at, "DUPLICATE id: ids must be unique");
  ids.add(p.id);
  for (const c of p.categories) if (!cats.has(c)) add("projects.js", at, `unknown category "${c}"`);
  if (!["completed", "in-progress", "planned"].includes(p.status)) add("projects.js", at, `unknown status "${p.status}"`);
  if (missing(p.tech) && p.status !== "planned") add("projects.js", `${at}.tech`, "technologies");
  if (missing(p.links?.repo)) add("projects.js", `${at}.links.repo`, "GitHub link");
  if (missing(p.image)) add("projects.js", `${at}.image`, "screenshot (optional)");
  if ((p.description || []).filter(Boolean).length < 2) add("projects.js", `${at}.description`, "full write-up");
}

// tools.js
for (const t of tools) {
  if (t.upcoming) { add("tools.js", `tools["${t.id}"]`, "upcoming tool entry (replace or delete)"); continue; }
  if (missing(t.tech)) add("tools.js", `tools["${t.id}"].tech`, "technologies");
  if (missing(t.links?.repo)) add("tools.js", `tools["${t.id}"].links.repo`, "repository link");
}

// research.js
for (const r of research) {
  if (missing(r.outcomes)) add("research.js", `research["${r.id}"].outcomes`, "learning outcomes");
  if (missing(r.tech)) add("research.js", `research["${r.id}"].tech`, "technologies");
  (r.links || []).forEach((l, i) => missing(l.url) && add("research.js", `research["${r.id}"].links[${i}]`, `"${l.label}" link`));
}

// social-links.js
if (missing(contact.email)) add("social-links.js", "contact.email", "email address");
for (const l of socialLinks) if (!l.optional && missing(l.url)) add("social-links.js", l.label, "profile URL");

// Static files that also need your details
const statics = [
  ["index.html", /your-username/g, "og:url"],
  ["sitemap.xml", /your-username/g, "site URL"],
  ["robots.txt", /your-username/g, "sitemap URL"],
  [".well-known/security.txt", /your\.email@example\.com/g, "contact email"],
];
for (const [file, re, what] of statics) {
  const text = await readFile(path.join(root, file), "utf8");
  if (re.test(text)) add(file, "", what);
}

// Report
const skillCount = skills.reduce((n, g) => n + g.items.length, 0);
console.log(`Loaded ${projects.length} projects, ${tools.length} tools, ${skillCount} skills, ${research.length} research entries.\n`);
if (!issues.length) {
  console.log("✔ No placeholders left.");
} else {
  const byFile = Object.groupBy ? Object.groupBy(issues, (i) => i.file) : issues.reduce((a, i) => ((a[i.file] ||= []).push(i), a), {});
  for (const [file, list] of Object.entries(byFile)) {
    console.log(file);
    for (const i of list) console.log(`  ○ ${i.where ? i.where + ": " : ""}${i.what}`);
  }
  console.log(`\n${issues.length} placeholders to fill in.`);
}
const hardErrors = issues.filter((i) => /DUPLICATE|unknown/.test(i.what));
process.exit(hardErrors.length || (strict && issues.length) ? 1 : 0);
