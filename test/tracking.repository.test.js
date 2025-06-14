import test from 'node:test';
import assert from 'node:assert/strict';
import {writeFileSync, unlinkSync, existsSync} from 'fs';
import {resolve} from 'path';
import {JsonListDataSource} from "../src/datasources/index.js";
import {TrackingRepository} from "../src/repository/tracking.repository.js";

const testFile = 'tracking.test.json';
const fullPath = resolve('assets', testFile);

function resetTestFile() {
    writeFileSync(fullPath, '[]', 'utf-8');
}

test('TrackingRepository - getStatusesByHabitId returns empty if none exist', async () => {
    resetTestFile();
    const repo = new TrackingRepository(new JsonListDataSource(testFile));
    const result = await repo.getStatusesByHabitId('habit-1');
    assert.deepEqual(result, {habitId: 'habit-1', statuses: []});
});

test('TrackingRepository - addStatus creates new entry', async () => {
    resetTestFile();
    const repo = new TrackingRepository(new JsonListDataSource(testFile));
    await repo.addStatus('habit-1', {date: '2025-06-14', status: 'done'});

    const result = await repo.getStatusesByHabitId('habit-1');
    assert.equal(result.statuses.length, 1);
    assert.equal(result.statuses[0].status, 'done');
});

test('TrackingRepository - updateStatus updates existing entry', async () => {
    resetTestFile();
    const repo = new TrackingRepository(new JsonListDataSource(testFile));

    await repo.addStatus('habit-1', {date: '2025-06-14', status: 'skipped'});
    await repo.updateStatus('habit-1', '2025-06-14', 'done');

    const result = await repo.getStatusesByHabitId('habit-1');
    assert.equal(result.statuses[0].status, 'done');
});

test('TrackingRepository - getAllStatuses returns all entries', async () => {
    resetTestFile();
    const repo = new TrackingRepository(new JsonListDataSource(testFile));
    await repo.addStatus('habit-1', {date: '2025-06-14', status: 'done'});
    await repo.addStatus('habit-2', {date: '2025-06-15', status: 'skipped'});

    const all = await repo.getAllStatuses();
    assert.equal(all.length, 2);
});

test('TrackingRepository - cleanup test file', () => {
    if (existsSync(fullPath)) unlinkSync(fullPath);
    assert.ok(!existsSync(fullPath));
});
