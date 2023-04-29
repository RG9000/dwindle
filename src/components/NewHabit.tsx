import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Habit } from "../interfaces/habit";
import { addHabit } from "../store/actions";

const NewHabit = () => {
    const navigator = useNavigate();
    const [habitName, setHabitName] = useState("");

    const dispatch = useDispatch();

    const onHabitNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setHabitName(e.target.value);
    }

    const nextClicked = () => {
        const habit: Habit = {id: 0, name: habitName, startDate: new Date(), targetEndDate: new Date(), lastPartaken: new Date(), startFrequency: 0 };
        dispatch(addHabit(habit));
        navigator("/setup");
    }
    return (
        <div>
            <div className="info-text"> What art thou trying to diminish?</div>
            <input type="text" placeholder="name thy sin" value={habitName} onChange={onHabitNameChanged} id="habit-field" className="nes-input text-input" />
            <div className="main-menu-button-tray">
                <button type="button" onClick={() => navigator("/")} className="menu-button nes-btn is-error">Back</button>
                <button type="button" onClick={nextClicked} className="menu-button nes-btn is-success">Next</button>
            </div>
        </div>);
}

export default NewHabit 