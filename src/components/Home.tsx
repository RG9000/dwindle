import { useNavigate } from 'react-router-dom';
import hammer from '../assets/hammer.webp';
import { useDispatch, useSelector } from 'react-redux';
import { Habit } from '../interfaces/habit';
import { useEffect, useState } from 'react';
import { updateHabitById } from '../store/actions';
import { ReactComponent as Hamburger } from '../assets/hamburger.svg';


const Home = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const habits = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null } }) => state.habits.habits);

  const [isNew, setIsNew] = useState(true);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [title, setTitle] = useState("DWINDLE");
  const [day, setDay] = useState(0);
  const [timesLeft, setTimesLeft] = useState(0);
  const [thisHabit, setThisHabit] = useState<Habit | null>(habits[0] ?? null);

  const diffDates = (d1: Date, d2: Date) => {
    var diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  const getNowDate = () => {
    return new Date();
  }


  useEffect(() => {
    function calculateInitialState() {
      if (thisHabit === null) {
        setTitle("DWINDLE");
        setIsNew(true);
      }
      else {
        setIsNew(false);
        setTitle(habits[0].name);
        const thisDay = diffDates(habits[0].targetEndDate, getNowDate());
        setDay(thisDay);
        if (getNowDate().getDay() === new Date(habits[0].lastPartaken).getDay()) {
          const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
          const startFrequency = habits[0].startFrequency;
          const allowedToday = Math.floor((startFrequency / totalDays) * thisDay) - habits[0].timesPartakenToday;
          setTimesLeft(allowedToday);
        }
        else {
          const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
          const startFrequency = habits[0].startFrequency;
          const allowedToday = Math.floor((startFrequency / totalDays) * thisDay);
          setTimesLeft(allowedToday);
          const thisHabit: Habit = habits.filter((e: Habit) => e.id === 0)[0];

          const updatedHabit: Habit = {
            ...thisHabit,
            lastPartaken: getNowDate(),
            timesPartakenToday: 0
          };
          dispatch(updateHabitById(0, updatedHabit));
          setThisHabit(updatedHabit);
        }
      }
    }
    calculateInitialState();
  }, [dispatch, habits, thisHabit]);

  const hammerClicked = () => {
    const now = getNowDate();
    const thisHabit: Habit = habits.filter((e: Habit) => e.id === 0)[0];
    setTimesLeft(timesLeft - 1);

    const updatedHabit: Habit = {
      ...thisHabit,
      lastPartaken: now,
      timesPartakenToday: thisHabit.timesPartakenToday + 1
    };
    if (habits.length === 0) {
      setIsNew(true);
    }
    else {
      setIsNew(false);
      const thisDay = diffDates(habits[0].targetEndDate, getNowDate());
      setDay(thisDay);
      if (getNowDate().getDay() === new Date(habits[0].lastPartaken).getDay()) {
        const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
        const startFrequency = habits[0].startFrequency;
        const allowedToday = Math.floor((startFrequency / totalDays) * thisDay) - habits[0].timesPartakenToday;
        setTimesLeft(allowedToday);
      }
      else {
        const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
        const startFrequency = habits[0].startFrequency;
        const allowedToday = Math.floor((startFrequency / totalDays) * thisDay);
        setTimesLeft(allowedToday);
      }
    }
    dispatch(updateHabitById(0, updatedHabit));
  }

  const openDialogue = () => {
    setDialogueVisible(true);
  }


  return (
    <>
      <button onClick={() => openDialogue()} className="reset-button nes-btn is-warning">
        <Hamburger />
      </button>
      <div id="home-title" className="title-text">
        {title}
      </div>
      <div id="home-subtitle" className="sub-header nes-text is-primary">
        {isNew ? "Habit Breaker" : "Click thy hammer when thy sin is committed"}
      </div>
      <img className="logo" alt="hammer logo" onClick={hammerClicked} src={hammer}></img>
      <div className="main-menu-button-tray">
        {isNew ?
          <button id="home-start-button" type="button" onClick={() => navigator("/new")} className="menu-button nes-btn is-success">Start</button>
          :
          <>
            <div id="home-partake-div" className="sub-header nes-text is-secondary">
              You may partake {timesLeft} more times today
            </div>
            <br />
            <div id="home-days-div" className="sub-header nes-text is-secondary">
              {day} days remaining
            </div>
          </>
        }
      </div>
      {dialogueVisible ?
        <div>
          Hello world
        </div>
        : null}
    </>);
}

export default Home