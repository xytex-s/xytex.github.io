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
 *   outcomes    Optional learning outcomes, shown in the detail view.
 *   categories  One or more of: "cybersecurity", "networking", "software",
 *               "university", "research", "other"  (see CATEGORIES below)
 *   status      "completed" | "in-progress" | "planned"
 *   tech        Technologies used. Use the same spelling as in skills.js so the
 *               Skills section can link to this project.
 *   image       Path to a screenshot, e.g. "assets/img/projects/sniffer.png", or null.
 *               With no image, the card shows a generated pattern instead.
 *   imageAlt    Describe what the screenshot shows.
 *   links       repo / demo: a URL, null if you haven't added it yet, or false
 *               if there is no public repo (nothing is shown).
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
    id: "nettrace",
    title: "NetTrace: packet sniffer",
    summary:
      "A packet sniffer in Python that captures live traffic, decodes Ethernet, IP, TCP, UDP and ICMP headers by hand, and saves captures as PCAP files.",
    description: [
      "NetTrace captures traffic from a chosen network interface using raw sockets: SIO_RCVALL on Windows and AF_PACKET on Linux. Instead of using a capture library, it unpacks each header itself with Python's struct module, which was the point: to understand exactly what is in a packet.",
      "Captures can be filtered by protocol, port or IP address, TCP flags are shown per packet, and a small PCAP writer saves traffic in the standard format so it opens in Wireshark. It checks for administrator privileges before starting, validates input, and has both a command-line and a Tkinter interface.",
    ],
    highlights: [
      "Raw-socket capture on Windows and Linux",
      "Hand-written parsers for Ethernet, IPv4, TCP, UDP and ICMP headers",
      "PCAP export that opens in Wireshark",
      "Command-line and GUI versions, with tests",
    ],
    categories: ["cybersecurity", "networking", "software"],
    status: "completed",
    tech: ["Python", "Raw sockets", "PCAP", "Tkinter"],
    image: null,
    imageAlt: "",
    links: { repo: "https://github.com/xytex-s/NetTrace", demo: null },
    year: null,
    featured: true,
  },
  {
    id: "network-intrusion-detection",
    title: "Network intrusion detection: multi-sensor PCAP investigation",
    summary:
      "University project: analysing packet captures from three network sensors to trace a coordinated attack, from port scanning to malware command-and-control and Log4Shell exploitation, then writing Suricata rules to catch it.",
    description: [
      "For the Ethical Hacking and Intrusion Detection module I investigated packet captures from three sensors on a managed service provider's network, working inside an isolated lab because the files contained live malware. Suricata alerts were cross-checked against Zeek logs, artefacts were extracted with NetworkMiner, and every finding was confirmed at packet level in Wireshark.",
      "The captures told one story. The first showed a TCP SYN scan of 3,000 connections from a single host. The second showed a host infected with DarkGate malware, beaconing to its command-and-control server 125 times and sending data out over HTTP POST. The third showed IoT botnet traffic (Zmap, Mirai, JAWS DVR exploits) alongside mass Log4Shell attempts, which I decoded from the JNDI strings in HTTP requests.",
      "For each stage I wrote custom Suricata rules, including threshold-based scan detection, behavioural rules for regular C2 check-ins and rules that look for JNDI payloads in both URIs and headers, and noted where each one could miss obfuscated or encrypted traffic. The report ended with prioritised recommendations: patching Log4j, isolating the infected host, blocking the attacker infrastructure and enabling TLS inspection.",
    ],
    highlights: [
      "Traced one campaign across three sensors: recon, compromise, exploitation",
      "Decoded Log4Shell (CVE-2021-44228) payloads from raw HTTP traffic",
      "Wrote 9 custom Suricata rules and documented their blind spots",
    ],
    categories: ["cybersecurity", "networking", "university"],
    status: "completed",
    tech: ["Security Onion", "Suricata", "Zeek", "NetworkMiner", "Wireshark"],
    image: null,
    imageAlt: "",
    links: { repo: false, demo: null }, // no public repo
    year: "2026",
    featured: true,
  },
  {
    id: "secure-log-reporting",
    title: "Secure Log Reporting System",
    summary:
      "Group project: a client-server application that collects Linux logs, encrypts them with AES-256 and sends them to a central server across a segmented, hardened network.",
    description: [
      "Built for the Secure Network Services module. The client finds log files on a Linux machine, encrypts each one with AES-256 (key derived with PBKDF2-HMAC-SHA256, random IV per file), attaches a SHA-256 hash and sends it to the server on a schedule. The multi-threaded server decrypts each file and only stores it if the hash matches.",
      "The network side was configured on Cisco IOS: OSPF with authentication so only trusted routers join, VLANs with router-on-a-stick, and ACLs so only permitted subnets can reach the server. The whole system was demonstrated live in the lab.",
    ],
    highlights: [
      "AES-256 encryption with PBKDF2 key derivation",
      "SHA-256 integrity check before anything is stored",
      "Authenticated OSPF, VLAN segmentation and ACLs",
    ],
    categories: ["cybersecurity", "networking", "university"],
    status: "completed",
    tech: ["Python", "AES-256", "SHA-256", "OSPF", "VLANs", "ACLs", "Cisco IOS"],
    image: null,
    imageAlt: "",
    links: { repo: "https://github.com/xytex-s/Client-and-Server-Applications", demo: null },
    year: "2026",
  },
  {
    id: "pyftpx",
    title: "PyFTPX: file transfer over UDP",
    summary:
      "A file transfer protocol I'm designing and building in Python: TCP-style reliability on top of UDP, with chunking, acknowledgements, retransmission and hash-checked delivery.",
    description: [
      "PyFTPX started with a written specification before any code: a 24-byte binary header, frame types for the handshake, data, acknowledgements and errors (HELLO, OFFER, ACCEPT, DATA, ACK, NACK, FIN, ABORT), and state machines for the sender and receiver.",
      "The implementation sends files in chunks with a sliding window of 64, repairs gaps with NACKs, and refuses to accept a file unless its SHA-256 hash matches the one announced at the start. A smoke test and a pytest suite check transfers end to end. Next on the list are an adaptive retransmission timer, resumable transfers and an authenticated encryption mode.",
    ],
    highlights: [
      "Protocol specification written first (v0.1 draft)",
      "Sliding-window transfer with NACK-based gap repair",
      "SHA-256 integrity check on every file",
    ],
    categories: ["networking", "software", "research"],
    status: "in-progress",
    tech: ["Python", "UDP", "pytest"],
    image: null,
    imageAlt: "",
    links: { repo: "https://github.com/xytex-s/PyFTPX", demo: null },
    year: "2026",
  },
  {
    id: "student-support-chatbot",
    title: "Student support chatbot",
    summary:
      "Group project: a chatbot that answers Sheffield Hallam student support questions from university web pages, using only local open-source models on three Linux VMs.",
    description: [
      "A retrieval-augmented generation (RAG) chatbot for the Enterprise Applications Management module. It answers student support questions from 144 saved university pages and links the page each answer came from. Student questions never leave our own servers: no third-party AI API is used.",
      "I built the Python backend: collecting the pages (273 searchable chunks), the search index (right page first for 11 of 12 test questions, 11 ms per search), answer generation, and a Flask API that streams answers as they are written. I tested two model sizes on real questions and chose Qwen2.5-1.5B (8 of 12 correct, against 1 of 12 for the smaller model), then packaged it in Docker behind Gunicorn and Nginx across Proxmox VMs, with keepalived for failover.",
    ],
    highlights: [
      "Search index: right page first for 11 of 12 test questions",
      "Streaming Flask API, Dockerised, behind Nginx",
      "Model chosen by testing, not by guesswork",
    ],
    categories: ["software", "university"],
    status: "in-progress",
    tech: ["Python", "Flask", "Docker", "Nginx", "Gunicorn", "Qwen2.5", "Proxmox"],
    image: null,
    imageAlt: "",
    outcomes: [
      "Planning and deploying virtualised systems (Proxmox VMs, Docker) with failover for resilience",
      "Choosing and justifying tools and platforms against real requirements, such as picking the language model by testing",
      "Working as part of a team on a virtualised enterprise application",
    ],
    links: { repo: "https://github.com/xytex-s/EAM-AI-Chatbot", demo: null },
    year: "2027",
  },
  {
    id: "sql-server-azure",
    title: "SQL Server and Azure database project",
    summary:
      "Group project: migrating a retail company's Access database to SQL Server and Azure, then adding automation, auditing, security roles and backups.",
    description: [
      "For the Database Administration module, our group moved a bike retailer's Access database into SQL Server and compared alternative migration strategies. We then wrote stored procedures, built an audit table with triggers that record every change to sales lines, and set up SQL Server roles to control access.",
      "We also planned backup and restore strategies, recreated the database in Azure SQL using Azure Data Studio, and ran SQL Server in Docker, weighing up the trade-offs of cloud and container hosting in the report.",
    ],
    highlights: [
      "Audit triggers recording changes to sales data",
      "Role-based access with SQL Server roles",
      "Same database deployed to Azure and to Docker",
    ],
    categories: ["university", "cybersecurity", "software"],
    status: "completed",
    tech: ["SQL", "SQL Server", "Microsoft Azure", "Docker"],
    image: null,
    imageAlt: "",
    links: { repo: false, demo: null }, // no public repo
    year: "2026",
  },
  {
    id: "home-lab",
    title: "Home lab",
    summary:
      "A home lab for practising network defence, self-hosting and detection outside coursework. Parts arrive over Christmas; this entry will grow with it.",
    description: [
      "A home lab I'm building from early 2027, so I can keep practising network monitoring, intrusion detection and Linux administration on my own hardware after the university labs.",
      // Add the hardware, what you run on it and what you've learned as it comes together.
    ],
    highlights: [],
    categories: ["networking", "other"],
    status: "planned",
    tech: [], // add as you build: e.g. "Proxmox", "pfSense", "Security Onion"
    image: null,
    imageAlt: "",
    links: { repo: false, demo: null },
    year: "2027",
  },
];
