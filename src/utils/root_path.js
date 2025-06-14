import {fileURLToPath} from 'url';
import {dirname, resolve, join} from 'path';
import {existsSync} from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let _cachedProjectRoot = null;

export function findProjectRoot(startDir = __dirname) {
    if (_cachedProjectRoot) return _cachedProjectRoot;

    let dir = startDir;
    while (dir !== '/' && !existsSync(join(dir, 'package.json'))) {
        dir = dirname(dir);
    }

    if (!existsSync(join(dir, 'package.json'))) {
        throw new Error('Cannot find project root (no package.json found)');
    }

    _cachedProjectRoot = dir;
    return dir;
}

export function getRootDirPath(dir) {
    return resolve(findProjectRoot(), dir);
}
