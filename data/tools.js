/**
 * Tools shown in the Cybersecurity Tools section.
 *
 * Fields:
 *   id        Unique, lowercase, hyphenated.
 *   name      Tool name.
 *   icon      Path to a square logo (SVG or PNG), or null to use a generated
 *             tile showing `glyph`.
 *   glyph     One or two characters for the generated tile.
 *   description What it is.
 *   purpose   Why it exists: the problem it solves.
 *   tech      Technologies used (same spelling as skills.js).
 *   status    "completed" | "in-progress" | "planned"
 *   links     repo / docs: a URL or null.
 *   upcoming  true styles the entry as a future tool (dashed outline).
 */
export const tools = [
  {
    id: "packet-sniffer",
    name: "Network Packet Sniffer",
    icon: null,
    glyph: "ps",
    description: "Captures packets from a network interface and breaks them down by protocol.",
    purpose:
      "Seeing exactly what crosses the wire, without the abstraction of a full analyser, to understand packet structure and spot unusual traffic.",
    tech: [], // PLACEHOLDER
    status: "in-progress", // CHECK
    links: { repo: null, docs: null },
  },
  {
    id: "osu-tracker",
    name: "osu! Performance Tracker",
    icon: null,
    glyph: "os",
    description: "Reads live gameplay data from tosu over WebSockets and shows performance stats in real time.",
    purpose:
      "Tracking performance during play rather than after it, and a practical way to work with real-time data streams.",
    tech: ["tosu API", "WebSockets"],
    status: "in-progress", // CHECK
    links: { repo: null, docs: null },
  },
  {
    id: "null-overlay",
    name: "Null Overlay",
    icon: null,
    glyph: "nl",
    description: "A minimal custom overlay for osu!, built on tosu, with a monospace, colourless design.",
    purpose: "A stream and gameplay overlay that shows what matters and nothing else.",
    tech: ["tosu API", "JavaScript", "HTML", "CSS"], // CHECK
    status: "in-progress",
    links: { repo: null, docs: null },
  },
  {
    id: "next-utility",
    name: "Next security utility",
    icon: null,
    glyph: "+",
    description: "Space for the next tool. Replace this entry when you start building it.",
    purpose: "", // e.g. "Automate first-pass triage of Zeek logs."
    tech: [],
    status: "planned",
    links: { repo: null, docs: null },
    upcoming: true,
  },
];
