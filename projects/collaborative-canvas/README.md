# Collaborative Canvas

## What it does

A lightweight browser canvas for arranging notes, shapes, and connectors. It keeps edits as small operations so the same state model can support local undo/redo today and synchronization later.

## Architecture

- `src/operations.js` is the pure state transition layer.
- `src/app.js` owns the canvas renderer and interaction wiring.
- `index.html` and `styles.css` provide the product shell.

The operation boundary is intentional: rendering and transport can evolve independently from document state.

## Run

```bash
python3 -m http.server 8120
```

Open `http://localhost:8120`.

## Tests

```bash
npm test
```

## Design decisions

- Canvas keeps the interaction surface fast and dependency-light.
- Operations are serializable objects, suitable for an append-only sync protocol.
- Undo/redo reuses the same state transition function instead of maintaining a second document model.

## Preview

[Open the live canvas preview](https://devkamb.github.io/projects/collaborative-canvas/)
