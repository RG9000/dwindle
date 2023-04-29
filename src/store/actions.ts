import { Habit } from "../interfaces/habit";

export const addHabit = (habit: Habit) => ({
  type: "ADD_HABIT",
  payload: habit,
});

export const removeHabit = (id: number) => ({
  type: "REMOVE_HABIT",
  payload: id,
});

export const updateLastPartaken = (id: number, lastPartaken: Date) => ({
  type: "UPDATE_LAST_PARTAKEN",
  payload: { id, lastPartaken },
});

export const deselectHabit = () => ({
  type: "DESELECT_HABIT",
});

export const updateHabitById = (id: number, updatedHabit: Partial<Habit>) => ({
  type: "UPDATE_HABIT_BY_ID",
  payload: { id, updatedHabit },
});