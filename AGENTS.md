# Template SSR FE

## Environment & Tooling

- Use Bun for installs, scripts, and lockfile updates.
- Run lint/format tasks with Bun (`bun run lint`, `bun run check`).
- Routing is file-based via TanStack Start — run `bun run build` to regenerate route files after adding/removing route files.

## Project Structure

### MVVM & Feature-Based Architecture

This project follows MVVM (Model-View-ViewModel) pattern and feature-based file structure:

- **Features**: `src/features/` — Feature modules organized by domain
  - Each feature contains: `models/`, `viewmodels/`, `views/`, `index.ts`
- **Common**: `src/common/` — Shared code across features
  - `components/` — Reusable UI components
  - `lib/` — Library configurations (api, dayjs, i18n)
  - `utils/` — Utility functions
  - `const/` — Shared constants

### Layer Access Rules

Enforced by `eslint-plugin-boundaries`:

- **View → ViewModel → Model**: Views must access Models only through ViewModels.
  - Views cannot directly access Models.
  - ViewModels cannot reference Views (UI components).
  - Models are the bottom layer and cannot reference ViewModels or Views.

### API Schema Types

- **Do NOT** import types directly from `@/@types/api-schema` outside of model files.
- **DO** import types from each feature's `models/index.ts`.
- Exception: `src/features/*/models/**/*.ts` and `src/common/lib/api.ts` may import directly.

### Cross-Layer Imports

- Use `index.ts` for cross-layer imports. Do not import internal files directly.
  - Example: Import from `@/features/auth` instead of `@/features/auth/viewmodels/use-login`.

## Naming Conventions

Enforced by `eslint-plugin-check-file`:

- All files and folders under `src/` must use **kebab-case**.
  - Examples: `use-auth-prompt.ts`, `notice-card.tsx`, `api-client/`
- Exception: `src/routes/` is exempt — TanStack Router requires its own file naming convention (e.g. `$postId.tsx`, `_layout.tsx`).

## Import Conventions

Enforced by `eslint-plugin-import-x`:

- Import order (each group separated by a blank line):
  1. `builtin`
  2. `external` — `react` and `@tanstack/**` go first within this group
  3. `internal` — path aliases (`@/**`)
  4. `parent` / `sibling` / `index`
  5. `type`
- Use inline type imports: `import { type Foo } from '...'` (not `import type { Foo }`).
- No duplicate imports.
- No unused imports (error).

## Components Structure

### `src/common/components/`

Split into **`ui/`** (primitives) and other directories (composites/layouts):

#### `ui/` — Primitive components

- No feature/domain imports: do not import from `@/features/*`.
- Do not use `useTranslation`, auth hooks, or feature viewmodels.
- Single-purpose building blocks mapping to one element or a small generic pattern.

#### Other directories — Composite components

- **`layout/`**: Layout-level wrappers (e.g. page shells, navigation frames).

Do **not** put components that use `@/features/*`, `useTranslation`, or feature viewmodels under `ui/`.

### Component Type Conventions

- Use namespace merging for component-related types such as props and state.

```ts
export function Button({ label, variant }: Button.Props) { ... }

export namespace Button {
  export type Props = {
    label: string;
    variant?: 'primary' | 'secondary';
  };
}
```

### Component Folder & Storybook

- Each component lives in a **folder named after the component** (kebab-case).
- **Implementation**: `index.tsx` inside that folder.
- **Storybook**: `index.stories.tsx` in the same folder.
- Story `title` uses a domain prefix for sidebar grouping:
  - `Common/` — `src/common/components/` (e.g. `Common/Button`)
  - `<Feature>/` — `src/features/<feature>/views/components/` (e.g. `Notice/NoticeCard`)
- Omit Storybook for components that depend on auth context.

### Storybook Setup

- **Dark / Light mode**: toggled via the toolbar. Applies `data-theme="dark"` / `data-theme="light"` to the root element. Tailwind's `dark:` variant responds to this attribute.
- **i18n locale**: toggled via the toolbar. Switches between `ko` and `en`. dayjs locale syncs automatically via the `languageChanged` event.

## Commits & PRs

- Title format: `<type>: <title>`
- `<title>` uses imperative mood (e.g., add, fix, update).
- `<type>` options:
  - `feat`: New feature or capability.
  - `fix`: Bug or incorrect behavior fix.
  - `docs`: Documentation-only changes.
  - `style`: Code style/format changes with no behavior impact.
  - `refactor`: Code structure improvements without behavior changes.
  - `test`: Adds or updates tests.
  - `chore`: Maintenance tasks that don't affect runtime behavior.
  - `ci`: Changes to CI/CD configuration.

## LLM Guidance

- Responses must be in Korean.
- Follow requested formats (especially commit/PR titles).
- Avoid destructive commands (e.g., `git reset --hard`) unless explicitly requested.
