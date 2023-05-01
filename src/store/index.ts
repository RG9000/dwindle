// src/store/index.ts
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Habit } from "../interfaces/habit";

interface HabitsState {
  habits: Habit[];
  newHabitName: string | null;
  selectedHabit: Habit | null;
}

const initialState: HabitsState = {
  habits: [],
  selectedHabit: null,
  newHabitName: null
};

const habitsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_HABIT":
      return { ...state, habits: [...state.habits, action.payload] };
    case "REMOVE_HABIT":
      return { ...state, habits: state.habits.filter((habit) => habit.id !== action.payload) };
    case "UPDATE_LAST_PARTAKEN":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id ? { ...habit, lastPartaken: action.payload.lastPartaken } : habit
        ),
      };
    case "SELECT_HABIT":
      return { ...state, selectedHabit: action.payload };
     case "UPDATE_HABIT_BY_ID":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id ? { ...habit, ...action.payload.updatedHabit } : habit
        ),
      };
      case "UPDATE_NEW_HABIT_NAME":
        return { ...state, newHabitName: action.payload.updatedHabitName}
    // Add more cases for other actions as needed
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  habits: habitsReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
