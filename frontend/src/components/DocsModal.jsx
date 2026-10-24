import React from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import useDialogFocus from './useDialogFocus';
import logoLight from '../../../logos/resonaa-logo-light.png';
import logoDark from '../../../logos/resonaa-logo-dark.png';

const STEPS = [
  ['Shape', 'Choose a length, blend genres and pick an energy curve, or draw your own.'],
  ['Sequence', 'The optimizer orders tracks by tempo, harmonic key and energy fit. In the browser a simpler optimizer runs; the Python beam-search engine takes over when its API is connected.'],
  ['Listen', 'Follow the plan on the energy chart and preview each track with synthesized motifs.'],
  ['Keep', 'Sessions and your own track metadata stay in this browser. Export M3U, JSON or CSV to take the tracklist anywhere; exports list tracks, not audio.'],
];

const STACK = ['React', 'Python', 'Web Audio', 'Browser storage', 'M3U · JSON · CSV', 'GitHub Actions', 'Terraform (AWS, planned)'];

export default function DocsModal({ isOpen, onClose, theme }) {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="docs-title" className="dialog-sheet max-w-3xl">
        <div className="dialog-head items-center">
          <div className="flex items-center gap-4">
            <img src={theme === 'dark' ? logoDark : logoLight} alt="" width="384" height="384" className="w-20 h-20 -my-2 shrink-0" />
            <div>
              <p className="eyebrow">About</p>
              <h2 id="docs-title" className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight">
                Playlists shaped like the <em className="font-normal text-accent">session</em> you want
              </h2>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close about dialog" className="icon-btn self-start"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6 space-y-9 text-sm leading-relaxed">
          <section className="grid sm:grid-cols-[140px_1fr] gap-x-8 gap-y-2">
            <h3 className="eyebrow pt-1">Why it exists</h3>
            <p className="text-base text-ink-soft">
              Long playlists rarely hold a deliberate arc. Shuffle ignores peaks and troughs, hand-curating takes
              ages, and mixing genres often means jarring jumps. RESONAA starts from the feeling you want and
              builds the tracklist to match it.
            </p>
          </section>

          <section className="grid sm:grid-cols-[140px_1fr] gap-x-8 gap-y-3">
            <h3 className="eyebrow pt-1">How it works</h3>
            <ol className="grid sm:grid-cols-2 border-t border-l border-rule">
              {STEPS.map(([title, text], index) => (
                <li key={title} className="p-4 border-r border-b border-rule">
                  <p className="font-mono text-xs text-accent-ink">0{index + 1}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-ink-soft">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid sm:grid-cols-[140px_1fr] gap-x-8 gap-y-3">
            <h3 className="eyebrow pt-1">Built with</h3>
            <ul className="flex flex-wrap gap-2">
              {STACK.map(item => <li key={item} className="chip !py-1 !px-3 !text-xs">{item}</li>)}
            </ul>
          </section>
        </div>

        <div className="px-6 py-4 border-t-[1.5px] border-ink flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted">Made by Vaibhav Bhatia</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/VaibhavBhatia-0/Audio-Architecture-Playlist-Structuring-API" target="_blank" rel="noreferrer"
              className="text-link text-sm inline-flex items-center gap-1">Source <ArrowUpRight aria-hidden="true" className="w-4 h-4" /></a>
            <button type="button" onClick={onClose} className="btn btn-ink btn-small">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
