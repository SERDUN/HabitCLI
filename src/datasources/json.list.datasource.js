import * as assetsUtil from '../utils/index.js';

export class JsonListDataSource {
    constructor(filename) {
        this.filename = filename;
    }

    getAll() {
        const raw = assetsUtil.readAsset(this.filename);
        try {
            return JSON.parse(raw);
        } catch (_) {
            return [];
        }
    }

    replaceAll(objects) {
        if (!Array.isArray(objects)) {
            throw new Error('Input must be an array');
        }
        this._save(objects);
    }

    add(object) {
        const list = this.getAll();
        list.push(object);
        this._save(list);
    }

    update(oldObject, newObject) {
        const list = this.getAll();
        const index = list.findIndex(obj => JSON.stringify(obj) === JSON.stringify(oldObject));
        if (index === -1) throw new Error('Object not found');
        list[index] = newObject;
        this._save(list);
    }

    getByProperty(property, value) {
        console.log('Searching for property:', property, 'with value:', value);
        const list = this.getAll();
        return list.find(obj => obj[property] === value);
    }

    remove(object) {
        const list = this.getAll();
        const index = list.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object));
        if (index === -1) throw new Error('Object not found');
        list.splice(index, 1);
        this._save(list);
    }

    _save(data) {
        assetsUtil.writeAsset(this.filename, JSON.stringify(data, null, 2));
    }
}
