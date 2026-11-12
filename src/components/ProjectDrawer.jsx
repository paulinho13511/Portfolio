import { useEffect, useRef } from 'react';
import { Check, Github, X } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram.jsx';

const STACK_LABELS = { frontend: 'Frontend', backend: 'Backend', database: 'Banco de dados' };

export default function ProjectDrawer({ project, onClose }) {
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="absolute inset-0 animate-fade-in bg-ink/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <aside className="absolute inset-y-0 right-0 flex w-full max-w-2xl animate-slide-in flex-col border-l border-line bg-panel shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
          <p className="truncate font-mono text-[11px] text-muted">
            GET /api/projects?id=<span className="text-accent">{project.id}</span>
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded border border-line p-1.5 text-muted transition-colors hover:border-line-strong hover:text-white"
            aria-label="Fechar detalhes do projeto"
          >
            <X size={16} />
          </button>
        </header>

        <div className="flex-1 space-y-10 overflow-y-auto px-5 py-8 sm:px-8">
          <section>
            <p className="label mb-2">{project.category}</p>
            <h2 id="drawer-title" className="text-3xl font-semibold tracking-tight text-white">
              {project.name}
            </h2>
            <p className="mt-2 text-soft">{project.tagline}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">{project.description}</p>
          </section>

          <section>
            <h3 className="label mb-4">arquitetura</h3>
            <ArchitectureDiagram nodes={project.architecture} />
          </section>

          <section>
            <h3 className="label mb-4">destaques técnicos</h3>
            <ul className="space-y-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-soft">
                  <Check size={16} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="label mb-4">tecnologias</h3>
            <dl className="divide-y divide-line rounded-lg border border-line">
              {Object.entries(project.stack).map(([layer, items]) => (
                <div key={layer} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                  <dt className="w-36 shrink-0 font-mono text-xs text-muted">{STACK_LABELS[layer] ?? layer}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {items.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <footer className="border-t border-line px-5 py-4 sm:px-8">
          <a
            href={project.links.repository}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
          >
            <Github size={16} aria-hidden="true" /> Ver no GitHub
          </a>
        </footer>
      </aside>
    </div>
  );
}
