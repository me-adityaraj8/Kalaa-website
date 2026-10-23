import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage } from 'node:http';

// In production, Vercel serves api/*.ts as functions. In dev, this plugin
// routes /api/<name> to the same handlers so `npm run dev` runs everything.
function devApi(): Plugin {
  return {
    name: 'kalaa-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z-]+)(\?.*)?$/);
        if (!match) return next();
        try {
          const mod = await server.ssrLoadModule(`/api/${match[1]}.ts`);
          const handler = mod[req.method ?? 'GET'] as ((r: Request) => Promise<Response>) | undefined;
          if (!handler) {
            res.statusCode = 405;
            res.end();
            return;
          }
          const response = await handler(await toRequest(req));
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          if (response.body) {
            const reader = response.body.getReader();
            for (;;) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
          }
          res.end();
        } catch (err) {
          server.ssrFixStacktrace(err as Error);
          next(err);
        }
      });
    },
  };
}

async function toRequest(req: IncomingMessage): Promise<Request> {
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value);
    else if (Array.isArray(value)) headers.set(key, value.join(', '));
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  let body: Buffer | undefined;
  if (hasBody) {
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    body = Buffer.concat(chunks);
  }
  return new Request(`http://localhost${req.url}`, { method: req.method, headers, body });
}

export default defineConfig(({ mode }) => {
  // Expose server-only secrets (no VITE_ prefix) to the dev API handlers.
  const env = loadEnv(mode, process.cwd(), '');
  if (env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = env.ANTHROPIC_API_KEY;

  return {
    plugins: [react(), devApi()],
  };
});
