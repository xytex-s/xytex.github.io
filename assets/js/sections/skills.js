import { h } from "../lib/dom.js";

/**
 * Skills as grouped tags. A skill that appears in any project's tech list
 * becomes a button that filters the Projects section to that technology.
 */
export function renderSkills(root, { skills, projects }) {
  const usage = new Map();
  for (const p of projects) {
    for (const t of p.tech || []) {
      const k = t.toLowerCase();
      usage.set(k, (usage.get(k) || 0) + 1);
    }
  }

  const anyLinked = skills.some((g) => g.items.some((s) => usage.has(s.toLowerCase())));

  root.append(
    anyLinked
      ? h("p", { class: "skills__key" }, h("span", { class: "skill-dot", "aria-hidden": "true" }), "Skills with a marker link to the projects where I've used them.")
      : null,
    h(
      "div",
      { class: "skill-groups" },
      skills.map((g) =>
        h(
          "section",
          { class: "skill-group", "aria-labelledby": `sg-${slug(g.group)}` },
          h("h3", { class: "skill-group__title", id: `sg-${slug(g.group)}` }, g.group),
          h(
            "ul",
            { class: "tags" },
            g.items.map((s) => {
              const n = usage.get(s.toLowerCase());
              if (!n) return h("li", { class: "chip" }, s);
              return h(
                "li",
                {},
                h(
                  "button",
                  {
                    type: "button",
                    class: "chip chip--linked",
                    onclick: () => document.dispatchEvent(new CustomEvent("portfolio:filter-tech", { detail: { tech: s } })),
                  },
                  h("span", { class: "skill-dot", "aria-hidden": "true" }),
                  s,
                  h("span", { class: "sr-only" }, `: show ${n} ${n === 1 ? "project" : "projects"}`)
                )
              );
            })
          )
        )
      )
    )
  );
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
