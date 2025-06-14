import {writeAsset} from '../src/utils/assets.js';
import {resolve} from 'path';
import {existsSync, unlinkSync} from 'fs';

export const testFilename = 'habits.test.json';
export const testFilePath = resolve('assets', testFilename);
export const testTargetsContent = '[]';

export function resetTestFile(content = testTargetsContent) {
    writeAsset(testFilename, content);
}

export function cleanupTestFile() {
    if (existsSync(testFilePath)) unlinkSync(testFilePath);
}

export function fileExists() {
    return existsSync(testFilePath);
}
