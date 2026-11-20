import { h, svg } from "../lib/dom.js";
import { isMissing, linkButton, placeholder, safeUrl, statusBadge, techList } from "../lib/content.js";

function toolIcon(tool) {
  const src = safeUrl(tool.icon);
  if (src) return h("img", { class: "tool__icon", src, alt: "", width: 48, height: 48, loading: "lazy" });
  return h("span", { class: "tool__icon tool__icon--glyph", "aria-hidden": "true" }, tool.glyph || tool.name.slice(0, 2).toLowerCase());
}

export function renderTools(root, { tools }) {
  root.append(
    h(
      "ul",
      { class: "tool-list" },
      tools.map((t) =>
        h(
          "li",
          { class: ["tool", t.upcoming && "tool--upcoming"] },
          toolIcon(t),
          h(
            "div",
            { class: "tool__main" },
            h("div", { class: "tool__head" }, h("h3", { class: "tool__name" }, t.name), statusBadge(t.status)),
            h("p", { class: "tool__desc" }, t.description),
            !isMissing(t.purpose) ? h("p", { class: "tool__purpose" }, h("span", { class: "tool__purpose-label" }, "Why: "), t.purpose) : null,
            t.upcoming ? null : techList(t.tech, `${t.id}.tech`)
          ),
          t.upcoming
            ? null
            : h(
                "div",
                { class: "tool__links" },
                linkButton({ url: t.links.repo, label: "Repository", iconName: "github", field: `${t.id}.links.repo`, small: true }),
                t.links.docs ? linkButton({ url: t.links.docs, label: "Docs", iconName: "doc", field: `${t.id}.links.docs`, small: true }) : null
              )
        )
      )
    )
  );
}
