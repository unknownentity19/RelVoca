# Resume here

Working state of the mirror restoration. `README.md` covers what the archive *is*;
this covers what was done, what is verified, and what is left.

## Run it

```bash
node tools/serve.js        # http://localhost:8080
node tools/audit.js        # static reference report (see caveat below)
```

## Verified working

Measured against the running server and a real browser — not inferred:

| Check | Result |
|---|---|
| Representative page types | **26/26** → 200 |
| Random deep content pages | **60/60** → 200 |
| Child links from listing pages | **219/219** resolve |
| Docs page: external network requests | **0** |
| Docs page: failed requests / broken images | **0 / 0**, 20 fonts load locally |
| Home page: external network requests | **0** |
| Home page: failed requests | 3 (see below) |

The mirror is **offline-capable**: neither the marketing site nor the docs reaches
the internet. Both were pulling from mintcdn, Google Fonts, a FontAwesome CDN and
GTM until those references were localized.

The 3 remaining home-page misses are `_astro/images/Grid-Icon.svg`,
`bubble-6-message.svg` and `statistics.svg`. All three **404 on the live origin
too** — an upstream defect, not a gap in the capture. Nothing to recover.

## What was done

- **`tools/serve.js`** — 553 mirror pages are extensionless HTML that browsers
  will not render; the server content-sniffs and forces `text/html`, and resolves
  like the origin (exact → `<name>.html` → `<dir>/index.html`). It serves from the
  mirror root (making 2,636 root-relative refs work with no file edits), falls
  back to the project root so sibling host dirs resolve, and falls back to
  `/docs` for the docs app's prefix-less links (241 refs, again no file edits).
- **`tools/audit.js`** — static reference report across ~140k refs.
- **`tools/fetch-missing.js`** — refetches gaps; skips what is on disk, so it is
  safely re-runnable.
- **`tools/fetch-cdn.js`** — recovers CDN assets whose local filename HTTrack
  derived from a query string.
- **`tools/localize-refs.js`** — rewrote **12,846 absolute CDN references across
  589 files** to local paths. Originals backed up to `_quarantine/pre-localize/`.
- **Blog index recovered** — HTTrack saved it as `blog893e`; now `blog.html` at
  root, served at `/blog`.
- **8 collection listing pages** fetched and integrated.
- **Offline stubs** for `/api/icp-config`, GTM, analytics, `_vercel/speed-insights`.
- **Google Fonts vendored** — stylesheet plus 21 woff2 files, served locally.
- **55 MB of crawler debris** quarantined (reversible; nothing deleted).

## Caveat: audit.js over-reports

`tools/audit.js` currently reports ~5,400 broken refs. **That number is wrong on
the high side** — spot-checking its output against the server shows files it calls
missing returning 200 with correct byte counts (e.g.
`/mintcdn.com/…/logo/Wordmark_dark.svg`, 8,954 bytes on disk, serves fine).

It is a static resolver that keeps drifting from the server's actual resolution
rules. It is useful for *finding candidates*, not for scoring completeness.

**Treat the server and browser as ground truth.** To check a specific ref:

```bash
curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:8080/<path>"
```

Known audit gaps, if you want to fix it: it does not fully mirror the server's
project-root and `/docs` fallbacks for every ref shape, and it scans JS source
where HTTrack left non-URL garbage (`js.hsforms.net/forms/e=this.flowOrIntegration`)
that no browser ever requests.

## The one rule that will bite you

**Never relocate a mirror HTML file to a different directory depth.** Its internal
links were rewritten relative to where HTTrack put it.

Moving the blog index to `blog/index.html` looked right and nearly doubled the
broken-ref count — every `href="blog/post"` became `blog/blog/post`. Use a
root-level `<name>.html` plus the server's `.html` fallback instead.
`tools/ROUTES.md` records these mappings; do not "tidy" them.

## Genuinely outstanding

1. **68 docs Next.js chunks (~641 refs)** — permanently gone. The docs app
   rebuilt since the Sep 2–3 capture and those content hashes 404 upstream.
   Confirmed by direct request. Impact is interactivity only: docs pages are
   server-rendered and read fine (verified: 353 KB HTML, 30 headings, 0 broken
   images).
2. **~1,084 absolute CDN refs remain**, mostly inside `_next` JS bundles rather
   than HTML. No page was observed fetching them. Re-run
   `node tools/localize-refs.js` if any surface.
3. **`stories-categories.html`** — 404s on the live origin; may no longer exist.
4. **Audit accuracy** — see caveat above.

## Testing traps hit while doing this

Five false alarms came from bad test harnesses, not the site. Verify through the
**server**, never against disk:

1. `[ -f "$path" ]` fails when a ref carries a query string (`...5aa6.js?dpl=...`).
2. `for x in $list` mangles multi-line lists into one malformed URL — reported
   `0/219` links resolving when the truth was `219/219`. Use `while IFS= read -r`.
3. `node --check` on a `application/ld+json` block always fails; JSON-LD is not
   JavaScript. This produced a phantom "homepage SyntaxError" that does not exist.
4. Relative paths beginning `/../` resolve outside the project from `cwd`.
5. A URL that 200s may already be recovered — confirm it is actually still in the
   missing list before concluding the origin has it.

Also: `shuf` does not exist on macOS — use `sort -R`.

## Scope

Started as an offline archival copy of a third-party website. **As of 5 September
2026 it is rebranded to RelVoca** and is no longer a faithful capture — see the
next section. Still not for redeployment or redistribution. Voiceflow's rights in
the underlying content are unaffected by the rename.

---

## Rebrand to RelVoca (5 September 2026)

Done in six re-runnable scripts, each backing originals up to
`_quarantine/pre-rebrand/` before its first write. `README.md` lists the commands.

| Change | Scale |
|---|---|
| `Voiceflow` → `RelVoca` in visible text | 27,974 mentions, 1,538 files |
| Inline nav wordmark → RelVoca mark | 560 pages |
| `images/logo.svg`, docs wordmarks, favicons | overwritten in place |
| Product links → local pages | 4,517 links, 1,019 files |
| New pages | `/login`, `/dashboard`, `/status`, `/trust` |
| `relvoca-auth.js` loaded on nav pages | 560 pages |

**Reference integrity held exactly**: `missingTotal` 5,426 before and after,
`missingDistinct` 181 before and after, zero new broken refs. `okRefs` rose
111,031 → 114,886 because 3,855 formerly-external references now resolve
locally. Six external hosts disappeared entirely: `creator.`, `docs.`, `status.`,
`trust.`, `link.` and `media.voiceflow.com`.

### Two things to know before you touch this

1. **`rebrand.js` rewrites text nodes only.** It classifies each byte of an HTML
   file as text / tag / script / style and rewrites only visible regions, and
   even there it refuses any match that looks like a hostname, path segment or
   hashed identifier. That is why the rename cost zero reference churn. If you
   extend it, keep the guard — the check that proves it is comparing every
   `href`/`src`/`srcset`/`action` value before and after, per file.

2. **The nav's logged-in state is CSS, not JS.** The capture ships both states
   in the markup and switches on `html[data-vf-auth]`:

   ```css
   .nav-cta.is-authed                                     { display: none }
   html[data-vf-auth] .nav-auth .is-login                 { display: none }
   html[data-vf-auth] .nav-auth .nav-cta:not(.is-authed)  { display: none }
   html[data-vf-auth] .nav-auth .nav-cta.is-authed        { display: flex }
   ```

   `relvoca-auth.js` sets that one attribute. Toggling `hidden` on the buttons
   instead does not work — those `display` rules outrank `[hidden]`. The same
   trap bites any element you try to hide with `hidden` on these pages.

### Deliberately left alone

- **The directory `www.voiceflow.com/`.** Renaming it breaks thousands of
  relative links. See `tools/ROUTES.md`.
- **The string `voiceflow.com`**, everywhere — including ~2,000 visible-text
  mentions, most of them URL listings in `docs/llms.txt` and code samples in the
  docs. Rebranding those was an explicit scope decision, not an oversight.
- **Seven other Voiceflow subdomains** still link off-site: `cdn.` (464 refs, no
  navigational links), `developer.` (22), `learn.` (12), `partners.` (12),
  `share.` (5), `community.` (4), `goroute.demo.` (20), `voiceflow.zendesk.com`
  (1). None had a local equivalent to point at.
- **Five `media.voiceflow.com` videos** were never captured, so pointing them at
  local paths would have created broken refs. Their lazy `data-src` was renamed
  to `data-src-uncaptured` instead: nothing fetches them, the poster image still
  shows, and the original URL stays recorded.

---

## Agent Patchbay (the app)

A no-backend visual builder for conversational AI agents. Source:
[`app/agent-patchbay.html`](app/agent-patchbay.html) — one self-contained file,
no build step, no server.

**Live:** https://claude.ai/code/artifact/b7be7805-a762-4682-abc5-f9b0c6647a85
(private to the owner; verified working — AI blocks confirmed running live.)

Eight block types: Start, Say, Ask, Think (Claude writes the reply), Classify
(Claude routes by intent, one output port per label), Branch (deterministic
routing on a variable), Set, End. Wire blocks by dragging a ○ port onto another
block; press **Run agent** to chat with the flow while the executing block
highlights on the canvas.

Runs on three artifact capabilities, each optional:
`sample` (the LLM calls), `db` (durable saves, falls back to `localStorage`),
`downloads` (JSON export, falls back to clipboard). All three resolve
asynchronously and may be `null` — the editor stays fully usable without any of
them; only the AI blocks degrade, with a message saying why.

**To update it:** edit the file, then republish to the SAME url with the Artifact
tool (`url:` set to the link above). Publishing without that url creates a
separate artifact instead of updating this one.

Note: the `db` store is shared with anyone the artifact is shared with, so saved
agents are not per-person. Fine for a demo; revisit before sharing widely.

---

## Vercel deploy (5 September 2026)

```sh
npm run build:vercel     # -> public/
npm run preview:vercel   # http://localhost:8081, emulates vercel.json
npx vercel deploy
```

`tools/build-vercel.js` generates both `public/` and `vercel.json`. Do not hand-
edit `vercel.json` — it is overwritten on every build. Change the generator.

### Verified against the built output, not the source

| Check | Result |
|---|---|
| Random real pages | **220/220** → 200 |
| Assets sampled from those pages | **200/200** → 200 |
| External network requests on `/` | **0** |
| Failed requests on `/` | 3 — the pre-existing `_astro/images/*` that 404 upstream too |
| Login → dashboard round trip | works, session and workspace render |
| `.vercelignore` scope | only `public/**` + `vercel.json` upload (verified with `git check-ignore`) |

### Traps this build had to work around

1. **`/_vercel/*` is reserved by the platform.** The mirror's offline stub there
   is excluded from `public/`; anything uploaded under that prefix is shadowed.
2. **`:path(a|b)` cannot match across `/`.** The first attempt put all four
   extensionless JSON stubs in one `/:path(api/icp-config|api/vx|...)` header
   rule, which silently matches nothing. They are one rule each now.
3. **`cleanUrls` 308-redirects `/foo.html` to `/foo`.** The dashboard used to
   link to `/app/agent-patchbay.html` and took a redirect hop on every click;
   it links to `/app/agent-patchbay` now, which both servers resolve.
4. **Naming the script `build` would break the deploy.** Vercel would run it,
   and `tools/` is not uploaded.

### Still true after the deploy work

`npm run verify` still fails by the same pre-existing +3124 it failed by before
any of this started. Nothing here changed a reference: `missingTotal` 5,426 and
`missingDistinct` 181, unchanged.

### One change to tools/audit.js

`walk()`'s skip pattern now excludes `public/` alongside `_quarantine/`, `tools/`
and `node_modules/`. Without it the generated build — a full second copy of the
served tree — is scanned too, which doubled `missingTotal` to 10,852 and invented
90 phantom broken targets. Every one of them originated only in `public/`.

---

## Email verification step (5 September 2026)

`js/relvoca-verify.js` adds a "check your email" prompt between submitting
credentials and getting a session. Used by `/login` and `/signup`.

No mail server exists here, so the code is generated in the browser, kept in
`sessionStorage` for the attempt, and printed in a muted line inside the modal.
It is still checked for real — wrong codes are rejected, resend invalidates the
previous code — so the flow behaves like the real thing while staying
completable. **The session is only created after the code verifies**, so an
abandoned login leaves nothing in storage.

### It also fixed a dead end

`/signup`'s CTA had `data-signup-href="/signup"` after the delink pass, so
submitting an email just reloaded the same page forever. The page now reads the
`?email=` the captured `vf-cta.js` appends and opens the prompt, finishing at
`/dashboard`. The minified bundle is untouched.

### Three traps in the OTP boxes

1. **Advancing focus from the `input` event drops keystrokes.** That event fires
   *after* the character is committed, so a fast typist's next keystroke still
   lands on a full `maxLength=1` box and the browser discards it — only the
   first digit ever arrived. Digits are placed from `keydown` instead, so the
   write and the focus move happen in one synchronous step.
2. **`maxLength=1` breaks autofill.** A password manager or iOS SMS autofill
   delivers all six digits in one insert; a cap of 1 truncates it to the first.
   There is no maxLength now — manual typing is governed by the keydown handler,
   and a bulk insert reaches the input handler, which spreads it across boxes.
   Both paths are verified.
3. **Browser automation types via bulk insert, not key events.** A `type` action
   never fires `keydown`, which made trap 1 look unfixed after it was fixed. Use
   the `key` action to test per-keystroke behaviour.

### Build order matters

`/signup` is both a page we patch *and* the donor for `/login` and `/dashboard`.
`make-pages.js` builds signup first, and every page calls `stripOwnScripts()` on
the donor before adding its own, so scripts are never inherited or stacked.
Three consecutive builds produce byte-identical files.

---

## Recovered ES modules (5 September 2026)

`tools/fetch-modules.js`. **HTTrack does not parse JavaScript**, so any module
reached only from inside another script was never queued for download. Three
files were silently absent, and nothing in the mirror pointed at them in a way
`audit.js` could see:

| File | Reached from | Broke |
|---|---|---|
| `_astro/eventsField.B7jKWJBN.js` | `import` in EventsIndex | the events/webinar card artwork |
| `js/pattern-field.js` | a URL built in eventsField code | defines `<pattern-field>` |
| `_astro/tabs.viWZJ-9O.js` | `import` in TabsWalkthrough | tab walkthrough behaviour |

`<pattern-field>` draws every event, webinar, industry and solution card
visual — **67 elements across 53 pages**. Undefined, a custom element renders as
an empty inline box, so all of them were blank. Verified: before loading the
recovered script the elements have 0 children; after, they are defined and
drawing.

The scanner looks for two shapes, because the second is what actually mattered
here: `import "./x.js"` specifiers, *and* script URLs assembled in code
(`el.src = "/js/pattern-field.js?v=..."`). An import-only scan finds
eventsField but stops there, and the cards stay blank. It resolves transitively
and skips whatever is on disk, so it converges and is safe to re-run.

## Homepage product videos

`tools/fetch-media.js` pulls the five Build / Launch / Iterate videos (7.2 MB)
that the crawl never stored, and `delink.js` now points the lazy `<source>`
elements at those local copies rather than media.voiceflow.com. If the files are
absent it falls back to the remote origin — a working external video beats a
card that renders nothing.

### A testing trap that cost real time here

**IntersectionObserver does not fire while the page is hidden.** Both the video
cards and the event fields load through one, so in a hidden preview pane
(`document.visibilityState === "hidden"`, viewport `0x0`) nothing ever loads and
every card looks broken — before *and* after any fix. Two separate
investigations dead-ended on this. Check `document.visibilityState` before
concluding that lazy content is broken, and verify the mechanism by invoking the
load path directly instead of relying on scroll.
