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
    id: "nettrace",
    name: "NetTrace",
    icon: null,
    glyph: "nt",
    description: "Packet sniffer for Windows and Linux. Captures from a chosen interface, filters by protocol, port or IP, and saves PCAP files.",
    purpose:
      "Seeing exactly what crosses the wire, without the abstraction of a full analyser, to understand packet structure and spot unusual traffic.",
    tech: ["Python", "Raw sockets", "PCAP", "Tkinter"],
    status: "completed",
    links: { repo: "https://github.com/xytex-s/NetTrace", docs: "https://github.com/xytex-s/NetTrace/blob/main/GUI_USAGE.md" },
  },
  {
    id: "pyftpx",
    name: "PyFTPX",
    icon: null,
    glyph: "fx",
    description: "Experimental file transfer protocol over UDP, with a command-line sender and receiver.",
    purpose:
      "Understanding what TCP does for you by rebuilding reliability (ordering, acknowledgements, retransmission and integrity checks) on top of UDP.",
    tech: ["Python", "UDP", "pytest"],
    status: "in-progress",
    links: { repo: "https://github.com/xytex-s/PyFTPX", docs: "https://github.com/xytex-s/PyFTPX/blob/main/docs/protocol-spec.md" },
  },
  {
    id: "next-utility",
    name: "Security tool suite",
    icon: null,
    glyph: "+",
    description: "In planning: a set of security tools. Details to follow once the direction is settled.",
    purpose: "",
    tech: [],
    status: "planned",
    links: { repo: null, docs: null },
    upcoming: true,
  },
];
