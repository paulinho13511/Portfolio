/**
 * GET /api/health
 * Verificação de saúde da API: status, timestamp, uptime e versão.
 */
export const API_VERSION = '1.0.0';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ status: 'error', code: 405, message: 'Method Not Allowed' });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');

  return res.status(200).json({
    status: 'ok',
    code: 200,
    message: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Number(process.uptime().toFixed(3)),
    version: API_VERSION,
    environment: process.env.VERCEL_ENV ?? 'development',
    region: process.env.VERCEL_REGION ?? 'local',
  });
}
