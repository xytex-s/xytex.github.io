import { $, $$ } from "../lib/dom.js";

/** Sticky header: active-section highlighting, mobile menu, back-to-top. */
export function initNav() {
  const header = $(".site-header");
  const toggle = $(".nav-toggle");
  const menu = $("#site-nav");
  const links = $$("#site-nav a[href^='#']");
  const sections = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);

  // ---- Mobile menu -------------------------------------------------------
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => e.matches && setOpen(false));

  // ---- Active section ------------------------------------------------------
  const setActive = (id) => {
    for (const a of links) {
      if (a.hash === `#${id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };
  const visible = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) visible.set(e.target.id, e.isIntersecting);
      const current = sections.find((s) => visible.get(s.id));
      if (current) setActive(current.id);
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => io.observe(s));

  // ---- Header shadow + back to top -------------------------------------
  const top = $(".back-to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);
    top.classList.toggle("is-visible", y > window.innerHeight * 0.9);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
    $(".brand").focus({ preventScroll: true });
  });
}
