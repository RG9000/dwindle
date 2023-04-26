import React, { useState } from 'react';
import logo from './logo.svg';
import "nes.css/css/nes.min.css";
import './App.css';
import Home from './components/Home';

export enum AppState {
  Home,
  NewHabit,
  MainPage
}

function App() {

  const renderActiveComponent = () =>
  {
    switch (activeComponent) {
      case AppState.Home:
        return <Home></Home> 
      default:
        return <Home></Home> 
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
