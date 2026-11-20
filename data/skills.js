/**
 * Skills, grouped by category. No ratings or percentages on purpose:
 * instead, any skill that matches a project's `tech` list links to that
 * project, so the evidence does the talking.
 *
 * Keep spelling identical to the `tech` arrays in projects.js for the link
 * to work (matching ignores upper/lower case).
 */
export const skills = [
  {
    group: "Cybersecurity",
    items: [
      "Network Security",
      "Vulnerability Assessment",
      "Network Monitoring",
      "Intrusion Detection",
      "Reconnaissance",
      "Security Analysis",
    ],
  },
  {
    group: "Networking",
    items: ["TCP/IP", "DNS", "DHCP", "Wireshark", "Nmap"],
  },
  {
    group: "Security tools",
    items: ["Security Onion", "Suricata", "Zeek", "Burp Suite", "Metasploit", "Kali Linux"],
  },
  {
    group: "Programming and development",
    items: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Git", "GitHub"],
  },
  {
    group: "Systems and cloud",
    items: [
      "Linux",
      "Windows",
      "Virtualisation",
      "Microsoft Azure",
      "Raspberry Pi",
      "Self-hosted services",
    ],
  },
];
