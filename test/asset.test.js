import test from 'node:test';
import assert from 'node:assert/strict';
import {readAsset, writeAsset} from '../src/utils/assets.js';
import {fileExists, resetTestFile, cleanupTestFile, testFilename, testTargetsContent} from './utils.js';

test('writeAsset writes file correctly', () => {
    resetTestFile();
    writeAsset(testFilename, testTargetsContent);
    assert.ok(fileExists());
});

test('readAsset reads written file content correctly', () => {
    resetTestFile();
    const content = readAsset(testFilename);
    assert.equal(content, testTargetsContent);
});

test('cleanup test file', () => {
    cleanupTestFile();
    assert.ok(!fileExists());
});
