import { $, svg } from "../lib/dom.js";
import { icon } from "../lib/icons.js";

export function initTheme() {
  const btn = $(".theme-toggle");
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');

  const render = () => {
    const dark = root.dataset.theme !== "light";
    btn.replaceChildren(svg(icon(dark ? "sun" : "moon")));
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("aria-pressed", String(!dark));
    if (meta) meta.setAttribute("content", dark ? "#0a1322" : "#f2f5f9");
  };

  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {}
    render();
  });
  render();
}
