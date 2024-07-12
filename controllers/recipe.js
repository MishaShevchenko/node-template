import query from '../config/db.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await query('SELECT * FROM recipes');
            res.json(recipes);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getOneRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const [recipe] = await query('SELECT * FROM recipes WHERE id = ?', [
                id
            ]);
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
            res.json(recipe);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    postRecipe: async (req, res) => {
        const { title, ingredients, instructions } = req.body;
        try {
            await query(
                'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)',
                [title, ingredients, instructions]
            );
            res.status(201).json({ message: 'Recipe created successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, instructions } = req.body;
        try {
            await query(
                'UPDATE recipes SET title = ?, ingredients = ?, instructions = ? WHERE id = ?',
                [title, ingredients, instructions, id]
            );
            res.json({ message: `Recipe with id ${id} updated successfully` });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            await query('DELETE FROM recipes WHERE id = ?', [id]);
            res.json({ message: `Recipe with id ${id} deleted successfully` });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default recipeControllers;
