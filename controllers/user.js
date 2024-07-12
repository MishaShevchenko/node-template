import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';

const userControllers = {
    register: async (req, res) => {
         const { email, password } = req.body;
         if (!validateEmail(email) || !validatePassword(password)) {
             return res
                 .status(400)
                 .json({ message: 'Invalid email or password' });
         }

         try {
             const hashedPassword = await hashPassword(password);
             await query('INSERT INTO users (email, password) VALUES (?, ?)', [
                 email,
                 hashedPassword
             ]);
             res.status(201).json({ message: 'User registered successfully' });
         } catch (err) {
             res.status(500).json({ message: err.message });
         }
    },

    login: async (req, res) => {const { email, password } = req.body;

    try {
        const users = await query('SELECT * FROM users WHERE email = ?', [
            email
        ]);
        const user = users[0];

        if (!user || !(await matchPasswords(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.TOKEN_ACCESS_SECRET,
            { expiresIn: '1h' }
        );
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Logged in successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }},

    logout: async (req, res) => {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });

    },
};

export default userControllers;
