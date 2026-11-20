import { h, svg } from "../lib/dom.js";
import { icon } from "../lib/icons.js";
import { isMissing, linkButton, placeholder, safeUrl, statusBadge, techList } from "../lib/content.js";

/**
 * Research and university work as an index of entries, like a lab notebook.
 * Each entry expands (native <details>) to show outcomes, tools and links.
 */
export function renderResearch(root, { research }) {
  root.append(
    h(
      "ol",
      { class: "research-index" },
      research.map((r) =>
        h(
          "li",
          { class: "entry" },
          h(
            "details",
            { id: `research-${r.id}` },
            h(
              "summary",
              { class: "entry__summary" },
              h("span", { class: "entry__type" }, r.type),
              h(
                "span",
                { class: "entry__heading" },
                h("span", { class: "entry__title" }, r.title),
                h("span", { class: "entry__context" }, [r.context, r.group ? "group work" : null, r.year].filter(Boolean).join(", "))
              ),
              statusBadge(r.status),
              h("span", { class: "entry__toggle", "aria-hidden": "true" })
            ),
            h(
              "div",
              { class: "entry__body" },
              h("p", { class: "entry__overview" }, r.overview),
              h(
                "div",
                { class: "entry__cols" },
                h(
                  "div",
                  {},
                  h("h4", {}, "Key learning outcomes"),
                  isMissing(r.outcomes)
                    ? h("p", {}, placeholder(r.status === "completed" ? "Outcomes to add" : "Add outcomes once finished", `${r.id}.outcomes`))
                    : h("ul", { class: "approach" }, r.outcomes.map((o) => h("li", {}, o)))
                ),
                h("div", {}, h("h4", {}, "Tools and technologies"), techList(r.tech, `${r.id}.tech`))
              ),
              r.images && r.images.length
                ? h(
                    "ul",
                    { class: "entry__shots" },
                    r.images.map((img) => {
                      const src = safeUrl(img.src);
                      return src ? h("li", {}, h("a", { href: src }, h("img", { src, alt: img.alt || "", loading: "lazy", decoding: "async" }))) : null;
                    })
                  )
                : null,
              h(
                "div",
                { class: "project__actions" },
                (r.links || []).map((l, i) => linkButton({ url: l.url, label: l.label, iconName: "doc", field: `${r.id}.links[${i}]`, small: true }))
              )
            )
          )
        )
      )
    )
  );
}
