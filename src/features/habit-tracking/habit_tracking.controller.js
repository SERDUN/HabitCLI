import {BaseController} from '../../utils/index.js';
import {HabitTrackingServices} from './habit_tracking.services.js';

export class HabitTrackingController extends BaseController {
    constructor(service = new HabitTrackingServices()) {
        super();
        this.service = service;

        this.register('done', 'doneHabit');
        this.register('calculateCompletionPercentageById', 'calculateCompletionPercentageById');
    }

    doneHabit(args) {
        this.service.doneHabit(args.id);
    }

    calculateCompletionPercentageById(args) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 29);

        this.service.calculateCompletionPercentageById(args.id, startDate.toISOString(), endDate.toISOString());
    }
}
