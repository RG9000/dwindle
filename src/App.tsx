import React from 'react';
import "nes.css/css/nes.min.css";
import './App.css';
import Home from './components/Home';
import NewHabit from './components/NewHabit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SetupHabit from './components/SetupHabit';

export enum AppState {
  Home,
  NewHabit,
  MainPage
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewHabit />} />
          <Route path="/setup" element={<SetupHabit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
