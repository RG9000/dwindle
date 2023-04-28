import React, { useState } from 'react';
import "nes.css/css/nes.min.css";
import './App.css';
import Home from './components/Home';
import NewHabit from './components/NewHabit';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
