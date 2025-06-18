import fs from 'fs';
import path from 'path';
import {findProjectRoot} from './root_path.js';

export class EnvConfig {
    static #env = null;

    /**
     * Loads .env variables and caches them in memory.
     * Injects each into process.env as well.
     * @param {string} filename
     */
    static initialize(filename = '.env') {
        if (EnvConfig.#env) return; // Already initialized

        const env = {};
        const root = findProjectRoot();
        const filePath = path.resolve(root, filename);

        if (fs.existsSync(filePath)) {
            const lines = fs.readFileSync(filePath, 'utf-8')
                .split('\n')
                .filter(line => line.trim() && !line.trim().startsWith('#'));

            for (const line of lines) {
                const [key, ...rest] = line.split('=');
                const value = rest.join('=').trim();
                env[key.trim()] = value;
                process.env[key.trim()] = value;
            }
        }

        EnvConfig.#env = env;
    }

    /**
     * Get optional ENV variable, fallback if missing
     * @param {string} key
     * @param {*} fallback
     * @returns {*}
     */
    static optional(key, fallback = null) {
        if (!EnvConfig.#env) throw new Error('EnvConfig not initialized');
        return EnvConfig.#env[key] ?? fallback;
    }

    /**
     * Number of days to shift "today"
     * @returns {number}
     */
    static get dayOffset() {
        return Number(EnvConfig.optional('DAY_OFFSET', 0));
    }

    /**
     * Number of days in default range
     * @returns {number}
     */
    static get rangeDays() {
        return Number(EnvConfig.optional('RANGE_DAYS', 30));
    }

    /**
     * Optional override for "to" date
     * @returns {Date|null}
     */
    static get toDate() {
        const raw = EnvConfig.optional('TO_DATE');
        return raw ? new Date(raw) : null;
    }
}
