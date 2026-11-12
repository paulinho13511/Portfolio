import { Github } from 'lucide-react';
import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name} · React + Node.js + SQL
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Github size={13} aria-hidden="true" /> github.com/{profile.githubHandle}
        </a>
      </div>
    </footer>
  );
}
