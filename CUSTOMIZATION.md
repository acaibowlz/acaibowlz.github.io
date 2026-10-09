# Site customization

Site-specific instructions for the agent, read after `AGENTS.md`. Record the
conventions, styling decisions, and preferences this site has adopted here —
`AGENTS.md` is managed by `ctf update` and must not be edited.

## Styling

### Palette and theme
- **Dark only.** `:root` sets `color-scheme: dark` and one palette; there is no
  light mode and no `prefers-color-scheme` block. Don't add one unasked.
- **One accent: `--accent` green (`#4ad63f`)**, taken from the CRT/lamp glow in
  the home cover illustration. It is the only color on the page: links, hover
  states, focus rings, `<mark>` highlights (accent at 25% over the text), the
  404 code. Don't introduce a second hue.
- Corners are nearly square (`--radius` 3px, `--radius-sm` 2px). Keep new
  boxes and buttons on these tokens.

### Typography
- **Sans: Space Grotesk**, loaded from Google Fonts in `base.html`
  (`wght@300..700`). The fallback stack continues with system fonts, then
  Traditional Chinese fonts (PingFang TC, Noto Sans TC, …) for CJK glyphs.
- **Mono (`--font-mono`) is a deliberate accent**, not just for code: nav
  links, tag/term buttons, social buttons, and the small section labels.
- **Section labels** ("Featured posts", "Tags", listing eyebrows) share one
  look: mono, `0.75rem`, weight 600, uppercase, `letter-spacing: 0.06em`,
  `--muted`. Reuse it for any new label.
- Headings use tight negative tracking, reset to `0` under `:lang(zh)` because
  it crowds CJK glyphs. Posts in Chinese set `lang = "zh-Hant"` in front
  matter; the site default is `lang = "en"`.

### Components
- **Outlined buttons** — `.tags`, `.term-grid`, `.socials` share one pattern:
  `--surface` fill, 1px inset `--border` ring (`box-shadow`, not `border`),
  `--muted` text; on hover the text and ring turn `--accent`. New chip/button
  UI should match.
- **Social links are icon-only squares** (2rem, inline SVG in `home.html`,
  `aria-label` + `title` carry the name). A platform without an icon falls back
  to its name as text; add an SVG branch for it in `home.html`.
- Cards (`.panel-main > .recent`) are a 1px `--border` outline, no fill.

### Layout
- Every page frames at `--width-wide` (64rem); reading text caps itself at
  `--max-width` (44rem) inside it. Post bodies are capped even without a TOC.
- **`.panel-grid`**: main column + 17rem sticky aside (home profile/tags, post
  TOC). Below 48rem the aside is **hidden entirely** — the author tried stacking
  it under the content and reverted that; keep it hidden.
- **Home**: full-width 21:9 cover (`params.home_cover`) with a visually hidden
  `<h1>`; the main card lists blog posts tagged **`featured`** (filtered from
  `recent.blog`, hence its count of 100). An empty featured list renders as an
  empty card on purpose — no placeholder text.
- **About** (`about.html`, included by `page.html` for slug `about`): title on
  its own line above a `1fr 2fr` grid; square-cropped photo on the left,
  `position: sticky`, top-aligned with the text; the first paragraph is pulled
  up by its half-leading so the text cap height meets the photo's top edge.
  Below 48rem it stacks with the uncropped photo.
- Listing pages (blog, tags, term pages) use a centered `.listing-header`.
