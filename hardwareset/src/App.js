import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home'
import AboutPage from './pages/about'
import ErrorPage from './pages/error'

function App() {
  return(
 <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="./pages/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App;
