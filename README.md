<title>RelVoca — Local Site Build</title>

# RelVoca — local site build

A local, static site built on an HTTrack capture of `www.voiceflow.com`
(**2–3 September 2026**), repaired so it browses without a network connection
and then **rebranded to RelVoca** on 5 September 2026.

> ## Scope and legal notice
>
> **This tree is no longer a faithful archive.** It began as an offline
> archival copy of a third-party website and has since been modified: the
> Voiceflow brand name was replaced with RelVoca throughout the visible copy,
> the wordmark and icons were replaced, and links to Voiceflow's own product
> hosts now point at first-party pages in this tree.
>
> Voiceflow still owns the underlying content, code, layout and imagery. Nothing
> here was authored by this project apart from the pages and scripts listed
> under *First-party additions* below. Renaming the brand does not transfer any
> rights. **Do not publish this tree, host it on a public origin, serve it under
> any domain, or redistribute it.** The only sanctioned use is reading it
> locally, on the machine that holds it.
>
> If you need the unmodified capture, every file this project changed is
> preserved byte-for-byte in `_quarantine/pre-rebrand/`.
>
> Repairs to *layout and serving* still follow the archive rules: pages are
> never relocated, and paths are never "tidied". See `tools/ROUTES.md`.

---

## First-party additions

Authored by this project, not part of the capture:

| Path | What it is |
|---|---|
| `www.voiceflow.com/login` | Login page — twin of the captured `/signup` layout |
| `www.voiceflow.com/dashboard` | Product shell replacing `creator.voiceflow.com` |
| `www.voiceflow.com/status` | Service status board replacing `status.voiceflow.com` |
| `www.voiceflow.com/trust` | Trust centre replacing `trust.voiceflow.com` |
| `www.voiceflow.com/js/relvoca-auth.js` | Demo session state (localStorage only, no server) |
| `www.voiceflow.com/js/relvoca-verify.js` | "Check your email" 6-digit code step, shared by login and signup |
| `www.voiceflow.com/images/logo.svg` | RelVoca wordmark (overwrote the Voiceflow one) |
| `www.voiceflow.com/favicon.png`, `webclip.png` | RelVoca icons |

### Rebrand tooling

Each script is re-runnable and backs originals up to `_quarantine/pre-rebrand/`
before its first write.

```sh
node tools/rebrand.js --dry   # Voiceflow -> RelVoca in visible text only
node tools/make-logo.js       # regenerate the wordmark SVGs
node tools/swap-logo.js       # replace the inline nav wordmark (560 pages)
node tools/make-favicon.js    # rasterise favicon.png / webclip.png
node tools/make-pages.js      # build signup / login / dashboard / status / trust
node tools/delink.js --dry    # product links -> local pages
node tools/inject-auth.js     # load relvoca-auth.js on pages with the nav
```

`rebrand.js` rewrites text nodes and a whitelist of prose attributes only. It
never touches `href`/`src`, hashed asset names, CSS tokens or class names, so
the rebrand cost zero reference churn — verified by comparing every URL-bearing
attribute before and after.

**What was deliberately *not* rebranded:** the on-disk directory
`www.voiceflow.com/` (renaming it breaks thousands of relative links — see
`tools/ROUTES.md`) and the string `voiceflow.com` wherever it appears, including
in visible prose and docs code samples. Roughly 2,000 such mentions remain.

---

## Quick start

```sh
node tools/serve.js          # http://localhost:8080
```

No dependencies, no build step, no install — Node's standard library only.

---

## Deploying to Vercel

This repository **is** the deployment: it tracks the built `public/` directory,
not the capture sources. Vercel serves it directly with no build step.

**From GitHub (how it is set up):** import the repo at
[vercel.com/new](https://vercel.com/new). `vercel.json` already sets
`outputDirectory: public` and `framework: null`, and `package.json` deliberately
has no `build` script, so Vercel skips building and just serves the files. No
settings to fill in.

**Rebuilding after a change to the sources** (which live only on the machine
that built them):

```sh
npm run build:vercel     # regenerate public/  (~736 MB, 9,417 files)
npm run preview:vercel   # check it at http://localhost:8081
git add public && git commit && git push
```

**Deploying straight from the CLI instead**, without GitHub:

```sh
npx vercel deploy        # add --prod when you are happy
```

**Read the scope notice above before you deploy.** Publishing puts real named
individuals' testimonials and photographs on a site for a company they have
never heard of. The build ships `X-Robots-Tag: noindex, nofollow` and a
`robots.txt` disallow by default for that reason; both are one edit away in
`tools/build-vercel.js` if you decide otherwise.

### How the build works

`tools/serve.js` resolves URLs with logic Vercel has no equivalent for: three
roots, three candidates each, MIME sniffing, and 302s for section roots. The
build collapses that into a plain tree plus a generated `vercel.json`:

| serve.js behaviour | how the build reproduces it |
|---|---|
| mirror root, then project root | one flat tree; host dirs copied first, mirror second so it shadows them |
| `<name>.html` fallback | 555 extensionless pages written as `<name>.html` + `cleanUrls: true` |
| MIME sniffing | 4 extensionless non-pages get an explicit `Content-Type` header |
| `/docs` third base | 9 rewrites, one per docs section |
| section-root 302s | 14 generated `redirects` |

Two deliberate choices worth keeping:

- **Docs sections whose name also exists at the site root are skipped.** A
  `/images/:path*` → `/docs/images/:path*` rewrite would sit in front of 294 MB
  of marketing images. Vercel does check the filesystem before rewrites, so it
  would probably be fine — but no docs page emits a prefix-less `/images` ref,
  so the rewrite buys nothing and the dependency is not worth taking.
- **The npm script is `build:vercel`, not `build`.** Vercel runs a `build`
  script whenever it finds one. That would fail here in either deploy mode: the
  capture sources it copies from are not in this repository, and for CLI deploys
  `.vercelignore` uploads only `public/` and `vercel.json`. Renaming this script
  to `build` breaks deployment.

### Size

736 MB across 9,417 files. The largest single file is 5.8 MB, so Vercel's 100 MB
per-file limit is not a concern, but check the total against your plan's limits
before the first deploy. If you need it smaller, `/docs` plus its images
(`mintcdn.com/`) is 354 MB — 43% of the deployment — and dropping it is the only
change that moves the number materially. Marketing images are 294 MB, of which
95 MB are `srcset` variants that responsive layouts genuinely use.

```sh
PORT=9000 node tools/serve.js               # different port
node tools/serve.js <mirrorRoot> <project>  # override both roots
```

Via npm scripts:

```sh
npm run serve     # node tools/serve.js
npm run audit     # rebuild tools/audit-report.json
npm run verify    # audit, then fail if broken refs exceed the recorded baseline
```

---

## Provenance

| | |
|---|---|
| Origin | `https://www.voiceflow.com/` |
| Tool | HTTrack Website Copier |
| Capture window | 2026-09-02 19:50 → 2026-09-03 10:55 (local file mtimes) |
| Crawl log | `_quarantine/httrack-debris/hts-log.txt` |
| Raw response cache | `_quarantine/httrack-debris/hts-cache/new.zip` — 9,531 entries, 52 MB |
| Cross-origin hosts also captured | `mintcdn.com`, `js.hsforms.net`, `prod-assets.sequelvideo.com`, `www.googletagmanager.com` |

The origin is an Astro build (hashed `_astro/` bundles) fronting Webflow-era CMS
assets (24-hex asset-id filenames under `/images/`), plus a Mintlify-hosted
`/docs` section whose media is served from `mintcdn.com`.

`hts-cache/new.zip` is the crawl's raw response cache and is the **only
sanctioned offline source for recovering a page HTTrack failed to write to
disk** — no network fetch is ever required or permitted. Several landing pages
were restored from it (see *What was repaired*).

HTTrack's own launcher page and progress graphics — `index.html`,
`backblue.gif`, `fade.gif` at the **project root** — are crawler furniture, not
site content.

---

## Directory layout

```
VoiceFLow/
├── README.md                       this file
├── package.json                    scripts + recorded audit baseline (no deps)
├── .gitignore
├── index.html, backblue.gif,       HTTrack launcher furniture — NOT site content
│   fade.gif
│
├── www.voiceflow.com/              ← primary document root (546 MB)
│   ├── index.html                  site home page
│   ├── blog.html, stories.html,    restored section landing pages, at root
│   │   events.html, industries.html,   because URL depth must be preserved —
│   │   integrations.html,              see tools/ROUTES.md
│   │   solutions.html,
│   │   contributors.html,
│   │   blog-category.html
│   ├── about, ai, ai-agents,       extensionless pages, exactly as the origin
│   │   customer-stories, demo,     served them
│   │   pricing, privacy, signup
│   ├── _astro/                     hashed CSS/JS/asset bundles (28 files)
│   ├── api/index.html              the one directory with a real index
│   ├── blog/                       256 blog posts (extensionless)
│   ├── blog-category/              8 category pages
│   ├── contributors/               45 author pages
│   ├── docs/                       193 MB Mintlify docs mirror (1,406 files)
│   ├── events/                     21 event pages (+ crawler-debris filenames)
│   ├── features/                   4 product pages
│   ├── images/                     5,142 files / 294 MiB — see below
│   ├── industries/                 10 vertical pages
│   ├── integrations/               8 integration pages
│   ├── js/                         first-party scripts (vf-cta, vf-dev, vf-qualify)
│   ├── legal/                      dpa, dpa8bc1, gdpr, security, terms
│   ├── og/, solutions/, stories/, stories-categories/
│   └── favicon.png, webclip.png, voiceflow_ogimage.png, voiceflow-open-graph-2026.png
│
├── mintcdn.com/                    131 MB  docs CDN assets (2,093 files)
├── js.hsforms.net/                 596 KB  HubSpot forms v2.js
├── prod-assets.sequelvideo.com/    792 KB  Sequel video toolkit
├── www.googletagmanager.com/       4 KB    gtm5445.html
│
├── tools/
│   ├── serve.js                    zero-dependency static server
│   ├── audit.js                    static reference auditor
│   ├── verify.js                   regression gate against the baseline
│   ├── ROUTES.md                   ⚠ read before "tidying" any path
│   ├── fetch-missing.js            ⚠ makes LIVE network calls — do not run
│   ├── fetch-manifest.json         978 URLs the crawl never captured (tracked)
│   ├── audit-report.json           generated; git-ignored
│   └── 404s.txt                    generated on server exit; git-ignored
│
└── _quarantine/                    55 MB of removed crawler debris — git-ignored,
                                    kept on disk for provenance and recovery
```

### Sibling host directories are *siblings*, not children

`mintcdn.com/`, `js.hsforms.net/`, `prod-assets.sequelvideo.com/` and
`www.googletagmanager.com/` sit **beside** `www.voiceflow.com/`, not inside it —
that is how HTTrack lays out a multi-host crawl. The server handles this with a
two-tier root (below), so they remain reachable without moving a single file.

---

## How the server resolves a URL

`tools/serve.js` is a single-file static server. It tries **two roots in order**
— the mirror root `www.voiceflow.com/`, then the project root — and within each
root tries **three candidates in order**:

1. the exact file — `/legal/terms` → `www.voiceflow.com/legal/terms`
2. `<name>.html` — `/blog` → `www.voiceflow.com/blog.html`
3. `<dir>/index.html` — `/api` → `www.voiceflow.com/api/index.html`

The mirror root keeps all 2,634 root-relative refs (`/demo`, `/images/…`)
working untouched. The project-root fallback is what makes `/mintcdn.com/…`
resolve, which is how the 2,639 `../mintcdn.com/…` relative refs in the docs
pages find their assets — a browser normalises that `../` to a root path.

The server also sniffs the first 512 bytes of extensionless files and forces
`text/html` when they open like a document. Without this, Node would send
`application/octet-stream` and the browser would download `/pricing` instead of
rendering it.

On `SIGINT`/`SIGTERM` it prints a tally of every 404 it served and writes
`tools/404s.txt` — the fastest way to see what a browsing session actually
needed.

**Both the root order and the candidate order are load-bearing. Read
`tools/ROUTES.md` before moving, renaming, or "cleaning up" anything.**

---

## Auditing and the baseline

`tools/audit.js` walks every HTML/CSS/JS/JSON/XML file, extracts every `href`,
`src`, `poster`, `data-src`, `srcset`, `url(…)`, `fetch(…)` and `import(…)`
reference, and resolves each one against disk using *the same rules the server
uses*. It classifies every reference as ok / missing / external / dynamic and
writes `tools/audit-report.json`.

Current state:

| Metric | Value |
|---|---|
| Files scanned | 1,324 |
| References found | 141,899 |
| Resolved OK | 109,941 |
| **MISSING (baseline)** | **2,503 refs across 1,409 distinct targets** |
| Distinct external hosts still referenced | 431 |

Missing references by kind: 1,561 path-relative, 901 root-relative, 41
absolute-to-a-mirrored-host. Repair work took MISSING from 10,601 → 3,778 →
2,503; the history is recorded in `package.json`.

`npm run verify` re-runs the audit and exits non-zero if `missingTotal` rises
above the baseline recorded in `package.json` under
`voiceflowArchive.baselineMissing`.

> **Any change to this tree must leave MISSING the same or lower.** If a change
> makes it worse, revert the change — do not raise the baseline. Lower the
> baseline deliberately, in the same commit, when a repair genuinely fixes
> references.

---

## What was repaired

All of this is placement and serving work. **No page body was edited.**

- **Section landing pages restored.** The crawl captured each section's children
  but failed to write several parent listing pages to disk, even though it had
  fetched them. Seven pages were placed at the mirror root as `<name>.html`,
  where the server's second resolution rule picks them up. Five are
  **byte-identical to entries in `hts-cache/new.zip`**, which is verifiable
  offline and is the provenance this archive relies on:

  | File | Bytes | Matching cache entry |
  |---|---:|---|
  | `stories.html` | 392,387 | `https://www.voiceflow.com/stories` |
  | `industries.html` | 76,403 | `https://www.voiceflow.com/industries` |
  | `integrations.html` | 78,562 | `https://www.voiceflow.com/integrations` |
  | `solutions.html` | 94,343 | `https://www.voiceflow.com/solutions` |
  | `events.html` | 58,691 | `https://www.voiceflow.com/events` |

  The other two — `blog-category.html` and `contributors.html` — do **not**
  correspond to a cache entry for their own URL; see *Known limitations*.
  Together these fixed roughly 6,800 broken references: MISSING fell from
  10,601 to 3,778.
- **`/blog` restored.** HTTrack wrote the blog landing page as `blog893e.orig`,
  a name no URL could reach, while `blog/` held the 256 posts. It was copied to
  `www.voiceflow.com/blog.html`, byte-identical to the quarantined original
  (sha256 `241aecf9…d94748f`). It stays at the mirror root because its 569
  **path-relative** references (`blog/ada`, `about`, `_astro/…`) assume depth 0.
  See `tools/ROUTES.md`.
- **Sibling host mirrors made reachable** by giving the server a project-root
  fallback, rather than by relocating 131 MB of CDN assets under the mirror root.
- **Crawler debris quarantined.** ~55 MB moved out of the served tree into
  `_quarantine/httrack-debris/`: HTTrack's `hts-cache/`, `hts-log.txt`,
  `cookies.txt`, and stray fragments the crawler emitted from inline JavaScript
  (`api.html`, `cm[1].html`, `e,location.href.html`, `pm.html`, `proton.html`,
  `demo7615`). Retained rather than deleted, so the capture stays auditable —
  and, as it turned out, so the landing pages above could be recovered.
- **Extensionless pages made viewable** through content sniffing in `serve.js`.

---

## Known limitations

Properties of the capture, not bugs in the tooling. Most are not fixable
offline.

**`/blog-category` currently serves the wrong page.** `blog-category.html`
(610,100 B) is a *second, later capture of the Blog index* — its `<title>` is
"Blog | Voiceflow" and its canonical is `https://www.voiceflow.com/blog`. The
HTTrack cache contains no `/blog-category` entry at all, so the real category
landing page was never captured and cannot be recovered offline. The file is
left in place (removing it would be a mirror edit and would raise MISSING), but
**treat `/blog-category` as unreliable**. `contributors.html` carries a correct
title and canonical but likewise has no cache entry; its provenance is
unverified.

**`tools/fetch-missing.js` makes live network requests.** It builds a
978-URL manifest (921 `mintcdn.com` assets, 22 docs bundles, 8 listing pages,
and others) and, without `--dry-run`, calls `fetch()` against the live origin.
That conflicts with this archive's offline-only rule and would mix
2026-09-04-or-later bytes into a 2026-09-02/03 capture, silently destroying the
provenance guarantee. **Do not run it.** Treat
`tools/fetch-manifest.json` as a record of what is *absent*, not as a fetch
plan; recover pages from `hts-cache/new.zip` instead. The manifest is kept in
version control precisely because it documents the gaps.

**Bare `/docs`, `/features`, `/legal` and `/og` still 404.** These are
directories with no captured index. The cache confirms why for `/docs`: its
entry is **0 bytes** — the fetch returned nothing. Their children all serve
correctly; only the bare parent path fails.

**Absolute cross-origin references still hit the network.** Mirror pages hold
7,922 absolute `https://mintcdn.com/…` references. The assets exist on disk and
resolve fine through the relative-path route, but an absolute URL bypasses the
local server entirely, so offline it simply fails. Rewriting them would mean
editing page bodies, which this archive does not do.

**Analytics is the single largest missing target.** 414 references to
`www.googletagmanager.com/gtag/js` remain unresolved (they carry `?id=…` query
strings that no captured file answers). Tracking is inert, which is the
desirable outcome for an archive.

**431 external hosts are referenced and were never mirrored:**
`d3gk2c5xim1je2.cloudfront.net` (2,822 refs — docs icon sprites),
`www.youtube.com` (1,806), `creator.voiceflow.com` (1,766),
`s3.amazonaws.com` (1,667), `fonts.googleapis.com` (1,656),
`www.linkedin.com` (1,313), and others. Expect fallback fonts, dead embeds, and
dead outbound links. Correct behaviour for an offline archive.

**A residue of crawler debris is permanently unresolvable** — currently 36 refs
across 15 groups, down from 895/173 before repair. HTTrack parsed JavaScript
template literals and escaped strings as links, producing targets like
`/docs/_next/static/chunks/e` and `${Wt.GetEmbedUrl(`. The origin never served
these. A few even became **filenames** on disk — `events/$&`, `events/$&.html`,
and two backtick-named files. They are left in place: deleting them would alter
the capture without fixing anything. This residue can never reach zero.

**⚠ Provenance is no longer uniform: 504 files in the mirror trees post-date
the capture window.** Most are benign repair output — 453 `.html` route aliases
under `docs/`, and 8 landing pages recovered from the HTTrack cache. But a
handful were fetched from the **live network on 2026-09-04**, a day after the
crawl:

```
www.googletagmanager.com/gtag/js, gtm.js, ns.html
www.voiceflow.com/_vercel/speed-insights/script.js, vitals
www.voiceflow.com/f5240b06061a5887/script.js, vitals
```

These are third-party analytics stubs, not site content, and they are small —
but they mean this tree is no longer a pure 2026-09-02/03 snapshot. Anyone
relying on the archive for provenance should exclude them. Do not repeat this:
recover from `hts-cache/new.zip`, never from the network.

**The `/docs` section is not interactive.** Its Next.js runtime chunks
(68 distinct `/docs/_next/static/chunks/*.js`, 641 refs) were not captured. Docs
pages render as static HTML; search, navigation state, and client-side routing
do not work.

**`legal/dpa8bc1` is an HTTrack de-duplication artifact** — a second capture of
the DPA page under a suffixed name. It is referenced once, from `legal/terms`,
so it must not be deleted.

**The project-root fallback exposes repository files.** `/README.md`,
`/tools/serve.js`, `/package.json` and `/_quarantine/…` are all fetchable from
`http://localhost:8080`. Harmless for a localhost archive tool, but do not bind
this server to a public interface.

**Dynamic endpoints are unfetchable by definition.** Anything under `/api/` is
server-side; a static mirror cannot hold it.

---

## The `www.voiceflow.com/images/` directory

**Do not reorganize this directory.** Every reference in the mirror points at
these exact flat paths. Adding subdirectories, renaming files, or de-duplicating
them would break thousands of references to reclaim roughly one percent of disk.
The audit gate exists partly to catch that mistake.

### Quantified

| Measure | Value |
|---|---|
| Top-level entries | **5,025** (5,021 files + 4 subdirectories) |
| Files including subdirectories | **5,142** |
| Total size | **308,010,255 bytes — 293.7 MiB** |
| Distinct content hashes (sha256) | 5,062 |

The four subdirectories are late additions that break the otherwise flat
namespace: `contributors/` (72 files, 3.8 MB), `demo/` (20, 644 KB),
`events/` (19, 1.0 MB), `integrations/` (10, 112 KB).

Formats:

| Format | Files | Size |
|---|---:|---:|
| `.webp` | 1,912 | 99.2 MiB |
| `.png` | 1,654 | 151.1 MiB |
| `.avif` | 1,333 | 25.3 MiB |
| `.jpeg` | 160 | 10.3 MiB |
| `.svg` | 54 | 0.3 MiB |
| `.mp4` | 17 | 6.1 MiB |
| `.jpg` | 12 | 1.3 MiB |

PNG is 32% of the files but 51% of the bytes — the origin kept unoptimized PNG
originals alongside its AVIF/WebP derivatives. The 17 `.mp4` files are an
origin-side quirk: short video loops filed under `/images/`.

### Duplicate content by hash

71 duplicate groups span 151 files: **89 redundant copies wasting 3,944,149
bytes (3.8 MiB, 1.3% of the directory)**. These are not crawl accidents — the
origin genuinely served identical bytes at several URLs. The largest groups are
headshots published three times over: once under a Webflow asset id, once under
`contributors/`, once under `events/speakers/`. For example:

```
659e94ba31f61697c40fa56b_64516de855e61712a3802278_braden-ream.jpeg
contributors/braden-ream.jpeg
events/speakers/braden-ream.jpeg      ← identical bytes, three live paths
```

De-duplicating reclaims 1.3% and breaks three reference paths per group. Not
worth it. Leave it.

### Why it is flat

Flatness is inherited from the origin, not an artifact of the mirror. Three
overlapping causes:

1. **Webflow CMS asset namespace.** 4,700 of the 5,021 top-level files carry a
   24-hex Webflow asset-id prefix, e.g.
   `659e94ba31f61697c40fa56b_…jpeg`. Webflow serves its whole asset library from
   one flat bucket — the id *is* the addressing scheme, so there is no directory
   structure to mirror. 3,306 of those carry **two** stacked ids: assets
   re-uploaded through a later migration, each pass prepending a new id. Only
   325 files are plainly human-named (`cover-blog-roi.png`,
   `logomark-white.svg`).

2. **Responsive derivative explosion.** 3,176 files are width variants of a
   parent image, generated at four breakpoints — 480w (866 files), 720w (866),
   1000w (844), 1400w (600) — named `<base>.<width>w.<ext>`. Collapse the width
   and format variants and only **1,847 distinct logical assets** remain behind
   the 5,142 files: roughly 2.8 files per real image. The count is a
   build-pipeline product, not disorganisation.

3. **Content-addressed names remove the need for folders.** When every filename
   is globally unique, a hierarchy buys nothing, so the origin never built one.

`/docs` maintains its own separate `docs/images/` tree, unrelated to this
directory; in practice docs media is served from `mintcdn.com`.

*(An earlier note put this directory at 5,027 entries; the measured figure is
5,025 top-level entries. Both refer to the same flat namespace.)*

---

## Rules for working in this tree

1. **Never edit mirror content.** No rebranding, renaming, rewording, or
   reformatting. Preserve original bytes.
2. **Never move an HTML file to a different directory depth** without rewriting
   its internal references — relative links assume the page's original depth.
   Prefer server-side routing or a root-level `<name>.html`. See
   `tools/ROUTES.md`.
3. **No network requests.** This is offline work. Recover from
   `hts-cache/new.zip` or not at all.
4. **Back up to `_quarantine/` before any bulk edit**, and verify the change on
   two or three files first.
5. **Run `npm run verify` after every change.** If MISSING rises, revert.
