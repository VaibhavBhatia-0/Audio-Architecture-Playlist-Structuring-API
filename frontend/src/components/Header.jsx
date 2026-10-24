import React from 'react';
import { Moon, Sun } from 'lucide-react';
// Logos live in the repository's logos/ folder and are bundled at build time.
import logoLight from '../../../logos/resonaa-logo-light.png';
import logoDark from '../../../logos/resonaa-logo-dark.png';

export default function Header({ onOpenHistory, onOpenHealth, onOpenDocs, theme, onToggleTheme }) {
  const links = [
    { label: 'History', onClick: onOpenHistory, title: 'View saved generation history' },
    { label: 'System status', onClick: onOpenHealth, title: 'View runtime and infrastructure status' },
    { label: 'About', onClick: onOpenDocs, title: 'How RESONAA works' },
  ];

  return (
    <header className="border-b-[1.5px] border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        {/* The full RESONAA artwork is the logo, with a transparent background so it
            sits on every palette; dark mode uses a cut with light lettering. */}
        <h1 className="m-0">
          <img src={theme === 'dark' ? logoDark : logoLight}
            alt="RESONAA: plan the flow, hear the shape" width="384" height="384"
            className="w-24 h-24 sm:w-28 sm:h-28 -my-3" />
        </h1>

        <nav aria-label="Tools" className="flex items-center gap-5 text-sm">
          {links.map(link => (
            <button key={link.label} type="button" onClick={link.onClick} title={link.title}
              className="font-medium hover:text-accent-ink underline-offset-4 hover:underline">
              {link.label}
            </button>
          ))}
          <button type="button" onClick={onToggleTheme} className="icon-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? <Sun aria-hidden="true" className="w-4 h-4" /> : <Moon aria-hidden="true" className="w-4 h-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
