/**
 * University work and technical research, kept separate from personal projects.
 *
 * Fields:
 *   id         Unique, lowercase, hyphenated.
 *   title      Title of the piece of work.
 *   type       "Assignment" | "Lab" | "Research" | "Write-up" | "Demonstration" | "Documentation"
 *   context    Module or setting, e.g. "Ethical Hacking and Intrusion Detection module".
 *   year       e.g. "2026".
 *   status     "completed" | "in-progress" | "planned"
 *   group      true if it was group work.
 *   overview   Paragraph describing the work.
 *   outcomes   Key learning outcomes (list).
 *   tech       Technologies used.
 *   images     [{ src: "assets/img/research/x.png", alt: "..." }]
 *   links      [{ label: "Report (PDF)", url: "..." }]  url null = placeholder
 *
 * Before publishing assessed coursework, check your module's rules: some
 * modules don't allow reports to be shared publicly. A summary like the ones
 * below is usually fine; a full report may not be.
 */
export const research = [
  {
    id: "dfir-pcap-investigation",
    title: "Multi-sensor PCAP investigation of a staged attack chain",
    type: "Write-up",
    context: "Ethical Hacking and Intrusion Detection module",
    year: "2026", // CHECK
    status: "completed",
    group: false,
    overview:
      "A 2,000-word digital forensics and incident response report analysing packet captures from several network sensors. The investigation traced an attack from TCP SYN reconnaissance, through DarkGate command-and-control traffic, to Log4Shell exploitation and IoT botnet activity.",
    outcomes: [
      "Correlated alerts and logs across multiple sensors to build one timeline",
      "Separated reconnaissance, C2 and exploitation traffic in a large capture",
      "Wrote findings up as a structured incident report",
    ],
    tech: ["Security Onion", "Suricata", "Zeek", "NetworkMiner", "Wireshark"],
    images: [],
    links: [{ label: "Summary or report", url: null }],
  },
  {
    id: "softcorp-pen-test",
    title: "Web server penetration test",
    type: "Assignment",
    context: "Advanced Penetration Testing module",
    year: "2027",
    status: "in-progress",
    group: true,
    overview:
      "A group penetration test of a scenario company's web server, written up as a professional test report with findings and remediation advice.",
    outcomes: [], // Add once submitted
    tech: [], // PLACEHOLDER
    images: [],
    links: [{ label: "Report summary", url: null }],
  },
  {
    id: "isms-risk-assessment",
    title: "ISMS and risk assessment",
    type: "Assignment",
    context: "Information Security Management module",
    year: "2026", // CHECK
    status: "in-progress",
    group: true,
    overview:
      "Group coursework designing an information security management system and risk assessment for a scenario organisation, presented to the module team.",
    outcomes: [],
    tech: ["NIST"], // CHECK: the framework your group used
    images: [],
    links: [{ label: "Slides", url: null }],
  },
  {
    id: "final-year-project",
    title: "Final-year project: prompt injection in tool-connected LLMs",
    type: "Research",
    context: "Level 6 project",
    year: "2027",
    status: "planned",
    group: false,
    overview:
      "Research into prompt injection risks when language models are connected to external tools through the Model Context Protocol (MCP), using locally hosted models. The topic is at the research stage. Update this entry as the project takes shape.",
    outcomes: [],
    tech: ["Python", "Ollama"], // CHECK
    images: [],
    links: [{ label: "Project repository", url: null }],
  },
];
