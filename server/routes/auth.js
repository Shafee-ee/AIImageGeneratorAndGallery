import express from 'express';
import bcrypt from 'bcrypt.';
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import user from "../models/user.js";

const router = express.Router();

//registration route for user
router.post(
    "/register",
    [
        body('username').notEmpty().withMessage('UserName is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters')
    ],
    aysnc(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
}

const { username, email, password } = req.body;
try {
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ msg: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User(
        username,
        email,
        password: hashedPassword
    );

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token })
} catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
}

});

//login user
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').exists().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } }
}

);