# business-card

Sérgio Bernardes' interactive business card: a single career-as-recipe-cards (`ficha técnica`) page at `index.html`.

## Repo shape

- The repo is exactly one file, `index.html` (~1540 lines), with zero build, tests, lint, CI, or package manifest. There is nothing to run or configure — edit and open in a browser. Make minimal, targeted edits; do not introduce tooling or extra files.
- No git repo, no deployment config in the directory; how it's published is not discoverable from the codebase.

## Architecture (all inside `index.html`)

Three layers in one file:

1. `<style>` with CSS custom-property tokens (`--paper`, `--head`, `--ink`, ...) that name the original LaTeX colors in comments. Change colors via tokens, not literals.
2. `<body>` with a two-pane `.shell` (sticky `.chef` bio column + scrolling `.deck` of cards) and an inline `<svg>` `<symbol>` sprite (`i-rocket`, `i-leaf`, ...).
3. One inline `<script>` holding **all** content and logic:
   - `FICHAS` — the English base content for the career cards (also the fallback for every language).
   - `BASE` + `STR` — UI-chrome dictionaries; `STR[lang]` values are kept as *unevaluated strings* (`langSrc()`) and compiled lazily via `new Function` in `loadDict`/`loadFichas`. This is an intentional parse-on-demand optimization — don't pre-parse them.
   - `FICHA_STR[lang]` — per-card translations; merged **positionally** over `FICHAS` (`{...base, ...(FICHA_STR[lang][i]||{})}`), so array order must stay in sync with `FICHAS`. Editing card order/content means touching every language blob.
   - Deck logic (`render`, `go`, pointer/keyboard paging) and the language-switch runtime (`setLang`, `rerenderAll`).

## Non-obvious things to preserve

- Card `steps` and some dictionary strings contain inline HTML (`<strong>`, `<em>`); `render()` and `data-i18n-html` inject innerHTML. Keep markup valid when editing strings.
- CJK fonts (Zen Kaku Gothic New / Noto Sans SC) load on demand through `ensureCjkFont()` via the `#cjk-font` link's `data-href-ja/zh` attributes — don't hardcode the href.
- Language boot order: `?lang=` query param > `localStorage("ficha-lang")` > `"en"`.
- The desktop layout (≥1080px) is an app-like fixed `100dvh` viewport where both panes scroll independently — test layout edits at mobile *and* ≥1080px.
- Accessibility states exist deliberately: `prefers-reduced-motion`, focus-visible outlines, aria labels, ghost/filled proficiency dots. Don't strip them.
- Voice is personal and multilingual (e.g. `yield: "rendimento: ..."` stays in Portuguese even in the English base). Don't "correct" or anglicize copy.

## Verifying changes

Manual only: open `index.html` (double-click or `python3 -m http.server`), then check each language via the language menu or `?lang=xx`, arrow-key/swipe navigation, and both viewport sizes.
