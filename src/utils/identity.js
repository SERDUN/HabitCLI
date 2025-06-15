/**
 * Create a seeded random number generator (LCG)
 * @param {number} seed
 * @returns {() => number} function returning float in [0, 1)
 */
function seededRandom(seed) {
    return function () {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };
}

/**
 * Generates a numeric ID using optional seed (default: current time)
 * @param {number} [seed=Date.now()] - Seed for deterministic output
 * @param {number} [length=8] - Length of generated ID
 * @returns {string}
 */
export function generateRandomId(seed = Date.now(), length = 8) {
    const digits = '0123456789';
    const random = seededRandom(seed);
    let result = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(random() * digits.length);
        result += digits.charAt(index);
    }
    return result;
}
