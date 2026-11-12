import { ArrowRight, Github, Layers, ShieldCheck, Sprout } from 'lucide-react';
import { profile } from '../data/profile.js';

const ICONS = [Layers, ShieldCheck, Sprout];

const PIPELINE = [
  { tag: 'UI', label: 'React' },
  { tag: 'API', label: 'Node.js' },
  { tag: 'DB', label: 'SQL' },
];

export default function Hero() {
  return (
    <section className="pb-16 pt-14 sm:pt-20" aria-labelledby="hero-title">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bloco principal */}
        <div className="panel corners p-6 sm:p-10 lg:col-span-2">
          <p className="label mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-accent">{profile.role}</span>
            <span className="text-line-strong">|</span>
            <span>{profile.education}</span>
          </p>
          <h1 id="hero-title" className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-soft sm:text-lg">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Ver projetos <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent"
            >
              <Github size={16} aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>

        {/* Ficha técnica */}
        <aside className="panel flex flex-col p-6" aria-label="Ficha técnica">
          <p className="label mb-4">spec.sheet</p>
          <dl className="space-y-3 font-mono text-xs">
            {[
              ['função', 'Full-Stack Jr.'],
              ['formação', 'ADS (cursando)'],
              ['camadas', 'UI · API · DB'],
              ['foco', 'Soluções completas'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line pb-2">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right text-soft">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto pt-6">
            <p className="label mb-3">fluxo de dados</p>
            <ol className="flex items-center gap-1.5 font-mono text-[11px]">
              {PIPELINE.map((step, i) => (
                <li key={step.tag} className="flex flex-1 items-center gap-1.5">
                  <span className="flex-1 rounded border border-line bg-raised px-2 py-1.5 text-center">
                    <span className="block text-[9px] text-muted">{step.tag}</span>
                    <span className="text-soft">{step.label}</span>
                  </span>
                  {i < PIPELINE.length - 1 && <span className="text-accent" aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Princípios */}
        {profile.principles.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <article key={p.title} className="panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <Icon size={18} className="text-accent" aria-hidden="true" />
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
              </div>
              <h2 className="mb-2 font-semibold text-white">{p.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{p.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
