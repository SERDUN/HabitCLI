import test from 'node:test';
import assert from 'node:assert/strict';
import {readAsset, writeAsset} from '../src/utils/assets.js';
import {resolve} from 'path';
import {unlinkSync, existsSync} from 'fs';

const testFilename = 'habits.test.json';
const testTargetsContent = '["Jogging"]';

test('writeAsset writes file correctly', () => {
    writeAsset(testFilename, testTargetsContent);
    const fullPath = resolve('assets', testFilename);
    assert.ok(existsSync(fullPath));
});

test('readAsset reads written file content correctly', () => {
    const content = readAsset(testFilename);
    assert.equal(content, testTargetsContent);
});

test('cleanup test file', () => {
    const fullPath = resolve('assets', testFilename);
    if (existsSync(fullPath)) unlinkSync(fullPath);
    assert.ok(!existsSync(fullPath));
});

