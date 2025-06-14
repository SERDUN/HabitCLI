import {BaseController} from '../../utils/index.js';

export class HabitAnalyticsController extends BaseController {
    constructor() {
        super();
        this.register('stats', 'getHabitStats');
    }

    getHabitStats() {
        console.log('Fetching habit statistics...');
    }
}
