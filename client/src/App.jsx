import React, { useState, useEffect } from 'react'
import ImageGenerator from './components/ImageGenerator';
import Navbar from './components/Navbar'
import './App.css';


function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme)
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <div className={`app-container ${theme}`}>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <ImageGenerator />
    </div>

  )
}

export default App
