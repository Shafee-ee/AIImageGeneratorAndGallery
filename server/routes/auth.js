import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/user.js";

const router = express.Router();

// Route to registe the user
router.post(
    "/register",
    [
        body("username").notEmpty().withMessage("UserName is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        console.log("Request body:", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }



            //create new User instance
            user = new User(
                {
                    username,
                    email,
                    password: password,
                }
            );


            // save user to database
            const savedUser = await user.save();
            console.log("Stored password in DB:", savedUser.password);

            //Generating payload
            const payload = { user: { id: savedUser.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            })
            res.json({ token });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

// Route to log user
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").exists().withMessage("Password is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body; // Extract email and password

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            //debuging (remove after fixed)
            console.log("Entered Password:", password);
            console.log("Stored Password:", user.password)

            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password Match:", isMatch);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.json({ token });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

export default router;
