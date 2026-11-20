/**
 * Contact details and social profiles.
 *
 * `icon` must be one of: github, linkedin, mail, tryhackme, hackthebox, x,
 * mastodon, globe. Unknown names fall back to "globe".
 * url: null marks a placeholder (shown with a dashed outline, not clickable).
 *
 * The email address is assembled in the browser rather than written into the
 * HTML, which stops the simplest scrapers from harvesting it.
 */
export const contact = {
  email: "ethan@ethan-m.dev",
  message:
    "I'm looking for graduate roles in cyber security starting in 2027. If you're hiring, running a project I could help with, or just want to talk about network security, email me. I usually reply within a couple of days.",
};

export const socialLinks = [
  { label: "GitHub", icon: "github", url: "https://github.com/xytex-s", handle: "xytex-s" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/ethan-mckay-82656b332/", handle: null },
  // Optional extras. Delete any you don't use.
  { label: "TryHackMe", icon: "tryhackme", url: null, handle: null, optional: true },
];
