import { useState } from 'react';
import { Copy, Check, Loader2, Play, Terminal } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { timedFetch } from '../lib/request.js';

const ENDPOINTS = [
  { path: '/api/health', note: 'Status, timestamp, uptime e versão da API' },
  { path: '/api/projects', note: 'Lista estruturada dos projetos' },
];

/** Realça chaves, strings, números e literais de um JSON já formatado. */
function highlight(json) {
  const escaped = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return escaped.replace(
    /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = 'text-warn';
      if (match.startsWith('"')) cls = match.endsWith(':') ? 'text-accent' : 'text-ok';
      else if (/true|false|null/.test(match)) cls = 'text-[#c792ea]';
      return `<span class="${cls}">${match}</span>`;
    },
  );
}

export default function ApiPlayground() {
  const [endpoint, setEndpoint] = useState(ENDPOINTS[0].path);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setLoading(true);
    setCopied(false);
    const res = await timedFetch(endpoint);
    setResult({ ...res, endpoint });
    setLoading(false);
  };

  const body = result
    ? JSON.stringify(result.data ?? { error: result.error ?? 'Resposta sem corpo JSON' }, null, 2)
    : null;

  const copy = async () => {
    if (!body) return;
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard indisponível */
    }
  };

  return (
    <section id="playground" className="py-16" aria-labelledby="playground-title">
      <SectionHeader
        index="03"
        route="api.playground"
        title={<span id="playground-title">API Playground</span>}
        description="Faça uma requisição real para as Serverless Functions que rodam este site e inspecione o payload."
      />

      <div className="panel corners overflow-hidden">
        {/* Barra de requisição */}
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-md border border-line bg-ink font-mono text-sm">
            <span className="border-r border-line bg-ok/10 px-3 py-2.5 font-semibold text-ok">GET</span>
            <label htmlFor="endpoint" className="sr-only">
              Endpoint
            </label>
            <select
              id="endpoint"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="min-w-0 flex-1 cursor-pointer appearance-none bg-transparent px-3 py-2.5 text-soft focus:outline-none"
            >
              {ENDPOINTS.map((ep) => (
                <option key={ep.path} value={ep.path} className="bg-panel">
                  {ep.path}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={run}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            Enviar requisição
          </button>
        </div>

        <p className="border-b border-line px-4 py-2 font-mono text-[11px] text-muted">
          {ENDPOINTS.find((e) => e.path === endpoint)?.note}
        </p>

        {/* Resposta */}
        <div className="bg-ink/60">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5 font-mono text-[11px]">
            <div className="flex items-center gap-4" aria-live="polite">
              <span className="flex items-center gap-1.5 text-muted">
                <Terminal size={13} aria-hidden="true" /> response
              </span>
              {result && (
                <>
                  <span className={result.ok ? 'text-ok' : 'text-err'}>
                    {result.status ? `${result.status} ${result.ok ? 'OK' : 'ERROR'}` : 'NETWORK ERROR'}
                  </span>
                  <span className="text-muted">
                    tempo <span className="text-soft">{result.ms}ms</span>
                  </span>
                </>
              )}
            </div>
            {body && (
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1.5 rounded px-2 py-1 text-muted transition-colors hover:text-white"
              >
                {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                {copied ? 'copiado' : 'copiar'}
              </button>
            )}
          </div>

          <div className="max-h-[420px] min-h-[220px] overflow-auto p-4">
            {body ? (
              <pre
                className="font-mono text-xs leading-relaxed text-soft sm:text-[13px]"
                dangerouslySetInnerHTML={{ __html: highlight(body) }}
              />
            ) : (
              <p className="flex h-[188px] items-center justify-center text-center font-mono text-xs text-muted">
                <span>
                  Clique em <span className="text-accent">Enviar requisição</span> para chamar{' '}
                  <span className="text-soft">{endpoint}</span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
