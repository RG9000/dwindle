import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateHabitById } from '../store/actions';
import { Habit } from '../interfaces/habit';
import { useDispatch, useSelector } from 'react-redux';

const SetupHabit = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const habits = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null } }) => state.habits.habits);

    const [frequency, setFrequency] = useState(0);
    const onFrequencyChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setFrequency(parseInt(e.target.value));
    }
    
    const [target, setTarget] = useState(0);
    const onTargetChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTarget(parseInt(e.target.value));
    }

    const nextClick = () => {
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + target);
        const updatedHabit : Habit = {...habits.filter((e : Habit) => e.id == 0)[0],
            startDate: now,
            targetEndDate: targetDate,
            startFrequency: frequency,
            lastPartaken: now};
        
            console.log(targetDate);
        
        dispatch(updateHabitById(0, updatedHabit));
    }
    return (
        <div>
            <div className="info-text-2"> How oft in a day does thoust partake?</div>
            <input value={frequency} onChange={onFrequencyChanged} type="number" placeholder="sins per day" id="frequency-field" className="nes-input text-input" />
            <div className="info-text-2"> In how many days will thou relent?</div>
            <input value={target} onChange={onTargetChanged} type="number" placeholder="days to stop" id="target-field" className="nes-input text-input" />
            <div className="main-menu-button-tray">
                <button type="button" onClick={() => navigator("/")} className="menu-button nes-btn is-error">Back</button>
                <button type="button" onClick={() => nextClick()} className="menu-button nes-btn is-success">Begin</button>
            </div>
        </div>);
}

export default SetupHabit;