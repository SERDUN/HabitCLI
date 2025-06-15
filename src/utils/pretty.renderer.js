import {BaseRenderer} from './base.renderer.js';

export class PrettyRenderer extends BaseRenderer {
    log(...args) {
        for (const arg of args) {
            if (typeof arg === 'object') {
                console.log(this.formatObject(arg));
            } else {
                console.log(arg);
            }
        }
    }

    formatObject(obj) {
        return JSON.stringify(obj, null, 2); // форматування з відступами
    }
}
