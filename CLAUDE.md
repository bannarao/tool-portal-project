# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks, no libraries that need installing, and no build step. Files should open directly in a browser.

## Project Structure

Update this section as files are added.

```
/
├── CLAUDE.md          # This file
├── index.html         # Portal homepage
├── ohms-law.html      # Ohm's Law calculator page
├── css/
│   └── styles.css     # Shared styles and light/dark theme colors
└── js/
    ├── theme.js       # Shared light/dark theme toggle
    └── ohms-law.js    # Ohm's Law calculator logic
```

Keep new files organized like this:

- `*.html` at the top level: the pages
- `css/`: stylesheets
- `js/`: scripts

## Key Requirements

1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast against its background, in both the light and the dark theme.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes (for example, restructuring files, adding dependencies, or rewriting existing pages).
- Ask rather than guess when something is unclear.

## Feature Plan

A portal where students try small Electrical Engineering web tools.

### Portal structure

- **Homepage** (`index.html`): site title, short intro, theme toggle, and one card per tool.
- **Opening a tool:** the visitor clicks a tool's card and lands on that tool's own page (for example `ohms-law.html`).
- **Getting back:** every tool page has a "Back to all tools" link at the top, and the site title in the header always links to the homepage.
- **Adding a tool later:** create the tool's page and script (`<tool-name>.html`, `js/<tool-name>.js`), reuse the shared `css/styles.css` and `js/theme.js`, then add one card to `index.html`. Nothing else changes.

### Phases

- **Phase 1: the portal plus its first tool.** Homepage, shared light/dark theme, responsive layout, and an Ohm's Law calculator that shows its working.
  - [x] Portal homepage with a placeholder tool card that opens a tool page and returns via "Back to all tools"
  - [x] Ohm's Law calculator (replaces the placeholder)
- **Phase 2: more tools.** Add further Electrical Engineering tools one at a time (for example a resistor color code decoder or a voltage divider calculator).
- **Phase 3: polish.** Unit prefixes (mA, kΩ) and easier browsing once there are many tools.
