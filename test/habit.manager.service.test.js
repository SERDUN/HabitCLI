import test from 'node:test';
import assert from 'node:assert/strict';

import {HabitManagerServices} from "../src/features/index.js";

function createMockRepository() {
    const store = [];

    return {
        add: (habit) => store.push(habit),
        update: (oldHabit, newHabit) => {
            const index = store.findIndex(h => h.id === oldHabit.id);
            if (index !== -1) store[index] = newHabit;
        },
        getAll: () => store,
        getById: (id) => store.find(h => h.id === id)
    };
}

test('HabitManagerServices - addHabit adds habit to repository', () => {
    const mockRepo = createMockRepository();
    const service = new HabitManagerServices(mockRepo);

    const habit = {id: '1', name: 'Read'};
    service.addHabit(habit);

    const all = service.getAllHabits();
    assert.equal(all.length, 1);
    assert.deepEqual(all[0], habit);
});

test('HabitManagerServices - updateHabit updates habit in repository', () => {
    const mockRepo = createMockRepository();
    const service = new HabitManagerServices(mockRepo);

    const habit = {id: '1', name: 'Read'};
    const updatedHabit = {id: '1', name: 'Workout'};

    service.addHabit(habit);
    service.updateHabit(habit, updatedHabit);

    const result = service.getHabitById('1');
    assert.deepEqual(result, updatedHabit);
});

test('HabitManagerServices - getAllHabits returns all habits', () => {
    const mockRepo = createMockRepository();
    const service = new HabitManagerServices(mockRepo);

    service.addHabit({id: '1', name: 'One'});
    service.addHabit({id: '2', name: 'Two'});

    const habits = service.getAllHabits();
    assert.equal(habits.length, 2);
});

test('HabitManagerServices - getHabitById returns correct habit', () => {
    const mockRepo = createMockRepository();
    const service = new HabitManagerServices(mockRepo);

    const habit = {id: '1', name: 'Yoga'};
    service.addHabit(habit);

    const found = service.getHabitById('1');
    assert.deepEqual(found, habit);
});
