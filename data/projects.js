/**
 * Projects shown in the Projects section.
 *
 * To add a project, copy one entry and change the values. Fields:
 *
 *   id          Unique, lowercase, hyphenated. Used in shareable links (#project=id).
 *   title       Project name.
 *   summary     One or two sentences for the card.
 *   description Paragraphs shown in the detail view. Array of strings.
 *   highlights  Optional bullet points for the detail view.
 *   categories  One or more of: "cybersecurity", "networking", "software",
 *               "university", "research", "other"  (see CATEGORIES below)
 *   status      "completed" | "in-progress" | "planned"
 *   tech        Technologies used. Use the same spelling as in skills.js so the
 *               Skills section can link to this project.
 *   image       Path to a screenshot, e.g. "assets/img/projects/sniffer.png", or null.
 *               With no image, the card shows a generated pattern instead.
 *   imageAlt    Describe what the screenshot shows.
 *   links       repo / demo: a URL, or null if you don't have one yet.
 *   year        Optional, e.g. "2026".
 *   featured    Optional. true puts the project first.
 *
 * null values are placeholders: they show as "to add" on the site and are
 * listed by `node scripts/audit.mjs`.
 */

export const CATEGORIES = [
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "networking", label: "Networking" },
  { id: "software", label: "Software Development" },
  { id: "university", label: "University Projects" },
  { id: "research", label: "Research" },
  { id: "other", label: "Other" },
];

export const projects = [
  {
    id: "network-packet-sniffer",
    title: "Network Packet Sniffer",
    summary:
      "A personal project for capturing and analysing network traffic, built to understand packet structure and monitoring from the ground up.",
    description: [
      "A personal project focused on network packet analysis and network monitoring.",
      // PLACEHOLDER: describe what it captures, how it decodes packets, and what you learned.
    ],
    highlights: [],
    categories: ["cybersecurity", "networking", "software"],
    status: "in-progress", // CHECK: update when finished
    tech: [], // PLACEHOLDER: e.g. ["Python", "Scapy"]
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
    featured: true,
  },
  {
    id: "network-intrusion-detection",
    title: "Network Intrusion Detection System",
    summary:
      "A university project exploring network intrusion detection with Security Onion, Suricata and Zeek.",
    description: [
      "A university project exploring network intrusion detection using Security Onion, Suricata and Zeek.",
      // PLACEHOLDER: describe the lab setup, the traffic you tested against, and your findings.
    ],
    highlights: [],
    categories: ["cybersecurity", "networking", "university"],
    status: "in-progress", // CHECK
    tech: ["Security Onion", "Suricata", "Zeek"],
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
    featured: true,
  },
  {
    id: "osu-performance-tracker",
    title: "osu! Performance Tracker",
    summary:
      "A desktop application that monitors real-time osu! gameplay statistics using the tosu API and WebSockets.",
    description: [
      "A desktop application designed to monitor real-time osu! gameplay statistics using the tosu API and WebSockets.",
      // PLACEHOLDER: which stats it tracks, how it's built, what's next.
    ],
    highlights: [],
    categories: ["software", "other"],
    status: "in-progress", // CHECK
    tech: ["tosu API", "WebSockets"], // PLACEHOLDER: add the language/framework
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
  },
  {
    id: "personal-cloud-server",
    title: "Personal Cloud Server",
    summary:
      "A self-hosted storage and application environment for practising Linux administration, networking and cloud technologies.",
    description: [
      "A self-hosted storage and application environment exploring Linux administration, networking and cloud technologies.",
      // PLACEHOLDER: hardware, services you run, how you secured remote access.
    ],
    highlights: [],
    categories: ["networking", "other"],
    status: "in-progress", // CHECK
    tech: ["Linux", "Self-hosted services"], // PLACEHOLDER: add the services you run
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
  },
  {
    id: "azure-sql-database",
    title: "Azure SQL Database Project",
    summary:
      "A university project on cloud-hosted SQL databases: building and querying a database on Microsoft Azure and using its security features.",
    description: [
      "A university project demonstrating cloud-hosted SQL databases, database querying and security features using Microsoft Azure.",
      // PLACEHOLDER: which security features (e.g. firewall rules, auditing) and what the database modelled.
    ],
    highlights: [],
    categories: ["university", "cybersecurity", "software"],
    status: "in-progress", // CHECK
    tech: ["Microsoft Azure", "SQL"],
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
  },
  {
    id: "custom-file-transfer-protocol",
    title: "Custom File Transfer Protocol",
    summary:
      "An exploration of how file transfer protocols work, by designing and implementing one in Python.",
    description: [
      "An exploration of developing a file transfer protocol using Python.",
      // PLACEHOLDER: message format, how transfers are framed and verified, what you'd change.
    ],
    highlights: [],
    categories: ["networking", "software", "research"],
    status: "in-progress", // CHECK
    tech: ["Python"],
    image: null,
    imageAlt: "",
    links: { repo: null, demo: null },
    year: null,
  },
];
