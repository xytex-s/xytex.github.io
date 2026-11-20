import { h, svg, hash, rng, prefersReducedMotion } from "../lib/dom.js";
import { icon } from "../lib/icons.js";
import { STATUS, isMissing, linkButton, placeholder, safeUrl, statusBadge, techList } from "../lib/content.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Generated cover for projects without a screenshot: a "traffic signature",
 * bars like packet sizes over time, seeded from the project id so each
 * project always gets the same pattern.
 */
function cover(project) {
  const rand = rng(hash(project.id));
  const W = 320, H = 120, n = 46;
  const el = document.createElementNS(SVG_NS, "svg");
  el.setAttribute("viewBox", `0 0 ${W} ${H}`);
  el.setAttribute("preserveAspectRatio", "none");
  el.setAttribute("class", "cover__art");
  el.setAttribute("aria-hidden", "true");

  const base = H - 22;
  const burstAt = Math.floor(rand() * (n - 12)) + 6;
  for (let i = 0; i < n; i++) {
    const near = Math.abs(i - burstAt);
    const burst = near < 5 ? (5 - near) / 5 : 0;
    const v = Math.min(1, 0.12 + rand() * 0.38 + burst * (0.4 + rand() * 0.3));
    const bh = Math.max(3, v * (base - 12));
    const r = document.createElementNS(SVG_NS, "rect");
    r.setAttribute("x", (i * W) / n + 1);
    r.setAttribute("y", base - bh);
    r.setAttribute("width", W / n - 2.4);
    r.setAttribute("height", bh);
    r.setAttribute("class", burst > 0.2 ? "bar bar--hot" : "bar");
    el.append(r);
  }
  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", 0); line.setAttribute("x2", W);
  line.setAttribute("y1", base + 0.5); line.setAttribute("y2", base + 0.5);
  line.setAttribute("class", "axis");
  el.append(line);
  return el;
}

function media(project, cls) {
  const src = safeUrl(project.image);
  if (src) {
    return h("img", { class: cls, src, alt: project.imageAlt || "", loading: "lazy", decoding: "async", width: 640, height: 360 });
  }
  return h("div", { class: [cls, "cover"], dataset: { placeholder: `${project.id}.image (optional)` } }, cover(project), h("span", { class: "cover__note" }, "No screenshot yet"));
}

export function renderProjects(root, { projects, categories }) {
  const sorted = [...projects].sort((a, b) => (b.featured === true) - (a.featured === true));
  const used = categories.filter((c) => projects.some((p) => p.categories.includes(c.id)));
  const label = Object.fromEntries(categories.map((c) => [c.id, c.label]));

  const state = { category: "all", tech: null };

  // ---- Filters ---------------------------------------------------------
  const count = (id) => (id === "all" ? projects.length : projects.filter((p) => p.categories.includes(id)).length);
  const chips = [{ id: "all", label: "All" }, ...used].map((c) =>
    h(
      "button",
      { type: "button", class: "filter", "aria-pressed": c.id === "all" ? "true" : "false", dataset: { filter: c.id } },
      c.label,
      h("span", { class: "filter__count", "aria-hidden": "true" }, count(c.id))
    )
  );
  const techChip = h("div", { class: "tech-filter", hidden: true });
  const live = h("p", { class: "sr-only", "aria-live": "polite" });
  const filterBar = h("div", { class: "filters", role: "group", "aria-label": "Filter projects by category" }, chips);

  // ---- Grid ------------------------------------------------------------
  const empty = h("p", { class: "empty", hidden: true }, "No projects match this filter yet. ", h("button", { type: "button", class: "linklike", onclick: () => apply("all", null) }, "Show all projects"));
  const grid = h(
    "ul",
    { class: "project-grid" },
    sorted.map((p) =>
      h(
        "li",
        { class: "project", dataset: { id: p.id, categories: p.categories.join(" "), tech: (p.tech || []).join("|").toLowerCase() } },
        h(
          "article",
          { class: "project__card", "aria-labelledby": `p-${p.id}` },
          media(p, "project__media"),
          h(
            "div",
            { class: "project__body" },
            h("div", { class: "project__top" }, h("span", { class: "project__cat" }, label[p.categories[0]]), statusBadge(p.status)),
            h("h3", { class: "project__title", id: `p-${p.id}` }, p.title),
            h("p", { class: "project__summary" }, p.summary),
            techList(p.tech, `${p.id}.tech`),
            h(
              "div",
              { class: "project__actions" },
              h("button", { type: "button", class: "btn btn--primary btn--sm", onclick: () => openProject(p.id, true) }, "View Project", h("span", { class: "sr-only" }, `: ${p.title}`)),
              linkButton({ url: p.links.repo, label: "GitHub", iconName: "github", field: `${p.id}.links.repo`, small: true }),
              p.links.demo ? linkButton({ url: p.links.demo, label: "Live demo", field: `${p.id}.links.demo`, small: true }) : null
            )
          )
        )
      )
    )
  );

  root.append(h("div", { class: "filters-wrap" }, filterBar, techChip), live, grid, empty);

  function apply(category, tech) {
    state.category = category;
    state.tech = tech;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === category)));
    let shown = 0;
    for (const li of grid.children) {
      const okCat = category === "all" || li.dataset.categories.split(" ").includes(category);
      const okTech = !tech || li.dataset.tech.split("|").includes(tech.toLowerCase());
      const show = okCat && okTech;
      li.hidden = !show;
      if (show) shown++;
    }
    empty.hidden = shown > 0;
    techChip.hidden = !tech;
    techChip.replaceChildren();
    if (tech) {
      techChip.append(
        h("span", {}, "Using ", h("strong", {}, tech)),
        h("button", { type: "button", class: "tech-filter__clear", "aria-label": `Clear ${tech} filter`, onclick: () => apply(state.category, null) }, svg(icon("close")))
      );
    }
    const catLabel = category === "all" ? "all categories" : label[category];
    live.textContent = `Showing ${shown} ${shown === 1 ? "project" : "projects"} in ${catLabel}${tech ? ` using ${tech}` : ""}.`;
    if (!prefersReducedMotion()) {
      grid.classList.remove("is-filtering");
      void grid.offsetWidth;
      grid.classList.add("is-filtering");
    }
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (btn) apply(btn.dataset.filter, state.tech);
  });

  // Used by the Skills section to show projects for a given technology.
  document.addEventListener("portfolio:filter-tech", (e) => {
    apply("all", e.detail.tech);
    root.closest("section").scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    filterBar.querySelector("[data-filter='all']").focus({ preventScroll: true });
  });

  // ---- Detail dialog -----------------------------------------------------
  const dialog = h("dialog", { class: "project-dialog", "aria-labelledby": "pd-title" });
  document.body.append(dialog);
  let opener = null;

  function openProject(id, push) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    opener = document.activeElement;
    const desc = (p.description || []).filter(Boolean);
    dialog.replaceChildren(
      h(
        "div",
        { class: "pd" },
        h("button", { type: "button", class: "pd__close icon-btn", "aria-label": "Close project details", onclick: () => dialog.close() }, svg(icon("close"))),
        media(p, "pd__media"),
        h(
          "div",
          { class: "pd__body" },
          h("div", { class: "project__top" }, h("span", { class: "project__cat" }, p.categories.map((c) => label[c]).join(", ")), statusBadge(p.status)),
          h("h2", { id: "pd-title", class: "pd__title" }, p.title),
          h("div", { class: "prose" }, desc.map((d) => h("p", {}, d)), desc.length < 2 ? h("p", {}, placeholder("Full write-up to add", `${p.id}.description`)) : null),
          p.highlights && p.highlights.length ? [h("h3", {}, "Highlights"), h("ul", { class: "approach" }, p.highlights.map((x) => h("li", {}, x)))] : null,
          h("h3", {}, "Built with"),
          techList(p.tech, `${p.id}.tech`),
          h(
            "div",
            { class: "project__actions" },
            linkButton({ url: p.links.repo, label: "GitHub repository", iconName: "github", field: `${p.id}.links.repo` }),
            p.links.demo ? linkButton({ url: p.links.demo, label: "Live demo", field: `${p.id}.links.demo` }) : null
          ),
          h("p", { class: "pd__meta" }, p.year ? `${p.year}. ` : "", STATUS[p.status] ? `Status: ${STATUS[p.status].label.toLowerCase()}.` : "")
        )
      )
    );
    dialog.showModal();
    dialog.querySelector(".pd__close").focus();
    if (push) history.replaceState(null, "", `#project=${encodeURIComponent(p.id)}`);
  }

  dialog.addEventListener("close", () => {
    if (location.hash.startsWith("#project=")) history.replaceState(null, "", "#projects");
    if (opener && document.contains(opener)) opener.focus();
  });
  // Click on the backdrop closes the dialog.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  const fromHash = () => {
    const m = location.hash.match(/^#project=(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]), false);
  };
  window.addEventListener("hashchange", fromHash);
  fromHash();

  return { projects };
}
