import React, { useState } from 'react';
import axiosInstance from '../api.js';

const Login = () => {
    console.log("Login component loaded");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);

            console.log(response.data);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);

        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email"
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input type="password"
                placeholder='******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    );

};

export default Login;