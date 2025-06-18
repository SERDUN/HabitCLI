/**
 * Validates an argument object against a simple validation schema.
 *
 * @param {Object<string, { required?: boolean, type?: string }>} schema -
 *   A schema where each key defines rules for one field:
 *   - `required`: whether the field is mandatory
 *   - `type`: expected JavaScript type (`'string'`, `'number'`, etc.)
 *
 * @param {Object<string, any>} args -
 *   The actual input arguments object to validate.
 *
 * @returns {{ isValid: boolean, errors: string[] }}
 *   - `isValid`: true if validation passes, false otherwise
 *   - `errors`: array of validation error messages
 *
 * @example
 * const schema = {
 *   name: { required: true, type: 'string' },
 *   freq: { required: true, type: 'string' }
 * };
 *
 * const args = { name: 'Read', freq: 'daily' };
 * const result = validateArgs(schema, args);
 *
 * if (!result.isValid) {
 *   console.error(result.errors);
 * }
 */
export function validateArgs(schema, args) {
    const errors = [];

    for (const [key, rules] of Object.entries(schema)) {
        const value = args[key];

        if (rules.required && (value === undefined || value === null || value === '')) {
            errors.push(`"${key}" is required`);
            continue;
        }

        if (rules.type && typeof value !== rules.type) {
            errors.push(`"${key}" must be of type ${rules.type}`);
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Runs validation and invokes onError callback only if invalid.
 * @returns {boolean} - true if valid, false if failed
 */
export function validateOrFail(schema, args, onError) {
    const {isValid, errors} = validateArgs(schema, args);
    if (!isValid) {
        onError(errors);
    }
    return isValid;
}