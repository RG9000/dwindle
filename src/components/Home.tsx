import { useNavigate } from 'react-router-dom';
import hammer from '../assets/hammer.webp';
import { useDispatch, useSelector } from 'react-redux';
import { Habit } from '../interfaces/habit';
import { useEffect, useState } from 'react';
import { updateHabitById } from '../store/actions';

const Home = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const habits = useSelector((state: { habits: { habits: Habit[]; selectedHabit: Habit | null } }) => state.habits.habits);

  const [isNew, setIsNew] = useState(true);
  const [title, setTitle] = useState("DWINDLE");
  const [day, setDay] = useState(0);
  const [timesLeft, setTimesLeft] = useState(0);

  const diffDates = (d1 : Date, d2 : Date) => {
      var diff = Math.abs(new Date(d2).getTime() - new Date(d1).getTime());
      return Math.ceil(diff / (1000 * 3600 * 24)); 
  }

  useEffect(() => {
    if (habits.length === 0)
    {
      setIsNew(true);
    }
    else
    {
      setIsNew(false);
      setTitle(habits[0].name);
      const thisDay = diffDates(habits[0].targetEndDate, new Date());
      setDay(thisDay);
      if (new Date().getDay() === new Date(habits[0].lastPartaken).getDay())
      {
        const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
        const startFrequency = habits[0].startFrequency;
        const allowedToday = Math.floor((startFrequency/totalDays) * thisDay) - habits[0].timesPartakenToday;
        setTimesLeft(allowedToday);
      }
      else
      {
        const totalDays = diffDates(habits[0].targetEndDate, habits[0].startDate);
        const startFrequency = habits[0].startFrequency;
        const allowedToday = Math.floor((startFrequency/totalDays) * thisDay);
        setTimesLeft(allowedToday);
        const thisHabit : Habit = habits.filter((e : Habit) => e.id === 0)[0];

        const updatedHabit : Habit = {...thisHabit,
          lastPartaken: new Date(),
          timesPartakenToday: 0};
          dispatch(updateHabitById(0, updatedHabit));
      }
    }
  }, []);

  const hammerClicked = () => {
    const now = new Date();
    const thisHabit : Habit = habits.filter((e : Habit) => e.id === 0)[0];
    setTimesLeft(timesLeft-1);

    const updatedHabit : Habit = {...thisHabit,
        lastPartaken: now,
        timesPartakenToday: thisHabit.timesPartakenToday+1};
    
    dispatch(updateHabitById(0, updatedHabit));
  }
  
  return (
    <>
      <div className="title-text">
        {title}
      </div>
      <div className="sub-header nes-text is-primary">
        {isNew ? "Habit Breaker" : "Click thy hammer when thy sin is committed"}
      </div>
      <img className="logo" onClick={hammerClicked} src={hammer}></img>
      <div className="main-menu-button-tray">
        {isNew ? 
        <button type="button" onClick={() => navigator("/new")} className="menu-button nes-btn is-success">Start</button>
        :
        <>
        <div className="sub-header nes-text is-secondary">
          You make partake {timesLeft} more times today
        </div>
        <br/>
        <div className="sub-header nes-text is-secondary">
          {day} days remaining
        </div>
        </>
        }
      </div>
    </>);
}

export default Home