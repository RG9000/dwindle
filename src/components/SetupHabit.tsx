import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addHabit } from '../store/actions';
import { Habit } from '../interfaces/habit';
import { useDispatch, useSelector } from 'react-redux';

const SetupHabit = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const storedName = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null; newHabitName: string | null; } }) => state.habits.newHabitName);
    const [frequency, setFrequency] = useState("");

    const onFrequencyChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (val || e.target.value === "") {
            setFrequency(val.toString());
        }
    }

    const [target, setTarget] = useState("");
    const onTargetChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) {
            setTarget(val.toString());
        } else if (e.target.value === "") {
            setTarget("");
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key < '0' || e.key > '9') && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    };


    const nextClick = () => {
        const freqInt = parseInt(frequency);
        const targInt = parseInt(target);
        if (!isNaN(freqInt) && freqInt !== 0 && !isNaN(targInt) && targInt !== 0) {
            const now = new Date();
            const targetDate = new Date(now);
            targetDate.setDate(now.getDate() + targInt);
            const newHabit: Habit = {
                startDate: now,
                targetEndDate: targetDate,
                startFrequency: freqInt,
                lastPartaken: now,
                id: 0,
                name: storedName ?? "HABIT_NAME",
                timesPartakenToday: 0
            };

            console.log(targetDate);

            dispatch(addHabit(newHabit));
            navigator("/");
        }
    }
    return (
        <div>
            <div className="info-text-2"> How oft in a day does thoust partake?</div>
            <input onKeyDown={onKeyDown} value={frequency} onChange={onFrequencyChanged} type="number" placeholder="sins per day" id="frequency-field" className="nes-input text-input" />
            <div className="info-text-2"> In how many days will thou relent?</div>
            <input onKeyDown={onKeyDown} value={target} onChange={onTargetChanged} type="number" placeholder="days to stop" id="target-field" className="nes-input text-input" />
            <div className="main-menu-button-tray">
                <button id="back-button" type="button"  onClick={() => navigator("/new")} className="menu-button nes-btn is-error">Back</button>
                <button id="next-button" type="button" onClick={() => nextClick()} className="menu-button nes-btn is-success">Begin</button>
            </div>
        </div>);
}

export default SetupHabit;