# Cyber security portfolio

A personal portfolio site for GitHub Pages. Plain HTML, CSS and JavaScript (ES modules): no framework, no build step, no dependencies to install. All content lives in small data files, so adding a project means adding one entry to a list.

- Sections: hero, about, projects (filterable, with detail views), cybersecurity tools, skills, research and university work, contact
- Dark theme by default, with a light theme toggle that's remembered
- Responsive from 320px up, keyboard accessible, respects reduced-motion settings
- Strict Content-Security-Policy, no third-party requests, no cookies, no tracking

---

## Quick start

You need any static file server. Python is the easiest:

```bash
cd portfolio
python3 -m http.server 8000
```

Open <http://localhost:8000>. (Opening `index.html` directly from disk won't work: browsers block ES modules on `file://` URLs.)

To see every placeholder still on the page, open <http://localhost:8000/?audit>. To list them with file names:

```bash
node scripts/audit.mjs
```

---

## Project structure

```
.
├── index.html              Page skeleton, metadata, Content-Security-Policy
├── 404.html                Self-contained "not found" page
├── favicon.svg             Monogram icon
├── data/                   ← everything you'll normally edit
│   ├── site.js             Name, headline, intro, about, education, SEO
│   ├── projects.js         Projects and project categories
│   ├── tools.js            Cybersecurity tools
│   ├── skills.js           Skill groups
│   ├── research.js         University work and write-ups
│   └── social-links.js     Email, GitHub, LinkedIn, other profiles
├── assets/
│   ├── css/main.css        All styles (design tokens at the top)
│   ├── js/main.js          Entry point: loads data, renders sections
│   ├── js/sections/        One renderer per section
│   ├── js/ui/              Navigation, theme, toast, audit overlay
│   ├── js/lib/             DOM helpers, icons, shared content helpers
│   ├── fonts/              IBM Plex Sans and Mono (self-hosted, OFL)
│   └── img/                Icons, social preview image, your screenshots
├── scripts/audit.mjs       Placeholder checker (also runs on deploy)
├── .github/workflows/      GitHub Pages deployment
├── .well-known/security.txt  Security contact (RFC 9116)
├── robots.txt, sitemap.xml, site.webmanifest
└── .nojekyll               Tells GitHub Pages to serve files as they are
```

---

## Replacing placeholder information

Placeholders are `null` values in the data files. On the site they appear as dashed "to add" markers, so nothing fake is ever shown. Work through this list (or just run `node scripts/audit.mjs`):

| What | Where |
| --- | --- |
| Surname (optional) | `data/site.js` → `name.last`. Leave as `null` to show only your first name |
| Photo (optional) | Off by default. To add one later, put a square JPG in `assets/img/` and set `about.photo` in `data/site.js` |
| Graduation date | `data/site.js` → `about.education.graduation` |
| Email address | `data/social-links.js` → `contact.email` |
| GitHub and LinkedIn URLs | `data/social-links.js` → `socialLinks` |
| Project details, tech, repo links, status | `data/projects.js` (lines marked `PLACEHOLDER` or `CHECK`) |
| Tool details and links | `data/tools.js` |
| Research outcomes and links | `data/research.js` |
| Title, description, JSON-LD | `<head>` of `index.html` (marked `EDIT`) |
| Email and expiry date | `.well-known/security.txt` |
| Home link (project sites only) | `404.html` (see below) |

**Check every status.** All projects start as `"in-progress"` because nothing here should claim a project is finished unless it is. Change a project to `"completed"` when it's done, or `"planned"` if you haven't started it.

**The bio is a draft.** `data/site.js` has a first-person About section drafted from your background. Rewrite it in your own words: recruiters can tell.

**Assessed coursework.** Before linking a university report, check your module's rules. Some don't allow assessed work to be published. A summary of what you did and learned (like the entries in `research.js`) is usually fine.

---

## Adding content

### A project

Copy an entry in `data/projects.js` and edit it:

```js
{
  id: "zeek-log-triage",                // unique, used in links: /#project=zeek-log-triage
  title: "Zeek Log Triage",
  summary: "One or two sentences for the card.",
  description: [
    "First paragraph of the full write-up.",
    "Second paragraph.",
  ],
  highlights: ["Optional bullet point", "Another one"],
  categories: ["cybersecurity", "networking"],  // see CATEGORIES at the top of the file
  status: "completed",                  // "completed" | "in-progress" | "planned"
  tech: ["Python", "Zeek"],             // same spelling as skills.js
  image: "assets/img/projects/zeek-triage.png",  // or null
  imageAlt: "Terminal showing grouped Zeek connection logs",
  links: { repo: "https://github.com/you/zeek-triage", demo: null },
  year: "2027",
  featured: true,                       // optional: shows first
},
```

Categories with no projects are hidden from the filter bar automatically. Every project gets its own shareable link: `https://your-site/#project=<id>`.

**Screenshots:** 16:9 or wider, around 1280px wide, saved as PNG/JPG/WebP in `assets/img/projects/`. Without one, the card shows a generated "traffic" pattern unique to that project.

### A tool

Add an entry to `data/tools.js`. Set `icon` to a square SVG/PNG path, or leave it `null` and set `glyph` to one or two characters for a generated tile. Delete the `next-utility` entry when you have a real one to replace it.

### A skill

Add a string to a group in `data/skills.js`, or add a new group. If a skill is spelled the same as something in a project's `tech` list, it gets a marker and links to those projects. There are no percentages or ratings on purpose.

### Research or university work

Add an entry to `data/research.js`. `images` takes `[{ src, alt }]`, and `links` takes `[{ label, url }]`.

### Social profiles

`data/social-links.js` supports these icons: `github`, `linkedin`, `mail`, `tryhackme`, `hackthebox`, `x`, `mastodon`, `globe`. Entries marked `optional: true` are hidden until you add a URL.

---

## Deploying to GitHub Pages

### 1. Create the repository

For the cleanest URL, name the repository **`<your-username>.github.io`**. The site will then live at `https://<your-username>.github.io/`.

Any other name works too (e.g. `portfolio`), and the site will live at `https://<your-username>.github.io/portfolio/`. All asset paths are relative, so nothing else changes, except the 404 page (see below).

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### 2. Turn on Pages

In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The included workflow (`.github/workflows/deploy.yml`) then runs on every push to `main`. It checks the data files load (a typo in `projects.js` stops the deploy rather than publishing a broken site), lists any remaining placeholders as a warning, and publishes the site. The first deploy takes a minute or two; the URL appears under **Actions** and in **Settings → Pages**.

**Alternative without Actions:** choose **Source: Deploy from a branch**, branch `main`, folder `/ (root)`. This works because the site has no build step; you just lose the pre-deploy check.

### 3. Project sites only: fix the 404 home link

If your site is at `https://<user>.github.io/<repo>/`, open `404.html` and change both `href="/"` values to `href="/<repo>/"`. GitHub Pages serves `404.html` for missing URLs at any depth, which is why it can't use relative links.

### 4. Optional: custom domain

1. Buy a domain and add DNS records at your registrar: four `A` records for the apex domain pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and/or a `CNAME` record for `www` pointing to `<your-username>.github.io`.
2. In **Settings → Pages → Custom domain**, enter the domain and save. (With the Actions source, the setting lives here rather than in a `CNAME` file.)
3. Tick **Enforce HTTPS** once the certificate is issued.
4. Update the URLs in `data/site.js`, `index.html`, `robots.txt` and `sitemap.xml`.

Check GitHub's current documentation for the IP addresses before you add them; they rarely change but GitHub is the source of truth.

---

## SEO and social previews

- `index.html` contains the title, description, Open Graph tags and JSON-LD `Person` data. Update the lines marked `EDIT`.
- Social networks need an **absolute** image URL. Once you know your site URL, change `og:image` to e.g. `https://<user>.github.io/assets/img/og-image.png`.
- `assets/img/og-image.png` is a 1200×630 preview card. Replace it with your own if you like (same size).
- After deploying, add the site in Google Search Console and submit `sitemap.xml` if you want it indexed quickly.

---

## Design notes

The visual identity is built around network traffic rather than generic "hacker" imagery:

- **Hero:** a TCP handshake between the visitor and the site. It plays once on load (and is static with reduced motion). The final packet carries your availability status.
- **Project covers:** without a screenshot, each project gets a deterministic "traffic signature", bars like packet sizes over time, seeded from its id.
- **Colour:** deep navy (`#0a1322`) with a signal-cyan accent (`#5ad7e3`). Green, amber and grey are used only for status (completed, in progress, planned), never as decoration.
- **Type:** IBM Plex Sans for everything, IBM Plex Mono only where content is technical data (packets, flags, generated tiles).
- **Motion:** one orchestrated moment (the handshake). Everything else moves only in response to you: filtering, opening a project, expanding an entry.

All tokens are CSS custom properties at the top of `assets/css/main.css`. The light theme is the `[data-theme="light"]` block.

---

## Security choices

Worth mentioning in an interview, since this is a security portfolio:

- **Content-Security-Policy** (`<meta>` in `index.html`): only same-origin scripts, styles, fonts and images; no inline scripts; `object-src 'none'`; `base-uri 'self'`. If you embed something external later, add its domain to the policy.
- **No `innerHTML` with data.** All content is built with `createElement`/`textContent`, so a stray `<script>` in a data file renders as text. Links are filtered to `http(s)`, `mailto` and relative URLs, which blocks `javascript:` URLs.
- **External links** use `rel="noopener noreferrer"`.
- **No third parties:** fonts are self-hosted; there are no analytics, CDNs or cookies. Theme preference is the only thing stored (in `localStorage`).
- **Email harvesting:** the address isn't in the HTML; it's inserted by JavaScript, which stops the simplest scrapers.
- **`security.txt`** (RFC 9116) tells anyone who finds a problem how to contact you.
- **The contact form** sends nothing itself: it composes a `mailto:` link, so there is no endpoint to abuse.

---

## Testing checklist

Already checked in headless Chrome at 320, 390, 768, 1024 and 1440px, at the site root and under a sub-path:

- [x] Every navigation link and in-page anchor resolves
- [x] Active section highlighting, mobile menu open/close (and Esc)
- [x] No console errors, CSP violations or failed requests
- [x] All category filters return the right counts; skill → project filtering
- [x] Project detail view, Esc to close, shareable `#project=` links
- [x] Research entries expand
- [x] Theme toggle and persistence; reduced-motion mode
- [x] Copy-email button and `mailto:` composer (with a test address)
- [x] No horizontal overflow at any width
- [x] 404 page

After you fill in your details, re-run `node scripts/audit.mjs` and click through once on your phone.

---

## Licence

Code: yours to use and change. IBM Plex fonts: SIL Open Font License 1.1 (`assets/fonts/OFL-LICENSE.txt`).

---

## Using ethan-m.dev

The site URL is already set to `https://ethan-m.dev/` in `data/site.js`, `index.html`, `robots.txt`, `sitemap.xml` and `security.txt`. After buying the domain:

1. Push the repo and turn on Pages (see "Deploying to GitHub Pages").
2. In the repository's **Settings → Pages → Custom domain**, enter `ethan-m.dev` and save. GitHub shows the DNS records to add.
3. At your registrar (or Cloudflare, if you move DNS there for Email Routing), add the four `A` records and the `www` `CNAME` from step 4 of the deployment section.
4. Wait for the DNS check to pass, then tick **Enforce HTTPS**. `.dev` domains only work over HTTPS, so the site won't load until this is done.
5. Optional but recommended: verify the domain under your GitHub account (**Settings → Pages → Add a domain**) so nobody else can claim it for their Pages site.
