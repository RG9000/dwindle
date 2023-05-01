import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Habit } from "../interfaces/habit";
import { updateNewHabitName } from "../store/actions";

const NewHabit = () => {
    const navigate = useNavigate();
    const [habitName, setHabitName] = useState("");
    const [nameInvalid, setNameInvalid] = useState(false);
    const dispatch = useDispatch();
    
    const onHabitNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInvalid(false);
        if (e.target.value.length < 16)
            setHabitName(e.target.value);
        else
            navigator.vibrate(200);
    }

    const nextClicked = () => {
        console.log(habitName);
        if (habitName.length > 0) {
            dispatch(updateNewHabitName(habitName));
            navigate("/setup");
        }
        else {
            setNameInvalid(true);
        }
    }

    useEffect(() => {
        const storedName = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null; newHabitName: string | null; } }) => state.habits.newHabitName);
        if (storedName)
        {
            setHabitName(storedName);
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