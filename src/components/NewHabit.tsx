import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Habit } from "../interfaces/habit";
import { addHabit } from "../store/actions";

const NewHabit = () => {
    const navigate = useNavigate();
    const [habitName, setHabitName] = useState("");
    const [nameInvalid, setNameInvalid] = useState(false);
    const dispatch = useDispatch();
    const habits = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null } }) => state.habits.habits);

    const onHabitNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInvalid(false);
        if (e.target.value.length < 16)
            setHabitName(e.target.value);
        else
            navigator.vibrate(200);
    }

    const nextClicked = () => {
        if (habitName.length > 0) {
            const habit: Habit = { id: 0, name: habitName, startDate: new Date(), targetEndDate: new Date(), lastPartaken: new Date(), startFrequency: 0, timesPartakenToday: 0 };
            dispatch(addHabit(habit));
            navigate("/setup");
        }
        else {
            setNameInvalid(true);
        }
    }

    useEffect(() => {
        if (habits && habits.length > 0)
        {
            setHabitName(habits[0].name);
        }
    }, []);
    return (
        <div>
            <div id="new-habit-title" className="info-text">What art thou trying to diminish?</div>
            <input type="text" placeholder="name thy sin" value={habitName} onChange={onHabitNameChanged} id="habit-field" className={"nes-input text-input" + (nameInvalid ? "is-error" : null)} />
            <div className="main-menu-button-tray">
                <button id="new-habit-back" type="button" onClick={() => navigate("/")} className="menu-button nes-btn is-error">Back</button>
                <button id="new-habit-next" type="button" onClick={nextClicked} className="menu-button nes-btn is-success">Next</button>
            </div>
        </div>);
}

export default NewHabit 