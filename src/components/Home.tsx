import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigator = useNavigate();
  return (
    <>
      <div className="title-text">
        DWINDLE
      </div>
      <div className="sub-header nes-text is-primary">
        Habit Breaker
      </div>
      <div className="main-menu-button-tray">
        <button type="button" onClick={() => navigator("/new")} className="menu-button nes-btn is-success">Start</button>
      </div>
    </>);
}

export default Home