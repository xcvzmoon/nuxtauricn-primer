# Copilot instructions — nuxtauricn-primer

Quick guide to make AI coding agents productive in this repository.

1. Big picture (what this repo is)

- Frontend: a Nuxt (Nuxt 4) single-page / client-side app (SSR disabled in `nuxt.config.ts`). Source lives under `app/` and `assets/`.
- Desktop wrapper: a Tauri app under `src-tauri/`. The Tauri config (`src-tauri/tauri.conf.json`) references the frontend dev server at `http://localhost:3000` and expects a static build (see `frontendDist` = `../dist`).

2. Important files to read first

- `nuxt.config.ts` — Vite plugins, SSR=false, `envPrefix: ['VITE_', 'TAURI_']`, shadcn config (`componentDir: './app/components/ui'`).
- `package.json` — official scripts: `dev`, `build`, `preview`, `format`, `lint` and dependency choices (notice `@tauri-apps/cli` in devDependencies and `bun` mentioned in Tauri hooks).
- `src-tauri/tauri.conf.json` — integration points with the frontend (devUrl, beforeDevCommand, frontendDist).
- `app/components/` and `app/lib/utils.ts` — common UI patterns (shadcn components, `cn` util using `clsx` + `tailwind-merge`).

3. How to run & build (discoverable commands)

- Frontend development: use the package scripts (examples): `npm run dev` or `bun run dev` (README lists multiple package managers).
- Frontend production build: `npm run build` (runs `nuxt build`) or `npm run generate` if you need a static `dist` directory.
- Tauri dev/build: `src-tauri/tauri.conf.json` sets `beforeDevCommand` to `bun run dev` and `beforeBuildCommand` to `bun run build`. Confirm your chosen package manager creates the output expected by Tauri (`../dist` by default). The repo includes `@tauri-apps/cli` as a devDependency; use the project-preferred package manager (npm/pnpm/bun) or run the CLI via `npx tauri dev` / `npx tauri build` if needed.

4. Project-specific patterns & conventions

- UI components: shadcn components live in `app/components/ui` (configured in `nuxt.config.ts`); component imports often assume no prefix.
- Icons: `nuxt-lucide-icons` with `namePrefix: 'Icon'` — expect components like `<IconMoon />`.
- Styling utilities: `app/lib/utils.ts` exports `cn(...)` that merges `clsx` + `tailwind-merge`; prefer this for class composition.
- Color mode: project uses `@nuxtjs/color-mode` and the composition API helper `useColorMode()` (see `ThemeToggler.vue`). Toggle by setting `colorMode.preference`.

5. Vite & build quirks to watch

- `nuxt.config.ts` sets `experimental.enableNativePlugin: true` and `clearScreen: false`. Be conservative when editing Vite plugin config.
- `envPrefix` includes `TAURI_` — environment vars intended for Tauri integration are exposed under that prefix.
- Tauri `frontendDist` = `../dist`. Nuxt's `nuxt build` does not necessarily emit `dist` by default — prefer `nuxt generate` or verify the actual output directory before changing `tauri.conf.json`.

6. Linting / formatting / tests

- Formatting: `npm run format` → Prettier (see `package.json`).
- Linting: `npm run lint` → `oxlint` configured in `package.json`.
- There are no discoverable test suites; don't assume test harnesses exist unless you add them.

7. Safe edit guidance for agents

- When adding or changing build hooks, always update `src-tauri/tauri.conf.json` only after confirming where Nuxt outputs static files locally.
- Small UI changes: prefer editing `app/components/ui` and helpers in `app/lib/` (`utils.ts`). Use `cn()` for class strings.
- Avoid changing global Vite or Tauri settings without running a local dev + Tauri dev cycle to confirm behavior.

8. Example quick tasks (how to implement safely)

- Add a new UI component: place it under `app/components/ui/`, follow existing naming and export patterns used by `shadcn-nuxt`.
- Change theme toggle behavior: modify `app/components/app/ThemeToggler.vue` and use `useColorMode()` to set `colorMode.preference`.

9. Where to report uncertainty

- If a build path mismatch is found (Nuxt output vs `frontendDist`), prefer creating a short PR that documents the mismatch and suggests either using `nuxt generate` for `dist` output or updating `tauri.conf.json` to the actual Nuxt output path.

If anything above is unclear or you want more explicit run commands for Windows PowerShell (the developer shell), tell me which area to expand and I will iterate.
