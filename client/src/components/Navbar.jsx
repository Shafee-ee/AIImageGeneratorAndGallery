import React, { useState, useEffect } from 'react'
import './ImageGenerator.css'



const Navbar = () => {
    const [buttonName, setButtonName] = useState("UNIT 00")
    return (
        <div className="navbar">
            <h2>AI Image Generator</h2>
            <button >UNIT 00</button>
        </div>
    );
}
export default Navbar