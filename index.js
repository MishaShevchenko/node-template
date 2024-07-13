import express from 'express';
import cookieParser from 'cookie-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import createUserTable from './models/user.js';
import createRecipeTable from './models/recipe.js';
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';

const PORT = process.env.PORT || 5002;
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(PATH, 'public')));

createUserTable();
createRecipeTable();

app.use('/recipes', recipeRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Page is not found' });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});
