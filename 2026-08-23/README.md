# Troy Sacote — Galaxy Portfolio

A lightweight, production-minded portfolio frontend for Troy Sacote: Web Application Developer / AI Automation Specialist.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Included

- Responsive space/AI command-center visual system with a low-cost 2D galaxy canvas and CSS orbital core.
- Honest profile positioning, skill maturity system, project archive, learning path, constellation stack, and contact channel.
- Supplied profile photo used as `public/profile.png`.
- Local chatbot fallback with structured knowledge in `src/main.js`; it is intentionally conservative and does not invent claims.
- Workflow cards with safe Demo Mode simulation. The UI is ready to connect to a server-side `/api/workflows` proxy later.
- `.env.example` documenting the future OpenRouter, n8n, and GitHub server-side variables.
- `prefers-reduced-motion`, keyboard-friendly controls, semantic sections, focus styles, responsive touch targets, and no secrets in the client.

## Connecting n8n

Create a server-side route in the deployment layer that reads `N8N_WEBHOOK_URL` and `N8N_WEBHOOK_SECRET`, validates the workflow id, forwards a signed request, applies a timeout, and returns a sanitized result. Keep both variables private. The current frontend remains usable before the webhook exists by showing Demo Mode.

## Connecting an AI chatbot

Add a server-side `/api/chat` route that receives a validated message, constructs context from structured profile/project/skill data, and calls OpenRouter (or another OpenAI-compatible provider) with `OPENROUTER_API_KEY`. Add rate limiting and a timeout. Keep the browser free of provider keys. The current local fallback is the safe baseline.

## Replacing placeholder projects

Update the `projects` array in `src/main.js` with verified descriptions, screenshots, repository URLs, and live demo URLs as those become available. Replace “Project details coming soon” only when the underlying material exists.

## Deploying to Vercel

Import the repository, use the default Vite build settings (`npm run build`, output `dist`), and add only the server-side environment variables required by any API routes you add. A static deployment works without any environment variables.

## Future improvements

Add a Next.js App Router shell if server rendering becomes a priority, move the portfolio knowledge into typed `data/` modules, add a real API proxy for chat/workflows, add verified project screenshots, and optionally replace the 2D atmosphere with a lazy-loaded React Three Fiber scene while preserving the current canvas fallback.
