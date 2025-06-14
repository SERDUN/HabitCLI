import test from 'node:test';
import assert from 'node:assert';
import {JsonListDataSource} from '../src/datasources/index.js';
import {resetTestFile, cleanupTestFile, testFilename} from './utils.js';

test('add() should add a new object to JSON list', () => {
    resetTestFile();
    const ds = new JsonListDataSource(testFilename);

    ds.add({name: 'TestHabit', times: 1});
    const result = ds.getAll();

    assert.strictEqual(result.length, 1);
    assert.deepEqual(result[0], {name: 'TestHabit', times: 1});
});

test('update() should update existing object', () => {
    resetTestFile();
    const ds = new JsonListDataSource(testFilename);

    const original = {name: 'TestHabit', times: 1};
    const updated = {name: 'TestHabit', times: 2};

    ds.add(original);
    ds.update(original, updated);
    const result = ds.getAll();

    assert.strictEqual(result.length, 1);
    assert.deepEqual(result[0], updated);
});

test('remove() should delete an existing object', () => {
    resetTestFile();
    const ds = new JsonListDataSource(testFilename);

    const obj = {name: 'TestHabit', times: 2};

    ds.add(obj);
    ds.remove(obj);
    const result = ds.getAll();

    assert.deepEqual(result, []);
});

test('remove() should throw on non-existing object', () => {
    resetTestFile();
    const ds = new JsonListDataSource(testFilename);

    assert.throws(() => {
        ds.remove({name: 'Missing'});
    }, /Object not found/);
});


test('cleanup test file', () => {
    cleanupTestFile();
});
