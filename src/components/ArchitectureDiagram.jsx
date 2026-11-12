import { ArrowDown, ArrowRight, Database, Monitor, Server } from 'lucide-react';

const ICONS = { client: Monitor, api: Server, database: Database };
const PROTOCOL = ['HTTP / JSON', 'SQL'];

/** Diagrama React Client -> Node.js API -> SQL Database (vertical no mobile, horizontal no desktop). */
export default function ArchitectureDiagram({ nodes }) {
  return (
    <figure aria-label="Diagrama de arquitetura">
      <ol className="flex flex-col items-stretch gap-2 md:flex-row">
        {nodes.map((node, i) => {
          const Icon = ICONS[node.layer] ?? Server;
          return (
            <li key={node.layer} className="contents">
              <div className="corners flex-1 rounded-lg border border-line bg-raised p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon size={15} className="text-accent" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold text-white">{node.label}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted">{node.detail}</p>
              </div>
              {i < nodes.length - 1 && (
                <div className="flex shrink-0 items-center justify-center gap-2 py-1 md:flex-col md:self-center md:gap-1 md:px-1 md:py-0" aria-hidden="true">
                  <ArrowDown size={14} className="text-accent md:hidden" />
                  <ArrowRight size={14} className="hidden text-accent md:block" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted">{PROTOCOL[i]}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-3 font-mono text-[11px] text-muted">
        {nodes.map((n) => n.label).join('  ->  ')}
      </figcaption>
    </figure>
  );
}
