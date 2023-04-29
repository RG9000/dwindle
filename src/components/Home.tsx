import { useNavigate } from 'react-router-dom';
import hammer from '../assets/hammer.webp';

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
      <img className="logo" src={hammer}></img>
      <div className="main-menu-button-tray">
        <button type="button" onClick={() => navigator("/new")} className="menu-button nes-btn is-success">Start</button>
      </div>
    </>);
}

export default Home