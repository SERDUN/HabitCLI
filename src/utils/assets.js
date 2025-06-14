import {readFileSync, writeFileSync} from 'fs';
import {resolve} from 'path';
import {getRootDirPath} from './root_path.js';

const assetPath = () => getRootDirPath('assets');

export function readAsset(filename, encoding = 'utf8') {
    const filePath = resolve(assetPath(), filename);
    return readFileSync(filePath, encoding);
}

export function writeAsset(filename, data) {
    const filePath = resolve(assetPath(), filename);
    return writeFileSync(filePath, data);
}
