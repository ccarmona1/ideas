# Monorepo

## Repository Structure

- `apps/` — Main applications in the monorepo.
  - `backend/` — Backend (structure to be defined or implemented).
  - `frontend/` — Frontend application using React + Vite.
- `packages/` — Reusable packages and shared types.
  - `e2e/` — End-to-end tests.
  - `types/` — Shared TypeScript types.
- `test-results/` — Automated test results.

## Main Scripts (in `apps/frontend`)

- `yarn dev` — Starts the development server with Vite.
- `yarn build` — Compiles TypeScript and builds the app for production.
- `yarn lint` — Runs ESLint for static code analysis.

## Key Dependencies

- React 19, React DOM, React Router DOM
- Vite for development and build
- TypeScript for static typing
- ESLint for linting

## Quick Start

```bash
yarn install

yarn dev

yarn e2e
```

## Notes for AI Agents

- The structure follows standard JS/TS monorepo conventions.
- Scripts and dependencies are defined in the respective `package.json` files.
- Shared packages are in `packages/` and can be imported by the apps.
- Test results are stored in `test-results/` for automated analysis.

---

For more details, check the `package.json` files and the internal documentation of each subproject.
