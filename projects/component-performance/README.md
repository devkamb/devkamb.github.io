# Component & Performance Kit

## What it does

Small frontend foundation package with design tokens, accessible components, and bounded rendering for large lists.

## Architecture

- `src/components.js` contains framework-neutral component helpers and the virtualization calculation.
- `index.html` provides a minimal visual preview.
- `styles.css` contains the shared visual language.

## Run

```bash
python3 -m http.server 8121
```

Open `http://localhost:8121`.

## Tests

```bash
npm test
```

## Design decisions

- Components expose native HTML behavior where possible for keyboard and screen-reader support.
- Virtualization renders only a small visible slice instead of mounting every row.
- Tokens keep color and spacing decisions consistent without forcing a large UI dependency.

## Preview

[Open the component preview](https://devkamb.github.io/projects/component-performance/)

Small frontend foundation package with design tokens, accessible component helpers, and a simple rendering benchmark. The goal is consistent product language without making every feature reinvent buttons, status pills, or spacing decisions.

Run with `node --test`.
