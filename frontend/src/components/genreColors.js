// Earthy, print-like genre colours shared by the chips, chart and tracklist.
// Values are CSS variables (defined in index.css) so the dark theme can lift them.
export const GENRE_COLORS = {
  "Contemporary Classical Piano": "var(--genre-classical)",
  "Indie Pop": "var(--genre-indie-pop)",
  "Hip-Hop": "var(--genre-hip-hop)",
  "Ambient": "var(--genre-ambient)",
  "Deep House": "var(--genre-deep-house)",
  "Synthwave": "var(--genre-synthwave)",
  "Neo-Soul": "var(--genre-neo-soul)"
};

export const genreColor = (genre) => GENRE_COLORS[genre] || "var(--color-muted)";
