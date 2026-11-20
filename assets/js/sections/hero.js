import { h, svg } from "../lib/dom.js";
import { icon } from "../lib/icons.js";
import { fullName, safeUrl } from "../lib/content.js";

/**
 * The hero's technical element: a TCP handshake between the visitor and
 * the site, drawn as a packet sequence. The last packet carries the
 * availability status, so the "status indicator" is part of the exchange.
 */
function handshake(site) {
  const rows = [
    { dir: "out", t: "0.000000", flags: "SYN" },
    { dir: "in", t: "0.000214", flags: "SYN, ACK" },
    { dir: "out", t: "0.000391", flags: "ACK" },
    {
      dir: "in",
      t: "0.000602",
      flags: "PSH, ACK",
      payload: site.about.education.degree + ", " + site.about.education.institution,
    },
  ];
  if (site.availability) {
    rows.push({
      dir: "in",
      t: "0.000817",
      flags: "PSH, ACK",
      payload: site.availability.text,
      status: site.availability.open ? "open" : "closed",
    });
  }

  return h(
    "figure",
    { class: "handshake", "aria-label": "Illustration: a TCP handshake between you and this site" },
    h(
      "div",
      { class: "handshake__lanes", "aria-hidden": "true" },
      h("span", {}, "you"),
      h("span", {}, (site.name.first || "host").toLowerCase() + ":443")
    ),
    h(
      "ol",
      { class: "handshake__packets" },
      rows.map((r, i) =>
        h(
          "li",
          { class: ["pkt", `pkt--${r.dir}`, r.payload && "pkt--data", r.status && `pkt--${r.status}`] },
          h("span", { class: "pkt__time", "aria-hidden": "true" }, r.t),
          h(
            "span",
            { class: "pkt__wire" },
            h("span", { class: "pkt__flags" }, h("span", { class: "sr-only" }, r.dir === "out" ? "You send " : "Site replies "), r.flags),
            h("span", { class: "pkt__line", "aria-hidden": "true" }),
            r.payload
              ? h(
                  "span",
                  { class: "pkt__payload" },
                  r.status ? h("span", { class: "pulse", "aria-hidden": "true" }) : null,
                  r.payload
                )
              : null
          )
        )
      )
    ),
    h(
      "figcaption",
      { class: "handshake__caption" },
      "Connection established. ",
      h("a", { href: "#contact" }, "Send the first message")
    )
  );
}

export function renderHero(root, { site, socialLinks }) {
  const name = fullName(site);
  const links = socialLinks.filter((l) => ["github", "linkedin"].includes(l.icon));

  root.replaceChildren(
    h(
      "div",
      { class: "hero__grid container" },
      h(
        "div",
        { class: "hero__text" },
        h("h1", { class: "hero__name", id: "hero-title" }, name),
        h(
          "p",
          { class: "hero__headline" },
          site.headline.map((part, i) => h("span", { class: "headline__item" }, i ? h("span", { class: "sep", "aria-hidden": "true" }, "/ ") : null, part, i < site.headline.length - 1 ? h("span", { class: "sr-only" }, ", ") : null))
        ),
        h("p", { class: "hero__intro" }, site.intro),
        h(
          "div",
          { class: "hero__actions" },
          h("a", { class: "btn btn--primary", href: "#projects" }, "Explore My Work"),
          h("a", { class: "btn btn--outline", href: "#contact" }, "Get In Touch")
        ),
        h(
          "ul",
          { class: "hero__meta" },
          h("li", {}, svg(icon("pin")), site.location),
          links.map((l) => {
            const href = safeUrl(l.url);
            return h(
              "li",
              {},
              href
                ? h("a", { href, target: "_blank", rel: "noopener noreferrer" }, svg(icon(l.icon)), l.label, h("span", { class: "sr-only" }, " (opens in a new tab)"))
                : h("span", { class: "ph", dataset: { placeholder: `${l.label} URL` }, title: "Link not added yet" }, svg(icon(l.icon)), `${l.label}: to add`)
            );
          })
        )
      ),
      handshake(site)
    ),
    h("div", { class: "container" }, h("p", { class: "lede" }, site.quickIntro))
  );

}
