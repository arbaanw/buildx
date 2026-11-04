# Office Atlas — Iteration 1

A spatial office management demo built with React, TypeScript, Ant Design, React Three Fiber, and Zustand.

## Run

Requires Node.js 20 or later. Run `npm install` then `npm run dev`. Use `npm run typecheck`, `npm test`, and `npm run build` to verify.

The demo requires no credentials. Changes persist in browser localStorage; Reset demo restores the initial organization. The office scene is generated from the same layout edited by Office builder.

## Current scope

Implemented: executive office view with rotate, zoom, pan, room selection, urgency tints and data-backed KPIs; executive department details; local meeting, task and note actions; department head project and issue workflows; employee task and issue workflows; rectangular room editor with image tracing, snap grid, selection, rename, department assignment, undo/redo and save.

Partial: the builder supports PNG/JPG tracing but not PDF page rendering; room geometry editing is limited to creation and metadata. Connected Supabase mode is not active. The database schema is a foundation and needs authorization policies and repository integration before real user data can be enabled. Demo role switching is illustrative and must not be used as authentication.

## Verification

Not run in this environment: Node.js, npm, and Python are absent. No passing build or test result is claimed.
