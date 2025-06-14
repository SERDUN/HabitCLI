import test from 'node:test';
import assert from 'node:assert/strict';
import {HabitManagerController} from "../src/features/index.js";

function createMockService() {
    const store = [];

    return {
        addHabit: (habit) => store.push(habit),
        updateHabit: (oldHabit, newHabit) => {
            const index = store.findIndex(h => h.id === oldHabit.id);
            if (index !== -1) store[index] = newHabit;
        },
        getAllHabits: () => store,
        getHabitById: (id) => store.find(h => h.id === id),
    };
}

test('HabitManagerController - addHabit adds habit via service', () => {
    const mockService = createMockService();
    const controller = new HabitManagerController(mockService);

    const habit = {id: '1', name: 'Read'};
    controller.addHabit(habit);

    const all = controller.getAllHabits();
    assert.equal(all.length, 1);
    assert.deepEqual(all[0], habit);
});

test('HabitManagerController - updateHabit updates habit via service', () => {
    const mockService = createMockService();
    const controller = new HabitManagerController(mockService);

    const habit = {id: '1', name: 'Old'};
    const updated = {id: '1', name: 'New'};

    controller.addHabit(habit);
    controller.updateHabit(habit, updated);

    const result = controller.getHabitById('1');
    assert.deepEqual(result, updated);
});

test('HabitManagerController - getAllHabits returns all habits', () => {
    const mockService = createMockService();
    const controller = new HabitManagerController(mockService);

    controller.addHabit({id: '1', name: 'A'});
    controller.addHabit({id: '2', name: 'B'});

    const result = controller.getAllHabits();
    assert.equal(result.length, 2);
});

test('HabitManagerController - getHabitById returns correct habit', () => {
    const mockService = createMockService();
    const controller = new HabitManagerController(mockService);

    const habit = {id: '99', name: 'Focused work'};
    controller.addHabit(habit);

    const found = controller.getHabitById('99');
    assert.deepEqual(found, habit);
});
