import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewHabit = () => {
    const navigator = useNavigate();
    const [habitName, setHabitName] = useState("");

    const onHabitNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setHabitName(e.target.value);
    }
    return (
        <div>
            <div className="info-text"> What art thou trying to diminish?</div>
            <input type="text" placeholder="name thy sin" value={habitName} onChange={onHabitNameChanged} id="habit-field" className="nes-input text-input" />
            <div className="main-menu-button-tray">
                <button type="button" onClick={() => navigator("/")} className="menu-button nes-btn is-error">Back</button>
                <button type="button" className="menu-button nes-btn is-success">Next</button>
            </div>
        </div>);
}

export default NewHabit 