# DPS Whitefield — Attendance System

A mobile-friendly attendance system for DPS Whitefield In-House students.  
Teachers open a URL on their phone, mark absent students, and submit. The record updates instantly.

---

## Live URL

**https://physics4noobs.github.io/Attendance/**

---

## How It Works

```
Teacher opens URL on phone
        ↓
Selects batch → sees student list (all Present by default)
        ↓
Toggles absent students → hits Submit
        ↓
Browser sends data to Google Apps Script (Web App)
        ↓
Apps Script writes P/A into its own JSON data store (in Drive)
        ↓
Everyone's phone stays in sync via the same backend
```

There is no Google Sheet involved — attendance lives entirely in a JSON file
that the Apps Script manages in its own Drive, not something anyone opens
and edits by hand. If a spreadsheet view is ever needed again (e.g. to hand
management a live report), that can be built as a one-off export — just ask.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The attendance webpage (what teachers see on their phone) |
| `Code.gs` | Google Apps Script — receives submissions and reads/writes the data store |
| `README.md` | This file |

---

## Key IDs & URLs

| Item | Value |
|---|---|
| Apps Script Web App URL | `https://script.google.com/macros/s/AKfycbxnF5JmMEb_fx9turFYNiRJNgN2mptZnR6bhRMQxriR5n9E8za5xbsdXK6ppxfVsXai/exec` |
| GitHub Repo | https://github.com/physics4noobs/Attendance |
| Live Website | https://physics4noobs.github.io/Attendance/ |

The attendance data file itself lives in the Apps Script's Drive and doesn't
need a fixed ID checked into this repo — its ID is cached automatically the
first time the script runs (in Script Properties). Run `logStoreInfo()` from
the Apps Script editor any time to print a link to it (e.g. to download a
backup copy).

---

## Batches & Student Counts

| Batch | STUDENTS key | Students |
|---|---|---|
| XI – Advance A | `XI-Adv A` | 34 |
| XI – Advance B | `XI-Adv B` | 28 |
| XI – Mains | `XI-Mains` | 26 |
| XI – NEET | `XI-NEET` | 25 |
| Grade X | `Grade X` | 6 |
| Grade IX | `Grade IX` | 18 |

---

## Data Store Structure

The JSON file (one per academic year) looks like:

```json
{
  "XI-Adv A": {
    "dates": ["02-Jun-2026", "03-Jun-2026", ...],
    "students": { "Student Name": ["P", "A", ...], ... }
  },
  "XI-Adv B": { "dates": [...], "students": {...} },
  ...
  "submitted": { "02-Jun-2026": ["XI-Adv A", "XI-NEET"], ... }
}
```

Each student's record array is always the same length as that batch's
`dates` array — a new date column is appended (never inserted) whenever a
teacher submits for a date that doesn't exist yet, and resubmitting for the
same date overwrites that column instead of creating a new one.

---

## How to Make Changes

### Add a new student to a batch

1. Open `index.html` — find the `STUDENTS` object in the `<script>` section
2. Add the student name to the correct batch array
3. Open `Code.gs` — find the same `STUDENTS` object and add the name there too
4. Push the updated `index.html` to GitHub (see *Deploying Changes* below)
5. Re-deploy the Apps Script (see *Re-deploying Apps Script* below)

The student's attendance history starts blank going forward — there's
nothing to touch in a spreadsheet.

### Remove a student

Remove them from the `STUDENTS` object in both `index.html` and `Code.gs`,
then push and re-deploy. Their historical P/A record stays in the data
store (harmless, just no longer shown) unless you want it cleaned up.

### Move a student between batches

1. Move their name in `STUDENTS` in both `index.html` and `Code.gs`
2. If you want their attendance history to move with them, that requires a
   small one-off script run from the Apps Script editor — ask for it rather
   than hand-editing the JSON file.
3. Push and re-deploy

### Add a new batch

1. Add the batch to the `STUDENTS` object in both `index.html` and `Code.gs`
2. Add a new batch card in the HTML (copy an existing card block)
3. Push and re-deploy — the batch's entry in the data store is created
   automatically the first time attendance is submitted for it

### Change a student's name

1. Fix it in `index.html` → `STUDENTS` object
2. Fix it in `Code.gs` → `STUDENTS` object
3. Push and re-deploy

Note: this makes their old attendance history "orphaned" under the old
spelling in the data store, since lookups match by exact name. Ask if you
want that history renamed over.

---

## Deploying Changes to the Website

After editing `index.html`, run these commands in Terminal:

```bash
cd "/Users/sankaracharyadutta/Desktop/Teaching/DPS PROGRAM/Attendance/attendance-system"
git add index.html
git commit -m "describe what you changed"
git push
```

The live URL updates automatically within 1–2 minutes.

---

## Re-deploying Apps Script

After editing `Code.gs`:

1. Open **script.google.com** and open this project (or open it from the
   Apps Script editor you already have it in)
2. Paste the updated `Code.gs` contents
3. Click **Deploy → Manage deployments**
4. Click the pencil ✏️ icon on the existing deployment
5. Change version to **New version**
6. Click **Deploy**

> ⚠️ Do NOT create a new deployment — always update the existing one, otherwise the URL in `index.html` will be wrong.

---

## How the Tick Marks Work

The webpage stores which batches have been submitted today in the browser's `localStorage`.  
The key is `dps_done_DD-Mon-YYYY` (e.g. `dps_done_02-Jun-2026`).  
Every new day the key changes, so all tick marks automatically reset.  
On load, the page also asks the backend which batches have already submitted
today (`syncSubmittedState()`), so a teacher opening the app on a second
phone still sees the correct ticks.

---

## How Attendance is Written

When a teacher submits:
- The Apps Script looks for a date matching today's date in the batch's `dates` list
- If it doesn't exist yet, it's appended as a new entry
- Every student's record array is written to at that same position
- If attendance is submitted twice for the same date, it **overwrites** the first entry (useful for corrections) — it does not create a duplicate date

---

## Sharing with Management

There's currently no live spreadsheet view for management to check in on
(that went away along with the Google Sheet). If a report or live dashboard
is needed again, ask — it can be built as a one-off Sheet export from the
data store, or a small read-only page, without going back to storing
attendance in Sheets day-to-day.

---

## Academic Year

2025–26. When the new year starts, either wipe the existing data file (run
a small reset script from the Apps Script editor) or let a fresh one get
created automatically — ask, since there's no `SPREADSHEET_ID` to swap out
anymore.
