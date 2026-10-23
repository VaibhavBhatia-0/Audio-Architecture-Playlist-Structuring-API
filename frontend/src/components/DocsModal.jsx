import React from 'react';
import { X } from 'lucide-react';
import useDialogFocus from './useDialogFocus';

const MODULES = [
  ['User interface', 'Target duration, genres, energy peaks and optimizer weights, set through this React dashboard.'],
  ['Audio architecture engine', 'This browser demo uses a simpler local optimizer. The tested Python beam-search engine remains available locally; AWS deployment is deferred.'],
  ['Data and storage', 'Browser demo playlists and custom track metadata stay in this browser. Terraform retains DynamoDB and S3 definitions as a future cloud template.'],
  ['Export and integration', 'Packages tracklists as Extended M3U, JSON and CSV. Exports do not contain audio recordings.'],
];

const SERVICES = ['Vercel-ready React frontend', 'Browser storage', 'Browser playlist engine', 'Python API for local use', 'Terraform template', 'GitHub Actions CI'];

export default function DocsModal({ isOpen, onClose }) {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="docs-title" className="dialog-sheet max-w-3xl">
        <div className="dialog-head">
          <div>
            <p className="eyebrow">About the project</p>
            <h2 id="docs-title" className="mt-1 font-display text-2xl font-semibold tracking-tight">Audio Architecture System</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close documentation dialog" className="icon-btn"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6 space-y-8 text-sm leading-relaxed">
          <section>
            <h3 className="font-display text-xl font-semibold">Problem</h3>
            <p className="mt-2 text-ink-soft">
              Long, continuous playlists rarely hold a deliberate energy curve. Manual curation is slow, shuffles
              ignore peaks and troughs, and blending genres such as classical piano, indie pop and hip-hop often
              produces jarring transitions.
            </p>
          </section>

          <section>
            <h3 className="font-display text-xl font-semibold">Four modules</h3>
            <ol className="mt-3 border-t border-rule">
              {MODULES.map(([title, text], index) => (
                <li key={title} className="flex gap-4 py-3 border-b border-rule">
                  <span className="font-mono text-xs text-accent-ink pt-1">0{index + 1}</span>
                  <span><strong className="font-semibold">{title}.</strong> <span className="text-ink-soft">{text}</span></span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="font-display text-xl font-semibold">Current demo and future tooling</h3>
            <p className="mt-2 font-mono text-xs text-ink-soft">{SERVICES.join(' / ')}</p>
          </section>
        </div>

        <div className="px-6 py-4 border-t-[1.5px] border-ink flex justify-end">
          <button type="button" onClick={onClose} className="btn btn-ink btn-small">Close</button>
        </div>
      </div>
    </div>
  );
}
