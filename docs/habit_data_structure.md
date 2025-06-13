## Habit Data Structure Documentation

Document describes the structure and meaning of the habit tracking data model used in the application.

---

### 1. Habit Definitions

Each habit is represented as an object with the following fields:

```json
{
  "id": "1",
  "title": "Drink Water",
  "description": "Drink at least 8 glasses of water",
  "createdAt": "2025-06-01T09:00:00.000Z"
}
```

#### Fields:

* `id` (string): Unique identifier for the habit.
* `title` (string): The name of the habit.
* `description` (string): A short explanation of what the habit is.
* `createdAt` (ISO 8601 date string): Timestamp of when the habit was created.

---

### 2. Habit Statuses

The completion status of habits is tracked separately in a history structure:

```json
{
  "habitId": 1,
  "statuses": [
    {
      "date": "2025-06-01T09:00:00.000Z",
      "status": "DONE"
    },
    {
      "date": "2025-08-01T09:00:00.000Z",
      "status": "DONE"
    }
  ]
}
```

#### Fields:

* `habitId` (number): ID of the corresponding habit.
* `statuses` (array): A list of status entries for the habit.

Each `status` object contains:

* `date` (ISO 8601 date string): The date when the status was recorded.
* `status` (string): The recorded status of the habit. Allowed values:

    * `PENDING`: Habit has not been attempted.
    * `IN_PROGRESS`: Habit was partially completed.
    * `DONE`: Habit was successfully completed.
