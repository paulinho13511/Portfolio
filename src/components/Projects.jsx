import { ArrowUpRight, Database, Github, Server, Trophy, Wallet } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { useApi } from '../hooks/useApi.js';
import { profile } from '../data/profile.js';

const ICONS = { financias: Wallet, studyxp: Trophy };

function ProjectCard({ project, onSelect, featured }) {
  const Icon = ICONS[project.id] ?? Server;
  const techs = [...project.stack.frontend, ...project.stack.backend, ...project.stack.database];

  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      aria-haspopup="dialog"
      className={`panel corners group flex h-full flex-col p-6 text-left transition-colors hover:border-line-strong hover:bg-raised/70 ${
        featured ? 'sm:p-8' : ''
      }`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-raised text-accent">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="flex items-center gap-1 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
          detalhes <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
      <p className="label mb-2">{project.category}</p>
      <h3 className={`font-semibold tracking-tight text-white ${featured ? 'text-3xl' : 'text-2xl'}`}>{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-soft">{project.tagline}</p>

      {featured && (
        <p className="mt-4 hidden text-sm leading-relaxed text-muted sm:block">{project.highlights[0]}</p>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {techs.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}

function SkeletonCard({ className = '' }) {
  return <div className={`panel h-64 animate-pulse ${className}`} aria-hidden="true" />;
}

export default function Projects({ onSelect }) {
  const { loading, ok, data, ms, status, reload } = useApi('/api/projects');
  const projects = data?.data ?? [];
  const [first, second] = projects;

  return (
    <section id="projetos" className="py-16" aria-labelledby="projetos-title">
      <SectionHeader
        index="01"
        route="GET /api/projects"
        title={<span id="projetos-title">Projetos</span>}
        description="Os dados desta seção vêm da API serverless do próprio portfólio. Clique em um projeto para ver arquitetura e decisões técnicas."
      />

      {!loading && !ok && (
        <div className="panel mb-4 flex flex-wrap items-center justify-between gap-3 border-err/40 p-4 font-mono text-xs">
          <span className="text-err">Não foi possível carregar /api/projects ({status || 'sem resposta'}).</span>
          <button type="button" onClick={reload} className="rounded border border-line px-3 py-1 text-soft hover:border-accent">
            tentar novamente
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          {loading ? <SkeletonCard /> : first && <ProjectCard project={first} onSelect={onSelect} featured />}
        </div>
        <div>{loading ? <SkeletonCard /> : second && <ProjectCard project={second} onSelect={onSelect} />}</div>

        {/* Tile: resposta da API */}
        <div className="panel flex flex-col justify-between p-6">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-accent" aria-hidden="true" />
            <p className="label">response</p>
          </div>
          <dl className="mt-6 space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <dt className="text-muted">status</dt>
              <dd className={ok ? 'text-ok' : loading ? 'text-warn' : 'text-err'}>{loading ? '...' : status || 'ERR'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">itens</dt>
              <dd className="text-soft">{loading ? '...' : (data?.count ?? 0)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">tempo</dt>
              <dd className="text-soft">{loading || ms == null ? '...' : `${ms}ms`}</dd>
            </div>
          </dl>
        </div>

        {/* Tile: GitHub */}
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="panel group flex flex-col justify-between gap-6 p-6 transition-colors hover:border-line-strong hover:bg-raised/70 md:col-span-2"
        >
          <div className="flex items-center justify-between">
            <Github size={18} className="text-accent" aria-hidden="true" />
            <ArrowUpRight size={16} className="text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
          </div>
          <div>
            <p className="label mb-2">código-fonte</p>
            <p className="text-lg font-semibold text-white">Todos os repositórios no GitHub</p>
            <p className="mt-1 font-mono text-xs text-muted">github.com/{profile.githubHandle}</p>
          </div>
        </a>
      </div>
    </section>
  );
}
