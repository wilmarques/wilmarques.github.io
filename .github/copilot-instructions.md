# Copilot Instructions

This is Wiley Marques' personal website built with **Analog** - Angular's fullstack meta-framework.

## Architecture

This is a **file-based routing** system with SSG/SSR capabilities:
- Pages are defined in `src/app/pages/` with `.page.ts` suffix
- Content-driven blog using markdown files in `src/content/`
- API routes follow Nitro conventions in `src/server/routes/`

## Key Patterns

### Page Components
Pages export default Angular components with optional `routeMeta`:
```typescript
// src/app/pages/index.page.ts
export const routeMeta: RouteMeta = { redirectTo: '/blog', pathMatch: 'full' };
export default class HomePage {}
```

### Content Management
- Blog posts are markdown files in `src/content/` with frontmatter
- Use `injectContentFiles<PostAttributes>()` for post lists
- Use `injectContent<PostAttributes>('slug')` for individual posts
- Post attributes defined in `src/app/post-attributes.ts`

### Component Structure
Components use Angular's new control flow syntax (`@if`, `@for`) and standalone imports:
```typescript
@Component({
  selector: 'app-blog',
  imports: [RouterLink], // Direct imports, no modules
  template: `@for (post of posts; track post.attributes.slug) { ... }`
})
```

## Development Workflow

- **Dev server**: `npm start` (Vite dev server on port 5173)
- **Build**: `npm run build` (outputs to `dist/analog/`)
- **Test**: `npm run test` (Vitest with jsdom)
- **Preview**: `npm run preview` (serves built app)

## Configuration

- **Vite config**: `vite.config.ts` with Analog plugin and prerender routes
- **Angular config**: Uses standalone components with `provideFileRouter()`
- **Content**: Shiki syntax highlighting enabled
- **SSG**: Prerendered routes defined in `vite.config.ts`

## File Conventions

- Page routes: `src/app/pages/**/*.page.ts`
- Dynamic routes: `[slug].page.ts` (params injected via `injectContent`)
- API routes: `src/server/routes/**/*.ts` (h3 event handlers)
- Content: `src/content/*.md` with frontmatter

## Dependencies

- Angular 20+ with standalone components
- Analog platform for fullstack features
- Marked + Shiki for markdown rendering
- Vitest for testing
- h3 for server-side handlers
