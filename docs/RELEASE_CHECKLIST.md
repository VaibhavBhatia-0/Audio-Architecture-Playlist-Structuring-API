# Release Checklist

The application, infrastructure definitions and measured test report are in
this repository. On 24 October 2026, 43 backend tests, HTTP integration,
frontend service tests, lint/build and a browser check of the interface passed
locally. The current release target is a Vercel-hosted browser demo. AWS
deployment is deferred; Terraform is retained as a future template.

## Browser demo release evidence

1. Confirm the backend, frontend and Terraform CI jobs pass on `main`.
   Repository source lives on `main` at
   `https://github.com/VaibhavBhatia-0/Audio-Architecture-Playlist-Structuring-API`.
2. Import `main` into Vercel with **Root Directory** set to the repository root
   (`./`), **Framework Preset** set to **Other**, and no `VITE_API_BASE_URL`.
   Root `vercel.json` provides the install/build commands and `frontend/dist`
   output directory. Do not choose `frontend` as the Vercel root: its build
   imports the demonstration catalog from `backend/`.
3. Check the live page at desktop and phone widths. Generate playlists, add and
   remove custom metadata, reload browser history and download M3U/JSON/CSV.
4. Record the Vercel URL and screenshots. Label the optimizer as the simpler
   browser mode; do not imply that it is the Python beam search.
5. Keep AWS deployment and cost claims explicitly pending. If cloud deployment
   is resumed later, follow [AWS setup](AWS_SETUP.md) and verify live services.

No Vercel URL or AWS deployment has been verified in this repository yet.

## Walkthrough

Start from a scenario in the numbered list, then switch to the custom curve and
check its live shape preview. Set genres and BPM bounds; the Cue sheet column
summarizes the session.
Exclude a track, generate, inspect the fit metrics, chart and transitions, reload
the saved session from History and export M3U, JSON and CSV. Previews
synthesize motifs, and M3U references require supplied recordings.
Then add a fictional custom song, select its genre, generate a second session,
and remove it from the live catalog. Saved playlists retain their snapshots.
