// HabitDropdown.tsx
import React from 'react';
import { Habit } from '../interfaces/habit';

interface HabitDropdownProps {
  habits: Habit[];
  isOpen: boolean;
  onNewHabit?: () => void;
}

const HabitDropdown: React.FC<HabitDropdownProps> = ({ habits, isOpen, onNewHabit }) => {
  const handleNewHabitClick = () => {
    if (onNewHabit) {
      onNewHabit();
    }
  };

  if (!isOpen) {
    return null;
  }

return (
    <div className={`habit-dropdown${isOpen ? ' visible' : ''}`}>
      <div className="dropdown-content">
        {habits.map((habit) => (
          <div key={habit.id} className="dropdown-item no-select">
            {habit.name}
          </div>
        ))}
        <div className="dropdown-item no-select" onClick={handleNewHabitClick}>
          + New Habit
        </div>
      </div>
    </div>
  );
};

export default HabitDropdown;
