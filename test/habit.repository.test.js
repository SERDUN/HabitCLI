import test from 'node:test';
import assert from 'node:assert';
import {resetTestFile, cleanupTestFile} from './utils.js';
import {HabitRepository} from "../src/repository/index.js";
import {JsonListDataSource} from "../src/datasources/index.js";

test('getEmpty() should add a new object to JSON list', () => {
    resetTestFile();
    const repository = new HabitRepository(new JsonListDataSource('habits.test.json'));
    const result = repository.getAll();

    assert.strictEqual(result.length, 0);
});

test('getAll() should return all habits', () => {
    resetTestFile();
    const repository = new HabitRepository(new JsonListDataSource('habits.test.json'));

    repository.add({name: 'TestHabit1', times: 1});
    repository.add({name: 'TestHabit2', times: 2});
    const result = repository.getAll();

    assert.strictEqual(result.length, 2);
    assert.deepEqual(result[0], {name: 'TestHabit1', times: 1});
    assert.deepEqual(result[1], {name: 'TestHabit2', times: 2});
});

test('getById() should return habit by ID', () => {
    resetTestFile();
    const repository = new HabitRepository(new JsonListDataSource('habits.test.json'));

    const habit = {id: 1, name: 'TestHabit', times: 1};
    repository.add(habit);
    const result = repository.getById(1);

    assert.deepEqual(result, habit);
});

test('add() should add a new habit', () => {
    resetTestFile();
    const repository = new HabitRepository(new JsonListDataSource('habits.test.json'));

    const habit = {name: 'NewHabit', times: 1};
    repository.add(habit);
    const result = repository.getAll();

    assert.strictEqual(result.length, 1);
    assert.deepEqual(result[0], habit);
});

test('update() should update existing habit', () => {
    resetTestFile();
    const repository = new HabitRepository(new JsonListDataSource('habits.test.json'));

    const original = {id: 1, name: 'OriginalHabit', times: 1};
    const updated = {id: 1, name: 'UpdatedHabit', times: 2};

    repository.add(original);
    repository.update(original, updated);
    const result = repository.getAll();

    assert.strictEqual(result.length, 1);
    assert.deepEqual(result[0], updated);
});


test('cleanup test file', () => {
    cleanupTestFile();
});
