# DPS Whitefield — Attendance System

A mobile-friendly attendance system for DPS Whitefield In-House students.  
Teachers open a URL on their phone, mark absent students, and submit. The Google Sheet updates instantly.

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
Apps Script writes P/A into the Google Sheet
        ↓
Management sees live updates in the Sheet
```

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The attendance webpage (what teachers see on their phone) |
| `Code.gs` | Google Apps Script — receives submissions and writes to the Sheet |
| `README.md` | This file |

---

## Key IDs & URLs

| Item | Value |
|---|---|
| Google Sheet ID | `1WqKUyIF_DXoFtwtc1vU1hi_2ryXJ-mAt9DsHMPbP4Ug` |
| Google Sheet URL | https://docs.google.com/spreadsheets/d/1WqKUyIF_DXoFtwtc1vU1hi_2ryXJ-mAt9DsHMPbP4Ug/edit |
| Apps Script Web App URL | `https://script.google.com/macros/s/AKfycbxnF5JmMEb_fx9turFYNiRJNgN2mptZnR6bhRMQxriR5n9E8za5xbsdXK6ppxfVsXai/exec` |
| GitHub Repo | https://github.com/physics4noobs/Attendance |
| Live Website | https://physics4noobs.github.io/Attendance/ |

---

## Batches & Student Counts

| Batch | Sheet Tab | Students |
|---|---|---|
| XI – Advance A | `XI-Adv A` | 36 |
| XI – Advance B | `XI-Adv B` | 27 |
| XI – Mains | `XI-Mains` | 25 |
| XI – NEET | `XI-NEET` | 26 |
| Grade X | `Grade X` | 4 |
| Grade IX | `Grade IX` | 14 |

---

## Google Sheet Structure

Each batch tab has:
- **Row 1** — Colour banner with batch name
- **Row 2** — Info strip (student count + legend)
- **Row 3** — Column headers: `STUDENT NAME` | dates... (frozen)
- **Row 4 onwards** — Student names | P or A per date

Columns are added automatically each day when the first submission comes in.  
`P` = green background, `A` = red background (via conditional formatting rules set on the sheet).

---

## How to Make Changes

### Add a new student to a batch

1. Open `index.html` — find the `STUDENTS` object in the `<script>` section
2. Add the student name to the correct batch array
3. Open `Code.gs` — find the same `STUDENTS` object and add the name there too
4. In the Google Sheet, manually add the student name in column A of the correct tab (after the last student)
5. Push the updated `index.html` to GitHub (see *Deploying Changes* below)
6. Re-deploy the Apps Script (see *Re-deploying Apps Script* below)

### Remove a student

Same as above — remove from `index.html`, `Code.gs`, and the Sheet.

### Add a new batch

1. Add the batch to the `STUDENTS` object in both `index.html` and `Code.gs`
2. Add the batch colour in the `BATCH_COLORS` object in `Code.gs`
3. Add a new batch card in the HTML (copy an existing card block)
4. Run `setupAttendanceSheet()` again from Apps Script — it will create the new tab
5. Push and re-deploy

### Change a student's name

1. Fix it in `index.html` → `STUDENTS` object
2. Fix it in `Code.gs` → `STUDENTS` object
3. Fix it in the Google Sheet column A
4. Push and re-deploy

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

1. Open the Google Sheet → **Extensions → Apps Script**
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
This means tick marks are per-device — if a teacher submits on their phone, only their phone shows the tick.

---

## How Attendance is Written to the Sheet

When a teacher submits:
- The Apps Script looks for a column in Row 3 matching today's date (e.g. `02-Jun-2026`)
- If that column doesn't exist yet, it creates one with navy header formatting
- It matches each student name from the submission to column A in the sheet
- Writes `P` or `A` into the correct cell
- If attendance is submitted twice on the same day, it **overwrites** the first entry (useful for corrections)

---

## Sharing with Management

Open the Google Sheet → click **Share** → add their email as **Viewer**.  
They will see live updates in real time without being able to edit.

---

## Academic Year

2025–26. When the new year starts, create a fresh Google Sheet and update the `SPREADSHEET_ID` in `Code.gs`, then re-deploy.
