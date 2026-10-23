# Project Verification Results

Verified on 2026-10-23 (local).

These results measure the local application. AWS deployment and account
cost remain unverified.

## HTTP integration

Health, custom-track create/list/delete, generation, saved retrieval, history and M3U/JSON/CSV exports passed.
The session used a planned eight-second crossfade without repeats.

## Original and improved engine

For a fair historical comparison, both engines use the original 48-track catalog and three selected genres.
The current catalog contains at least 118 tracks.
Duration error uses seconds. Runtime uses milliseconds and depends on the machine.
The new energy metric integrates three samples per track, so its energy error
is not directly comparable with the original midpoint metric.

Mean duration error across the 12 cases: original 29.1s, improved 6.7s.

| Minutes | Curve | Original duration error | Improved duration error | Original ms | Improved ms |
| --- | --- | ---: | ---: | ---: | ---: |
| 20 | pomodoro_peak | 8 | 8 | 1.74 | 19.71 |
| 20 | linear_ascent | 2 | 2 | 1.65 | 19.15 |
| 20 | wave_interval | 43 | 2 | 1.6 | 20.71 |
| 45 | pomodoro_peak | 21 | 4 | 3.25 | 30.64 |
| 45 | linear_ascent | 39 | 1 | 2.9 | 28.43 |
| 45 | wave_interval | 12 | 25 | 3.23 | 29.42 |
| 90 | pomodoro_peak | 81 | 4 | 4.82 | 66.62 |
| 90 | linear_ascent | 3 | 8 | 4.77 | 52.68 |
| 90 | wave_interval | 4 | 4 | 5.43 | 70.9 |
| 180 | pomodoro_peak | 5 | 8 | 14.46 | 182.16 |
| 180 | linear_ascent | 91 | 5 | 12.76 | 160.76 |
| 180 | wave_interval | 40 | 9 | 12.66 | 200.73 |
