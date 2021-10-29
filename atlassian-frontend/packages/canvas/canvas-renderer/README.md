# CanvasRenderer

Accepts a WebGL context and renders the Canvas board application to it.

## Architecture

At a high-level, Canvas follows a model in which the entrypoint for all changes are DOM interactions (`interaction`), which trigger updates in the `model/`. These are then emitted to the `view/`.

The striving goals of this architecture are:

* **Minimising JavaScript work between an interaction and render** - reasoning: performance & simplicity;
* **Minimising the need for garbage collection** - reasoning: keep memory usage low + performance impact of GCs low;
* **Striving to not have a global, monolithic state** - reasoning: inability to parallelise / chunk work later onwards, as we're stuck with one thing in the centre of our system;
* **Unidirectional data-flow** - reasoning: debuggability, reliability;
* **Modelling the real-world** - reasoning: maintainability of our codebase, evolution of the concepts in it;

## Structure

- `model/`: contains all of the core classes representing different parts of the domain model.
- ``:
- `view/`: contains all DOM & GL-related code used to render pixels to screen.
- `utils/`: contains any utilities used across the model / view, primarily mathematical functions.
