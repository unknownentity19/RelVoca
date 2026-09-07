# ROUTES — path mappings this archive depends on

**Read this before moving, renaming, flattening, or "cleaning up" anything in
this tree.**

Every mapping below looks like an oddity worth tidying. None of them are. Each
one exists because the mirror's HTML is frozen — an archive preserves original
bytes, so a broken path must be fixed by *routing*, never by editing a page.
Undoing any of these silently breaks hundreds to thousands of references, and
the damage shows up only when someone browses the affected section.

The regression gate is `npm run verify`. It fails if broken references rise
above the baseline in `package.json`. Run it after any structural change.

---

## 0. The resolution algorithm

`tools/serve.js` resolves a URL path by trying **two roots**, and within each
root **three candidates**, in this exact order:

```
for base in [ www.voiceflow.com/ , <project root>/ ]:
    1. <base><path>                  exact file
    2. <base><path>.html             extensionless URL -> .html on disk
    3. <base><path>/index.html       directory index
```

First hit wins. **Both orders are load-bearing.**

### Why the candidate order matters

`<name>.html` is tried **before** `<dir>/index.html`. Several paths have *both*
a directory and a sibling `.html` file — `/blog` has `blog/` (256 posts) and
`blog.html` (the listing page). Reversing the order would make `/blog` fall into
the empty directory branch and 404. Any path that is both a page and a section
depends on `.html` winning.

### Why the root order matters

The mirror root is tried first so that the mirror's own content always shadows
project files. Reversing it would let a repository file at the project root
hijack a site path.

---

## 1. `/blog` → `www.voiceflow.com/blog.html` (at the mirror root)

**The single most fragile mapping in the archive. Do not move this file.**

HTTrack wrote the blog landing page to disk as `blog893e.orig` — a name no URL
can reach — while putting the 256 posts in `blog/`. The repair copied it to
`www.voiceflow.com/blog.html`, byte-identical to the quarantined original
(sha256 `241aecf912e5…d94748f`, still at
`_quarantine/httrack-debris/blog893e.orig`).

### Why it is at the root and not at `blog/index.html`

`blog.html` contains **569 path-relative references** and only one root-relative
one. They are written for a page served at depth 0:

```html
<a href="blog/ada">          <!-- a post -->
<a href="about">             <!-- a sibling page -->
<link href="_astro/Base.eanb2kJl.css">
```

Move the file to `blog/index.html` and the browser resolves those against
`/blog/`, giving `/blog/blog/ada`, `/blog/about`, `/blog/_astro/…`. All 569
break at once. The file must stay at the depth its own markup assumes.

This is the general rule for the whole archive:

> **Never relocate a mirror HTML file to a different directory depth.** Its
> relative links encode the depth it was captured at. Route to it instead.

---

## 2. Section landing pages → root-level `<name>.html`

The crawl captured each section's children but failed to write several parent
listing pages. Seven were restored at the mirror root:

| URL | File | Bytes | Provenance |
|---|---|---:|---|
| `/stories` | `stories.html` | 392,387 | byte-identical to cache entry |
| `/industries` | `industries.html` | 76,403 | byte-identical to cache entry |
| `/integrations` | `integrations.html` | 78,562 | byte-identical to cache entry |
| `/solutions` | `solutions.html` | 94,343 | byte-identical to cache entry |
| `/events` | `events.html` | 58,691 | byte-identical to cache entry |
| `/contributors` | `contributors.html` | 68,550 | ⚠ no cache entry — unverified |
| `/blog-category` | `blog-category.html` | 610,100 | ⚠ **wrong page** — see below |

"Cache entry" means `_quarantine/httrack-debris/hts-cache/new.zip`, HTTrack's
raw response archive — the only offline source for a page the crawl fetched but
failed to write.

Each sits beside a same-named directory holding its children
(`stories.html` + `stories/`), so candidate rule 2 resolves the landing page and
rule 1 resolves each child. Restoring these five fixed roughly 6,800 broken
references.

Unlike `blog.html`, these pages use **root-relative** references
(`/stories/foo`, `/images/…`), so they are not depth-sensitive. They still
belong at the root because that is the URL they answer — but the reason differs,
and that distinction matters if anyone ever reworks them.

### ⚠ `/blog-category` serves the wrong page

`blog-category.html` is a *second, later capture of the Blog index*: its
`<title>` is `Blog | Voiceflow` and its canonical is
`https://www.voiceflow.com/blog`. Its byte count matches the cache's
`https://www.voiceflow.com/blog` entry (610,100), not any `/blog-category`
entry — **the cache contains no `/blog-category` entry at all**, so the real
category landing page was never captured and cannot be recovered offline.

It is left in place because removing it would be a mirror edit and would raise
MISSING. Treat the route as unreliable, and do not cite it as evidence that
`/blog-category` was archived.

---

## 3. Extensionless pages are served as-is

These are files on disk with **no extension**, exactly as the origin served
them:

```
about   ai   ai-agents   customer-stories   demo   pricing   privacy   signup
```

Plus every child page under `blog/`, `stories/`, `solutions/`, `docs/`,
`legal/`, `contributors/`, `industries/`, `integrations/`, `events/`,
`features/`, `blog-category/`, `stories-categories/`.

Two consequences:

1. **Do not add `.html` extensions to them.** Candidate rule 1 already matches
   them exactly. Renaming `about` → `about.html` still resolves via rule 2, but
   it edits the capture for no gain and desynchronises the tree from
   `fetch-manifest.json` and the audit.
2. **The server must sniff their content type.** `serve.js` reads the first 512
   bytes and forces `text/html` when the file opens like a document. Without it
   Node sends `application/octet-stream` and the browser *downloads* `/pricing`
   instead of rendering it. Do not "simplify" `contentType()` down to an
   extension lookup.

---

## 4. `/api` → `api/index.html` — the only real directory index

`www.voiceflow.com/api/` is the sole directory in the mirror with an actual
`index.html`. It is the only route that depends on candidate rule 3. The rule
cannot be dropped, and this route is the only test coverage for it.

---

## 5. Sibling host mirrors resolve via the project-root fallback

HTTrack lays a multi-host crawl out as **sibling** directories, not nested ones:

```
VoiceFLow/
├── www.voiceflow.com/          <- mirror root (the web root)
├── mintcdn.com/                <- sibling, 131 MB, docs media
├── js.hsforms.net/
├── prod-assets.sequelvideo.com/
└── www.googletagmanager.com/
```

The docs pages reference CDN assets with **2,639 relative refs** shaped like:

```html
<img src="../mintcdn.com/voiceflow-009a8802/BH9pjWm_sH9INCep/images/steps/…">
```

A browser on `/docs/<page>` normalises that `../` to **`/mintcdn.com/…`** — a
root path that does not exist under the mirror root. The second root in the
resolution loop is what catches it: the request falls through to the project
root, where `mintcdn.com/` actually lives.

**This is why the fallback exists. Do not remove it**, and do not "fix" the
layout by moving the sibling hosts under `www.voiceflow.com/` — that would put
them at the wrong depth for those same `../` references and break all 2,639.

Two caveats:

- **Absolute refs still miss.** The same pages carry 7,922 absolute
  `https://mintcdn.com/…` references. Those bypass the local server entirely and
  fail offline, even though the bytes are on disk. Fixing them means rewriting
  page bodies, which this archive does not do.
- **The fallback exposes repository files.** `/README.md`, `/package.json`,
  `/tools/serve.js` and `/_quarantine/…` are all fetchable from
  `localhost:8080`. Acceptable for a local archive viewer; do not bind this
  server to a public interface.

---

## 6. Routes that legitimately 404 — leave them alone

These are directories with no captured landing page. Their **children serve
correctly**; only the bare parent path fails.

```
/docs      /features      /legal      /og
```

`/docs` is confirmed unrecoverable: its entry in the HTTrack cache is **0
bytes** — the fetch returned nothing.

Do not paper over these with a synthesised index page. A generated directory
listing is not archived content, and inventing one misrepresents what the
capture contains. A 404 is the honest answer.

---

## 7. Files that look like junk but must not be deleted

| Path | What it is | Why it stays |
|---|---|---|
| `legal/dpa8bc1` | HTTrack de-duplication suffix — a second capture of the DPA page | Referenced once, from `legal/terms` |
| `events/$&`, `events/$&.html` | Filenames HTTrack derived from a JavaScript template literal | Deleting alters the capture and fixes nothing |
| two backtick-named files under `events/` | Same cause | Same |
| `index.html`, `backblue.gif`, `fade.gif` at the **project** root | HTTrack's launcher page and progress graphics | Crawler furniture. Shadowed by `www.voiceflow.com/index.html` via root order, so harmless — but do not serve the project root alone, or `/` becomes the HTTrack launcher |

Roughly **895 "broken" references across 173 groups are crawler debris, not real
URLs** — HTTrack parsing JS template literals and escaped strings as links
(`…/&quot;https:/…`, `/docs/_next/static/chunks/e`, `${Wt.GetEmbedUrl(`). They
can never be resolved. Do not chase them; they inflate the MISSING count
permanently and that is expected.

---

## 8. `www.voiceflow.com/images/` — 5,142 files in one flat namespace

**Do not reorganise, rename, or de-duplicate this directory.**

It looks like an obvious cleanup target: 5,025 top-level entries, 294 MiB, no
hierarchy, filenames like
`659e94ba31f61697c40fa56b_64516de855e61712a3802278_braden-ream.jpeg`.

It is flat because **the origin was flat**. 4,700 of the 5,021 top-level files
carry a 24-hex Webflow asset-id prefix; Webflow serves its entire asset library
from a single bucket where the id *is* the addressing scheme. A further 3,176
files are responsive width variants (`.480w.`, `.720w.`, `.1000w.`, `.1400w.`)
of only 1,847 distinct logical assets.

Every reference in the mirror points at these exact paths. There are also **71
groups of byte-identical duplicates** (89 redundant copies, 3.8 MiB, 1.3% of the
directory) — for example one headshot living at all three of:

```
659e94ba31f61697c40fa56b_64516de855e61712a3802278_braden-ream.jpeg
contributors/braden-ream.jpeg
events/speakers/braden-ream.jpeg
```

Those are not crawl errors; the origin served the same bytes at three URLs.
De-duplicating reclaims 1.3% of the directory and breaks three live reference
paths per group. Full quantification is in the README.

---

## 9. Recovering a missing page — the only sanctioned procedure

1. **Never fetch from the network.** This is a frozen 2026-09-02/03 capture.
   Mixing in later bytes destroys the provenance guarantee that makes the
   archive worth keeping.
2. Look for the URL in `_quarantine/httrack-debris/hts-cache/new.zip`
   (9,531 entries, HTTrack's raw response cache):
   ```sh
   unzip -l _quarantine/httrack-debris/hts-cache/new.zip \
     | grep 'voiceflow\.com/<path>$'
   ```
3. If present, extract it **byte-for-byte** and place it so its URL resolves
   *without changing its depth* — normally a root-level `<name>.html`.
4. Record the recovery, then run `npm run verify`. MISSING must fall. If it
   rises, revert.

> ⚠ **`tools/fetch-missing.js` calls the live network** (`fetch()`), despite
> living beside the offline tooling. Its 978-entry `fetch-manifest.json` is
> useful as a record of *what is absent*; it is not a fetch plan. Do not run
> the script without `--dry-run`.

---

## Checklist before any structural change

- [ ] Does the file's HTML use **path-relative** refs? If so, its depth is fixed.
- [ ] Is there a same-named directory beside it? Then candidate order matters.
- [ ] Did you back up to `_quarantine/` and try it on 2–3 files first?
- [ ] Did `npm run verify` stay at or below the baseline?
- [ ] If MISSING improved, did you lower the baseline in `package.json` in the
      same commit?
