# Architecture

`src/types/domain.ts` defines the canonical office and operational models. The Zustand store persists a single demo data graph to localStorage. `src/utils/urgency.ts` scores departments independently of rendering. The R3F scene consumes layout and scores as input; it owns no business mutations. The builder edits the same layout model. Connected mode needs a repository interface, authentication, RLS, and realtime synchronization before use.
