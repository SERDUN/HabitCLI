# HabitCLI – Console Habit Tracker

A lightweight CLI tool for managing and tracking habits using local JSON storage.

## Usage

Run the app with:

```bash
npm run start -- <command> [options]
```

## Commands

### Add a new habit

```bash
npm run start -- add --name "Meditation" --freq day
```

- `--name` – name of the habit (required)
- `--freq` – frequency: `day`, `week`, or `monthly`

---

### List all habits

```bash
npm run start -- list
```

---

### Find a habit by ID

```bash
npm run start -- get --id "29905796"
```

---

### Update a habit

```bash
npm run start -- update --id "29905796" --name "Morning meditation" --freq weekly
```

---

### Delete a habit

```bash
npm run start -- delete --id "29905796"
```

---

### Mark habit as done for today

```bash
npm run start -- done --id "29905796"
```

---

### Show stats for a specific habit (within a date range)

```bash
npm run start -- stats --id "29905796" --from 2025-06-01 --to 2025-06-17
```

---

### Show stats for all habits (within a date range)

```bash
npm run start -- stats:all --from 2025-06-01 --to 2025-06-17
```


---

## Data Storage

Data is stored locally in JSON files:

- `habits.json`
- `tracking.json`

---

## Environment Variables && Configuration

You can configure default date behavior using a `.env` file or by setting environment variables directly:

- `DAY_OFFSET=0` — how many days to shift "today" (0 = today, 1 = tomorrow, -1 = yesterday)
- `RANGE_DAYS=30` — default date range length in days
- `TO_DATE=` — optional fixed end date (ISO format)

```env
# Number of days to shift "today" when calculating date ranges.
# For example: 0 = today, 1 = tomorrow, -1 = yesterday.
DAY_OFFSET=-16

# Number of days in the default date range.
# If RANGE_DAYS=7 and DAY_OFFSET=0, the range is: from=today, to=+6 days.
RANGE_DAYS=30

# Optional override for the end date of the range.
# If provided, it overrides the calculated "to" date.
# Format: YYYY-MM-DD or full ISO (e.g., 2025-06-30 or 2025-06-30T00:00:00Z)
TO_DATE=

## Running tests
```