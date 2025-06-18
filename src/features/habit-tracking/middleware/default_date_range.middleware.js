/**
 * Middleware to inject default "from" and "to" date range into args.
 *
 * Priority (for `from` and `to`):
 *   1. CLI arguments: --from, --to
 *   2. ENV override: TO_DATE
 *   3. Default: from = shifted today, to = from + (rangeDays - 1)
 *
 * @param {object} args - Original CLI arguments.
 * @param {number} dateOffset - Number of days to shift current date (e.g. 0 = today, 1 = tomorrow).
 * @param {number} rangeDays - Number of days in the range.
 * @param {Date|null} toOverride - Optional override for `to` date.
 * @returns {object} - Updated args with `from` and `to` Date objects.
 */
import {TimeRangeUtils} from '../../../utils/index.js';

export function defaultDateRange(args, dateOffset = 0, rangeDays = 30, toOverride = null) {
	const base = new Date();
	base.setHours(0, 0, 0, 0);
	const shifted = new Date(base.getTime() + dateOffset * TimeRangeUtils.MILLISECONDS_IN_DAY);

	const from = args.from ? new Date(args.from) : shifted;

	const to = args.to ? new Date(args.to) : (toOverride instanceof Date ? toOverride : new Date(from.getTime() + (rangeDays - 1) * TimeRangeUtils.MILLISECONDS_IN_DAY));

	return {...args, from, to};
}
