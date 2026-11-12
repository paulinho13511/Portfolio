import { Database, Monitor, Server } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { stackLayers } from '../data/profile.js';

const ICONS = { frontend: Monitor, backend: Server, database: Database };

export default function StackLayers() {
  return (
    <section id="stack" className="py-16" aria-labelledby="stack-title">
      <SectionHeader
        index="02"
        route="stack.layers"
        title={<span id="stack-title">Camadas de Stack</span>}
        description="Cada camada tem uma responsabilidade clara. Domino as três para entregar uma funcionalidade inteira, da tabela à tela."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {stackLayers.map((layer, i) => {
          const Icon = ICONS[layer.id];
          return (
            <article key={layer.id} className="panel corners relative flex flex-col p-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Icon size={18} className="text-accent" aria-hidden="true" />
                  <h3 className="font-semibold text-white">{layer.title}</h3>
                </span>
                <span className="rounded border border-accent-dim bg-accent-dim/40 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                  {layer.index}
                </span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted">{layer.summary}</p>

              <ul className="mt-auto space-y-1.5">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between rounded border border-line bg-raised/60 px-3 py-2 font-mono text-xs text-soft"
                  >
                    {item}
                    <span className="h-1 w-1 rounded-full bg-accent/70" aria-hidden="true" />
                  </li>
                ))}
              </ul>

              {i < stackLayers.length - 1 && (
                <span
                  className="absolute -right-[13px] top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink font-mono text-[10px] text-accent md:flex"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
