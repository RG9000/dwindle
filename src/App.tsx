import React, { useState } from 'react';
import "nes.css/css/nes.min.css";
import './App.css';
import Home from './components/Home';
import NewHabit from './components/NewHabit';

export enum AppState {
  Home,
  NewHabit,
  MainPage
}

function App() {

  const goToNewHabitScreen = () => 
  {
    setActiveComponent(AppState.NewHabit);
  }

  const renderActiveComponent = () =>
  {
    switch (activeComponent) {
      case AppState.Home:
        return <Home startClicked={goToNewHabitScreen} />
      case AppState.NewHabit:
        return <NewHabit />
    }
  }

  const [activeComponent, setActiveComponent] = useState(AppState.Home);
  return (
    <div className="App">
      {renderActiveComponent()}
    </div>
  );
}

export default App;
