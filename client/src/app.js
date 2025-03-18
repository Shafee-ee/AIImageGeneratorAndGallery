import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGenerator from './components/ImageGenerator';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <Navbar toggleTheme={toggleTheme} theme={theme} />
                <Routes>
                    <Route path="/" element={<ImageGenerator />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }

                    />
                </Routes>
            </div>
        </Router>

    );
}

export default App
