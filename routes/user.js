import express from 'express';
import userControllers from '../controllers/user.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'List of users' });
});
router.post('/register', (req, res) => {
    res.json({ message: 'User registered' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'User logged in' });
});


export default router;
