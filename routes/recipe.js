import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import recipeControllers from '../controllers/recipe.js';

const router = express.Router();
router.get('/', (req, res) => {
    res.json({ message: 'List of recipes' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Recipe created' });
});


export default router;
