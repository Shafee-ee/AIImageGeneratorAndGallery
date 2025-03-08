import React, { useState, useEffect } from 'react'
import './Navbar.css';

const Navbar = ({ toggleTheme, theme }) => {
    return (
        <div className="navbar">
            <h2>AI Image Generator</h2>
            <button onClick={toggleTheme}>{theme === "dark" ? "light mode" : "dark mode"}</button>
        </div>
    );
}
export default Navbar;

