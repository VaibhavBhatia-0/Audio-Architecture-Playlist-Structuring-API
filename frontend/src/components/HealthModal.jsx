import React, { useEffect, useState } from 'react';
import { X, Cpu, Library, HardDrive, Download } from 'lucide-react';
import { fetchHealth } from '../services/api';
import useDialogFocus from './useDialogFocus';

// Turns the /health response into plain-language status for each part of the app.
function describe(health) {
  const browser = health.status?.includes('client-fallback');
  const cloud = !browser && health.storage_mode === 'aws';
  const custom = health.custom_track_count || 0;
  return {
    headline: browser ? 'Running in your browser' : cloud ? 'Connected to cloud services' : 'Connected to the RESONAA API',
    summary: browser
      ? 'Everything works offline on this device. Sessions are planned by the built-in browser optimizer.'
      : cloud
        ? 'Sessions are planned by the Python engine and saved to cloud storage.'
        : 'Sessions are planned by the Python beam-search engine running on this machine.',
    tiles: [
      [Cpu, 'Engine', browser ? 'Browser optimizer' : 'Python beam search', browser ? 'Simplified sequencing' : 'Full transition scoring'],
      [Library, 'Catalog', `${health.catalog_track_count ?? '–'} tracks`, custom ? `${custom} of your own` : 'No custom tracks yet'],
      [HardDrive, 'Storage', browser ? 'This browser' : cloud ? 'Amazon DynamoDB' : 'Local disk',
        cloud ? (health.dynamodb_connected ? 'Connected' : 'Unavailable') : 'History and custom tracks'],
      [Download, 'Exports', browser ? 'Direct download' : cloud ? 'Amazon S3 links' : 'Saved locally',
        cloud ? (health.s3_connected ? 'Connected' : 'Unavailable') : 'M3U, JSON and CSV'],
    ],
  };
}

export default function HealthModal({ isOpen, onClose }) {
  const dialogRef = useDialogFocus(isOpen, onClose);
  const [health, setHealth] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetchHealth().then(data => { if (active) setHealth(data); });
    return () => { active = false; };
  }, [isOpen]);
  if (!isOpen) return null;
  const info = health && describe(health);

  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="health-title" className="dialog-sheet max-w-xl">
      <div className="dialog-head">
        <div>
          <p className="eyebrow">System status</p>
          <h2 id="health-title" className="mt-2 font-display text-2xl font-semibold tracking-tight flex items-center gap-3">
            <span aria-hidden="true" className="relative flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-accent opacity-60 animate-ping motion-reduce:hidden" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-accent" />
            </span>
            {info ? info.headline : 'Checking…'}
          </h2>
          {info && <p className="mt-2 text-sm text-ink-soft max-w-md">{info.summary}</p>}
        </div>
        <button type="button" onClick={onClose} aria-label="Close system status" className="icon-btn"><X size={19} /></button>
      </div>

      <div className="px-6 py-6">
        {!info ? <p role="status" className="py-6 text-sm text-muted">Checking what's running…</p> : (
          <dl className="grid grid-cols-2 border-t border-l border-rule">
            {info.tiles.map(([Icon, label, value, detail]) => (
              <div key={label} className="p-4 border-r border-b border-rule">
                <dt className="flex items-center gap-2 eyebrow"><Icon aria-hidden="true" className="w-3.5 h-3.5" />{label}</dt>
                <dd className="mt-2">
                  <span className="block font-display text-lg font-semibold leading-tight">{value}</span>
                  <span className="block mt-0.5 text-xs text-muted">{detail}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-5 text-xs text-muted leading-relaxed">
          This is a live check, not a promise of uptime. Cloud hosting on AWS isn't live yet; the site runs in the
          browser, and the Python engine is used when its API is reachable.
        </p>
      </div>
    </div>
  </div>;
}
