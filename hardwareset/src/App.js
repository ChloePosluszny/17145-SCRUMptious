import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home'
import AboutPage from './pages/about'
import ErrorPage from './pages/error'
import RegisterPage from './pages/register'
import ProjectsPage from './pages/projects'
function App() {
  return(
 <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="./pages/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App;
