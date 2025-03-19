import React, { useState } from 'react';
import axiosInstance from '../api';

const Register = () => {
    console.log("Login component loaded");

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')

    const handleRegister = async () => {

        if (password !== confirmPassword) {
            setMessage('passwords do not match');
            return;
        }

        try {
            const response = await axiosInstance.post('/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);

            setMessage(`Registration successfull!`)

        } catch (error) {
            setMessage(error.response?.data?.message || 'registration failed');
        }


    }
    return (
        <div>
            <h2>Register</h2>
            <input type="text"
                placeholder='enter username'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
            <input type="email"
                placeholder='enter email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password"
                placeholder='enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />

            <input type="password"
                placeholder='enter password again..'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} />

            <button onClick={handleRegister}>Register</button>
            {message && <p>{message}</p>}

        </div>
    );
}

export default Register