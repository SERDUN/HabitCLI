import test from 'node:test';
import assert from 'node:assert/strict';
import { findProjectRoot, getRootDirPath } from '../src/utils/root_path.js';
import { existsSync } from 'fs';
import { join } from 'path';

test('findProjectRoot returns a path with package.json', () => {
    const root = findProjectRoot();
    const pkgPath = join(root, 'package.json');

    assert.ok(existsSync(pkgPath), 'package.json should exist at root');
});

test('getRootDirPath resolves correct subdir path', () => {
    const assetsPath = getRootDirPath('assets');
    assert.ok(assetsPath.endsWith('/assets') || assetsPath.endsWith('\\assets'));
});
