import { Github, RefreshCw } from 'lucide-react';
import { useApi } from '../hooks/useApi.js';
import { profile } from '../data/profile.js';

const NAV = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#stack', label: 'Stack' },
  { href: '#playground', label: 'API' },
];

export default function StatusBar() {
  const health = useApi('/api/health');
  const online = !health.loading && health.ok && health.data?.status === 'ok';

  const state = health.loading
    ? { text: 'CHECKING', dot: 'bg-warn', color: 'text-warn' }
    : online
      ? { text: 'ONLINE', dot: 'bg-ok', color: 'text-ok' }
      : { text: 'OFFLINE', dot: 'bg-err', color: 'text-err' };

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between gap-3 px-4 font-mono text-[11px] sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={health.reload}
            title="Verificar novamente /api/health"
            className="group flex items-center gap-2 rounded border border-line px-2 py-1 transition-colors hover:border-line-strong"
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full ${state.dot} ${online ? 'animate-ping opacity-60' : ''}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${state.dot}`} />
            </span>
            <span className={`font-semibold tracking-widest ${state.color}`} aria-live="polite">
              {state.text}
            </span>
            <RefreshCw
              size={11}
              className={`text-muted transition-colors group-hover:text-soft ${health.loading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
          </button>

          <dl className="hidden items-center gap-4 text-muted sm:flex">
            <div className="flex gap-1.5">
              <dt>latência</dt>
              <dd className="text-soft">{health.ms != null && !health.loading ? `${health.ms}ms` : '--'}</dd>
            </div>
            <div className="hidden gap-1.5 md:flex">
              <dt>api</dt>
              <dd className="text-soft">v{health.data?.version ?? '-.-.-'}</dd>
            </div>
          </dl>
          <span className="text-muted sm:hidden">{health.ms != null && !health.loading ? `${health.ms}ms` : ''}</span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Seções">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded px-2 py-1 text-muted transition-colors hover:text-white md:inline-block"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded border border-line px-2 py-1 text-soft transition-colors hover:border-accent/60 hover:text-white"
          >
            <Github size={13} aria-hidden="true" />
            <span className="hidden sm:inline">github/{profile.githubHandle}</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
