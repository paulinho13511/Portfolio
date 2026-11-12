import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Executa as funções da pasta /api durante o `npm run dev`,
 * imitando a assinatura (req, res) das Vercel Serverless Functions.
 * Em produção quem serve /api é a própria Vercel.
 */
function vercelApiDev() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const match = url.pathname.match(/^\/api\/([a-z0-9-]+)\/?$/i);
        if (!match) return next();

        const file = resolve(server.config.root, 'api', `${match[1]}.js`);
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (body) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(body));
          return res;
        };

        if (!existsSync(file)) {
          return res.status(404).json({ error: 'Not Found', path: url.pathname });
        }

        try {
          req.query = Object.fromEntries(url.searchParams);
          const mod = await server.ssrLoadModule(file);
          await mod.default(req, res);
        } catch (error) {
          server.config.logger.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), vercelApiDev()],
});
