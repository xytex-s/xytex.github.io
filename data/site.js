/**
 * Site-wide details: who you are, the hero text, and the About section.
 *
 * Anything set to null is treated as a placeholder. Placeholders are shown
 * with a dashed outline on the site and listed when you run:
 *   node scripts/audit.mjs      (or open the site with ?audit in the URL)
 */
export const site = {
  name: {
    first: "Ethan",
    last: "M.", // Shown as "Ethan M." Use null for just "Ethan".
  },

  // The three parts of your headline, shown in order under your name.
  headline: [
    "Cyber Security Student",
    "Aspiring Cyber Security Professional",
    "Developer",
  ],

  intro:
    "Final-year cyber security student at Sheffield Hallam University. I learn by building things: a packet sniffer, a file transfer protocol, and intrusion detection rules for real attack traffic.",

  location: "United Kingdom",

  // The small status line in the hero. Set to null to hide it.
  availability: {
    open: true, // true shows a green indicator, false shows grey
    text: "Open to 2027 graduate roles in cyber security",
  },

  // Short paragraph under the hero.
  quickIntro:
    "I'm interested in how networks behave, how they get attacked, and how to spot it when they do. Most of what I know has come from setting something up, breaking it, and working out why. This site collects that work: university projects, personal tools, and write-ups of what I learned along the way.",

  about: {
    // Optional photo, e.g. "assets/img/profile.jpg" (square, 480px+).
    // Leave as null for no photo: nothing is shown in its place.
    photo: null,
    photoAlt: "Portrait of Ethan",

    // Each string is one paragraph. Edit freely: this is a draft to make your own.
    bio: [
      "I'm in my final year of a BSc (Hons) in Cyber Security at Sheffield Hallam University. Most of my practical experience comes from coursework labs and from projects I've built at home.",
      "The part of security that holds my attention most is the network: reading packet captures, tuning intrusion detection, and following an attack from the first scan to the last connection. I like tools that make that easier to see, which is why a few of my projects are monitors and sniffers.",
      "Outside coursework, I write software for fun. Some of it is security tooling, and some of it is simply me wanting to understand how a protocol works by writing my own.",
    ],

    // How you approach learning. Shown as a short list.
    approach: [
      "Build a lab before reading the theory twice",
      "Write up what I did so someone else could repeat it",
      "Prefer small tools I understand over large ones I don't",
    ],

    education: {
      degree: "BSc (Hons) Cyber Security",
      institution: "Sheffield Hallam University",
      graduation: "Expected 2027", // Edit when you know your graduation date, e.g. "July 2027"
      detail: "Final year (Level 6)",
    },

    // What you want to do next. Shown as tags.
    careerInterests: [
      "Network defence",
      "Security operations",
      "Penetration testing",
      "Security engineering",
    ],
  },

  // Used for <title>, metadata and the canonical URL.
  seo: {
    url: "https://ethan-m.dev/",
    description:
      "Portfolio of a final-year cyber security student at Sheffield Hallam University: network security projects, intrusion detection labs, tools and research.",
  },
};
