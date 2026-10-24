import React, { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

// Feature rows alternate text and illustration sides, like a product landing page.
const FEATURES = [
  {
    kicker: 'Shape',
    title: 'Draw the energy, not the tracklist',
    text: 'Pick a preset energy curve or plot your own points. Every session follows a shape: a focused rise, an interval workout, a slow wind-down.',
    art: CurveArt,
  },
  {
    kicker: 'Blend',
    title: 'Transitions that make sense',
    text: 'Tracks are ordered by tempo, harmonic key and energy fit, so each song flows into the next, even across genres, without a jarring jump.',
    art: TransitionArt,
  },
  {
    kicker: 'Fit',
    title: 'Lands on the length you asked for',
    text: 'Choose 15 minutes to three hours. Planned crossfades count toward the runtime, and every session reports how close it got to the target.',
    art: TimelineArt,
  },
  {
    kicker: 'Keep',
    title: 'Save it, export it, bring your own songs',
    text: 'Sessions stay in your history. Export M3U, JSON or CSV, add your own track metadata, and preview the shape with synthesized motifs.',
    art: ExportArt,
  },
];

// Fades and lifts each marked element once as it scrolls into view. Without
// IntersectionObserver, or with reduced motion, content simply stays visible.
function useReveal() {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = root.querySelectorAll('[data-reveal]');
    items.forEach(item => item.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return rootRef;
}

export default function ProductTour({ onStart }) {
  const rootRef = useReveal();
  return (
    <section ref={rootRef} id="how-it-works" aria-labelledby="tour-title" className="border-t-[1.5px] border-ink pt-12">
      <div data-reveal className="max-w-2xl">
        <p className="eyebrow">How it works</p>
        <h2 id="tour-title" className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
          A playlist builder that thinks in <em className="font-normal text-accent">arcs</em>.
        </h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          RESONAA plans a listening session the way a DJ would: start from the feeling you want, then
          let the sequencer pick and order tracks to match it.
        </p>
      </div>

      <div className="mt-14 space-y-16 sm:space-y-24">
        {FEATURES.map(({ kicker, title, text, art: Art }, index) => {
          const flip = index % 2 === 1;
          return (
            <article key={kicker} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div data-reveal data-from={flip ? 'right' : 'left'} className={flip ? 'md:order-2' : ''}>
                <p className="font-mono text-xs text-accent-ink">0{index + 1} · {kicker}</p>
                <h3 className="mt-2 font-display text-3xl font-medium leading-tight">{title}</h3>
                <p className="mt-3 text-ink-soft leading-relaxed max-w-md">{text}</p>
              </div>
              <div data-reveal data-from={flip ? 'left' : 'right'} className={flip ? 'md:order-1' : ''}>
                <div className="bg-paper-deep border-[1.5px] border-ink p-6 sm:p-8">
                  <Art />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div data-reveal className="mt-20 py-10 border-y-[1.5px] border-ink flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl font-semibold tracking-tight">Ready when you are.</h3>
          <p className="mt-1 text-sm text-ink-soft">Pick a scenario or start from scratch. It takes a few seconds.</p>
        </div>
        <button type="button" onClick={onStart} className="btn btn-ink self-start sm:self-auto">
          Build a session <ArrowUp aria-hidden="true" className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

// Illustrations use palette tokens so they follow the mood and theme.
function CurveArt() {
  const points = [[0, 70], [40, 62], [80, 30], [130, 22], [180, 26], [230, 34], [280, 72]];
  const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  return (
    <svg viewBox="0 0 280 96" className="w-full h-auto" role="img" aria-label="An energy curve rising to a peak and easing down">
      {[24, 48, 72].map(y => <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="var(--color-rule)" />)}
      <path d="M0 74 C 60 70, 70 24, 130 22 S 230 30, 280 74" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
      <path d={path} fill="none" stroke="var(--color-ink)" strokeWidth="1.25" strokeDasharray="3 4" />
      {points.map(([x, y]) => <circle key={x} cx={x} cy={y} r="4.5" fill="var(--color-ink)" stroke="var(--color-paper-deep)" strokeWidth="2" />)}
    </svg>
  );
}

function TransitionArt() {
  // Well-known songs as an illustration only; tempo and key are approximate.
  const tracks = [
    ['Billie Jean', 'Michael Jackson', 117, '11A'],
    ['Get Lucky', 'Daft Punk, Pharrell Williams', 116, '11A'],
    ["Don't Start Now", 'Dua Lipa', 124, '10A'],
  ];
  return (
    <div>
      <ol className="space-y-1" aria-label="Three songs ordered by close tempo and neighbouring keys">
        {tracks.map(([title, artist, bpm, key], i) => {
          const next = tracks[i + 1];
          return (
            <li key={title}>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-full bg-ink text-paper grid place-items-center font-mono text-xs font-semibold">{key}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-medium truncate">{title}</span>
                  <span className="block text-xs text-muted truncate">{artist}</span>
                </span>
                <span className="font-mono text-xs text-ink-soft shrink-0">{bpm} BPM</span>
              </div>
              {next && (
                <div className="ml-5 pl-8 border-l-[1.5px] border-dashed border-accent py-2 font-mono text-[.7rem] text-accent-ink">
                  {next[2] - bpm > 0 ? '+' : ''}{next[2] - bpm} BPM · {next[3] === key ? 'same key' : 'neighbouring key'}
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-[.7rem] text-muted">Example songs; tempo and key are approximate. The built-in catalog uses fictional tracks.</p>
    </div>
  );
}

function TimelineArt() {
  // Six tracks across a 45-minute target, each overlapping the next by a planned crossfade.
  const tracks = [[0, 7.8], [7.4, 14.2], [13.8, 22.1], [21.7, 28.6], [28.2, 36.8], [36.4, 44.87]];
  const x = minutes => 14 + minutes * (272 / 45);
  const bars = (start, end, seed) => {
    const out = [];
    for (let px = x(start) + 4; px < x(end) - 3; px += 3.2) {
      const h = 6 + Math.abs(Math.sin(px * .37 + seed) * 14 + Math.sin(px * .11 + seed * 2) * 6);
      out.push(<rect key={px} x={px} y={50 - h / 2} width="1.6" height={h} rx=".8" fill="var(--color-paper)" fillOpacity=".7" />);
    }
    return out;
  };
  return (
    <svg viewBox="0 0 300 112" className="w-full h-auto" role="img" aria-label="Six tracks with small crossfade overlaps fill a 45 minute target, ending at 44 minutes 52 seconds">
      {tracks.map(([start, end], i) => (
        <g key={start}>
          <rect x={x(start)} y="30" width={x(end) - x(start)} height="40" rx="7"
            fill={i % 2 ? 'var(--color-ink-soft)' : 'var(--color-accent)'} fillOpacity={i % 2 ? .9 : 1} />
          {bars(start, end, i + 1)}
        </g>
      ))}
      {tracks.slice(1).map(([start], i) => (
        <path key={start} d={`M${x(start)} 30 L${x(tracks[i][1])} 70 M${x(tracks[i][1])} 30 L${x(start)} 70`}
          stroke="var(--color-paper)" strokeWidth="1.2" />
      ))}
      <line x1={x(45)} x2={x(45)} y1="16" y2="84" stroke="var(--color-ink)" strokeDasharray="2 3" />
      <text x={x(45)} y="11" textAnchor="end" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fill="var(--color-muted)">target 45:00</text>
      <line x1="14" x2="286" y1="84" y2="84" stroke="var(--color-rule)" />
      {[0, 15, 30, 45].map(m => (
        <g key={m}>
          <line x1={x(m)} x2={x(m)} y1="82" y2="87" stroke="var(--color-muted)" />
          <text x={x(m)} y="98" textAnchor={m === 0 ? 'start' : m === 45 ? 'end' : 'middle'} fontSize="8.5"
            fontFamily="JetBrains Mono, monospace" fill="var(--color-muted)">{m}:00</text>
        </g>
      ))}
      <circle cx={x(44.87)} cy="84" r="3.2" fill="var(--color-accent)" />
      <text x="14" y="16" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fill="var(--color-accent-ink)">ends 44:52 · 99.7% of target</text>
    </svg>
  );
}

function ExportArt() {
  return (
    <div className="grid grid-cols-3 gap-3" role="img" aria-label="Three export files: M3U, JSON and CSV">
      {['M3U', 'JSON', 'CSV'].map((format, i) => (
        <div key={format} className={`aspect-[3/4] border-[1.5px] border-ink flex flex-col justify-between p-3 ${i === 0 ? 'bg-ink text-paper' : 'bg-paper'}`}>
          <span className="space-y-1.5">
            {[80, 60, 70].map(w => <span key={w} className="block h-1 bg-current opacity-30" style={{ width: `${w}%` }} />)}
          </span>
          <span className="font-mono text-xs font-semibold">.{format.toLowerCase()}</span>
        </div>
      ))}
    </div>
  );
}
