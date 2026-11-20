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
    id: "softcorp-pen-test",
    title: "Web server penetration test",
    type: "Assignment",
    context: "Advanced Penetration Testing module",
    year: "2027",
    status: "in-progress",
    group: true,
    overview:
      "A group penetration test of a scenario company's Linux web server, from host discovery and service enumeration through web vulnerability scanning to password-hash cracking, written up as a professional test report with findings and remediation advice.",
    outcomes: [
      "Choosing and justifying tools and techniques to assess the security of a web server and its applications",
      "Applying a risk assessment method to rate and prioritise findings",
      "Combining results from several tools into one assessment with remediation advice",
    ],
    tech: ["Kali Linux", "Nmap", "Nikto", "John the Ripper"],
    images: [],
    links: [],
  },
  {
    id: "isms-risk-assessment",
    title: "ISMS and risk assessment",
    type: "Assignment",
    context: "Information Security Management module",
    year: "2027",
    status: "in-progress",
    group: true,
    overview:
      "Group coursework designing an information security management system and risk register for a scenario insurance company with UK and US offices. The ISMS is structured on NIST CSF 2.0, with risks assessed using SP 800-30, systems categorised with FIPS 199, and controls drawn from SP 800-53, delivered as a recorded presentation.",
    outcomes: [
      "Planning a standards-based ISMS (NIST CSF 2.0) for organisational resilience",
      "Selecting and adapting a risk assessment method (NIST SP 800-30) to the organisation's UK and US obligations",
      "Evaluating security frameworks as a team, including why NIST was chosen over ISO 27001",
    ],
    tech: ["NIST CSF 2.0", "NIST SP 800-30", "NIST SP 800-53", "FIPS 199"],
    images: [],
    links: [],
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
    links: [],
  },
];
