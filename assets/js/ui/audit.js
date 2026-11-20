/**
 * Placeholder audit. Open the site with ?audit in the URL
 * (e.g. http://localhost:8000/?audit) to outline every placeholder on the
 * page and list them in a panel and in the browser console.
 */
import { h } from "../lib/dom.js";

export function initAudit() {
  if (!new URLSearchParams(location.search).has("audit")) return;
  document.documentElement.classList.add("is-audit");
  const found = [...document.querySelectorAll("[data-placeholder]")].map((el) => el.dataset.placeholder);
  const unique = [...new Set(found)];
  console.table(unique.map((p) => ({ placeholder: p })));
  document.body.append(
    h(
      "aside",
      { class: "audit-panel", "aria-label": "Placeholder audit" },
      h("strong", {}, `${unique.length} placeholders on this page`),
      h("ol", {}, unique.map((p) => h("li", {}, p))),
      h("p", {}, "Run node scripts/audit.mjs for the full list with file names.")
    )
  );
}
