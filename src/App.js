import React, { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
const ExchangeRates = lazy(() => import('./components/ExchangeRates'));
const Converter = lazy(() => import('./components/CurrencyConverter.jsx'));

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <NavLink className=" navLink navLink__rates" to="/">
              Exchange rates
            </NavLink>
            <NavLink className="navLink navLink__converter " to="converter">
              Converter
            </NavLink>
          </nav>
        </div>
      </header>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" exact="true" element={<ExchangeRates />} />
          <Route path="/converter" exact="true" element={<Converter />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
