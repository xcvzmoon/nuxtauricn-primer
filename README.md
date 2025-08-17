# Nuxtauricn Primer

A minimal starter that combines a Nuxt 4 client-side app with Shadcn UI and a Tauri desktop wrapper.

Quick links

- Frontend source: `app/`
- Tauri wrapper: `src-tauri/`

Create a new project from this template

```powershell
bunx gitget xcvzmoon/nuxtauricn-primer <project-name>
```

## Setup

Make sure to install dependencies:

Why this starter

- Simple Nuxt 4 single-page app (SSR disabled) wired to a Tauri desktop shell.
- Keeps frontend and native code separate: `app/` is the Nuxt app, `src-tauri/` contains Rust + Tauri config.

Getting started (install)

- Install dependencies with your preferred package manager:

```powershell
# npm
npm install

# pnpm
pnpm install

# bun
bun install
```

Run the frontend (development)

- Starts Nuxt dev server at `http://localhost:3000`:

```powershell
npm run dev
# or
bun run dev
# or
pnpm dev
```

Build for production

- Build the frontend; optionally generate static output if you intend to bundle with Tauri:

```powershell
bun run build
# or to generate a static `dist` (if you prefer)
bun run generate
```

Preview production build

```powershell
bun run preview
```

Tauri notes

- `src-tauri/tauri.conf.json` currently expects the frontend dev server at `http://localhost:3000` and `frontendDist` = `../dist` for bundled builds. Verify which Nuxt command produces the output Tauri expects (you may prefer `nuxt generate` if bundling a static site).
- The project includes `@tauri-apps/cli` as a devDependency. Use your package manager or `npx tauri dev` / `npx tauri build` if you prefer.
- To run the full Tauri development workflow (start the frontend and the native wrapper) use:

```powershell
bun tauri dev
```

Project structure (important files)

- `app/` — Nuxt app source (components, pages, assets).
- `app/components/ui/` — shadcn-style UI components (see `nuxt.config.ts` shadcn config).
- `app/lib/utils.ts` — utility helpers (e.g., `cn()` uses `clsx` + `tailwind-merge`).
- `nuxt.config.ts` — Vite configuration, `envPrefix: ['VITE_', 'TAURI_']`, SSR disabled.
- `package.json` — project scripts: `dev`, `build`, `generate`, `preview`, `format`, `lint`.
- `src-tauri/tauri.conf.json` — Tauri integration configuration.

Conventions & gotchas

- Color mode: uses `@nuxtjs/color-mode`. The theme toggle in `app/components/app/ThemeToggler.vue` manipulates `colorMode.preference`.
- Icons: `nuxt-lucide-icons` with `namePrefix: 'Icon'` — components like `<IconMoon />`.
- `cn()` helper: prefer `app/lib/utils.ts` `cn()` for composing class strings.
- Vite experimental flags are enabled in `nuxt.config.ts` (`enableNativePlugin: true`); avoid large changes without testing locally.

Formatting & linting

- Format: `bun run format` (Prettier)
- Lint: `bun run lint` (oxlint)

Further reading

- Nuxt docs: [https://nuxt.com/docs](https://nuxt.com/docs)
- Tauri docs: [https://tauri.app/v1/guides/](https://tauri.app/v1/guides/)

If you want a PowerShell-ready quick-start script added to the repo, or a small checklist for validating a Tauri dev run on Windows, tell me which you'd prefer and I'll add it.
