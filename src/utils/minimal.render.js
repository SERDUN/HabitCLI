import {BaseRenderer} from './base.renderer.js';

export class MinimalRenderer extends BaseRenderer {
    log(...args) {
        for (const arg of args) {
            console.log(typeof arg === 'object' ? this.formatRaw(arg) : arg);
        }
    }

    formatRaw(obj) {
        return Object.entries(obj)
            .map(([key, val]) => `${key}: ${val}`)
            .join(', ');
    }
}
