import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, data) => {
            if (err) {
                return res.status(498).json({ message: 'token is not valid' });
            }
            next();
        });
    } else {
        res.status(498).json({ message: 'token is not valid' });
    }
};
