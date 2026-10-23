# Audio Architecture and Playlist Structuring API

Repository: https://github.com/VaibhavBhatia-0/Audio-Architecture-Playlist-Structuring-API

The application creates tracklists that follow a requested energy curve while
balancing tempo, musical key, genre affinity and session duration. The hosted
React demo runs in the browser; a more capable Python API works locally. AWS
storage and hosting definitions are retained as a future Terraform template.

## Features

- Seven energy profiles, including a custom curve with a live shape preview.
- Duration-aware Python beam search for local API use; simpler browser optimizer
  for the hosted demo.
- BPM limits, exclusions, repeat control and adjustable genre variety.
- Planned crossfade overlap included in duration, timeline and export metadata.
- Saved sessions that reload the exact generated tracklist.
- Full target curve visualization, measured metrics and feasibility warnings.
- M3U, JSON and CSV exports. The hosted demo builds them in the browser; the
  Python API exports stored playlists when running locally.
- Synthesized previews and a clearly identified browser fallback.
- Four one-click scenario starters (deep work, movement, evening reset and
  open-format mix), plus a custom-track metadata form and catalog exclusions.

The catalog contains 118 deterministic, fictional demonstration metadata records
across seven genres. Custom tracks are stored on local disk with the Python API
or in browser storage in the hosted demo. DynamoDB remains a future template.
The repository does not contain audio recordings. Previews synthesize motifs.
M3U paths require corresponding user-supplied recordings. Crossfade settings plan
overlap; the application does not render an audio mix.

## Interface

The React dashboard uses a light "cue sheet" design: warm paper background,
ink text, one vermillion accent, serif headings (Fraunces), Instrument Sans body
text and JetBrains Mono for figures. Sections are separated by ruled lines
rather than cards, and every colour is a solid token defined in
`frontend/src/index.css`. The layout is:

- an introduction with a numbered list of scenario starters;
- a builder with lettered steps (energy shape, genres, length, fine tuning) and
  a sticky summary column that holds the Generate button;
- results directly below the builder: fit metrics, the energy-over-time chart
  and the tracklist with transition details;
- the custom-track form, a short project overview and a footer.

Keyboard focus is visible throughout, chart points can be focused and played
from the keyboard, dialogs trap focus and close with Escape, and animation
respects reduced-motion settings. At phone width the page does not scroll
sideways; the chart and tracklist scroll within their own areas. Fonts load
from Google Fonts and fall back to system fonts offline.

## Verification

```powershell
python -m unittest discover -s backend/tests -v
python scripts/verify_project.py
node scripts/test_frontend_api.mjs
npm --prefix frontend run lint
npm --prefix frontend run build
terraform -chdir=terraform init -backend=false
terraform -chdir=terraform fmt -check
terraform -chdir=terraform validate
```

The integration verifier starts an isolated gateway, checks custom-track
create/list/delete, generation, retrieval, history and all exports, stops the
gateway, and writes docs/TEST_RESULTS.json and docs/TEST_RESULTS.md. It compares
the original committed engine with the improved engine using identical requests.

On 22 October 2026, 43 backend tests, the HTTP verifier, frontend service tests,
lint and the production build passed locally, and the redesigned interface was
checked in a browser at desktop and phone widths. GitHub CI run #7 on commit
`187b784` (export hardening, API throttling, two-stage deployment and the
interface redesign) passed the backend, frontend and Terraform validation jobs;
both AWS jobs were skipped by the deployment gate. On 24 October 2026,
`terraform fmt -check` and `terraform validate` also passed locally. See the
report for measurements.

## Hosting and future AWS template

The Vercel-ready frontend runs as a browser demo when `VITE_API_BASE_URL` is
unset. Its local optimizer is simpler than the Python beam-search engine; custom
tracks and history stay in that browser. No shared server storage or AWS service
is used by the hosted demo. The Python API remains in the repository for tests
and the future AWS template, but there is no local deployment launcher.

The `terraform/` directory and Python AWS adapters remain as a future cloud
template. AWS deployment is postponed because the required IAM/OIDC setup is
unavailable on the current Free account plan. GitHub Actions runs tests and
Terraform validation only; it cannot plan, apply or destroy AWS resources.
The template still targets `us-east-1` and must be reviewed and changed to the
chosen region before any future deployment. See `docs/AWS_SETUP.md`.



## Documentation

- [Technical design](docs/TECHNICAL_DESIGN_DOCUMENT.md)
- [Mathematical formulation](docs/MATHEMATICAL_FORMULATION.md)
- [API specification](docs/API_SPECIFICATION.md)
- [Measured test results](docs/TEST_RESULTS.md)
- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [AWS account setup](docs/AWS_SETUP.md)
- [Deployment status](DEPLOYMENT.md)
- [Frontend notes](frontend/README.md)
