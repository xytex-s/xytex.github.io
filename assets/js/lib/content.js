/**
 * Shared content helpers: placeholder detection, statuses, link rendering.
 */
import { h, svg } from "./dom.js";
import { icon } from "./icons.js";

export const STATUS = {
  completed: { label: "Completed", tone: "ok" },
  "in-progress": { label: "In progress", tone: "warn" },
  planned: { label: "Planned", tone: "idle" },
};

export const isMissing = (v) =>
  v === null || v === undefined || (typeof v === "string" && v.trim() === "") ||
  (Array.isArray(v) && v.length === 0);

/** Only allow http(s), mailto and relative URLs in data-driven links. */
export function safeUrl(url) {
  if (isMissing(url)) return null;
  const trimmed = String(url).trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return null; // javascript:, data:, etc.
  return trimmed; // relative path
}

export function statusBadge(status) {
  const s = STATUS[status] || STATUS["in-progress"];
  return h("span", { class: ["status", `status--${s.tone}`] }, s.label);
}

/** A visible placeholder marker. Collected by the ?audit overlay. */
export function placeholder(text, field) {
  return h("span", { class: "ph", dataset: { placeholder: field || text } }, text);
}

/**
 * Link button that degrades to a dashed "to add" marker when url is missing.
 * kind: "repo" | "demo" | "docs" | "doc"
 */
export function linkButton({ url, label, iconName = "external", field, small = false }) {
  if (url === false) return null; // false means "no link, on purpose": show nothing
  const href = safeUrl(url);
  if (!href) {
    return h(
      "span",
      { class: ["btn", "btn--ghost", "btn--placeholder", small && "btn--sm"], dataset: { placeholder: field || label }, title: "Link not added yet" },
      svg(icon(iconName)),
      `${label}: to add`
    );
  }
  const external = /^https?:/i.test(href);
  return h(
    "a",
    {
      class: ["btn", "btn--ghost", small && "btn--sm"],
      href,
      target: external ? "_blank" : null,
      rel: external ? "noopener noreferrer" : null,
    },
    svg(icon(iconName)),
    label,
    external ? h("span", { class: "sr-only" }, " (opens in a new tab)") : null
  );
}

export function techList(tech, field) {
  if (isMissing(tech)) {
    return h("ul", { class: "tech", "aria-label": "Technologies" }, h("li", {}, placeholder("Tech stack to add", field)));
  }
  return h(
    "ul",
    { class: "tech", "aria-label": "Technologies" },
    tech.map((t) => h("li", { class: "chip" }, t))
  );
}

export const fullName = (site) =>
  [site.name.first, site.name.last].filter((p) => !isMissing(p)).join(" ");

export const initials = (site) =>
  [site.name.first, site.name.last]
    .filter((p) => !isMissing(p))
    .map((p) => p.trim()[0].toUpperCase())
    .join("");
