const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

//Port Setting
const PORT = process.env.PORT;

//API Test
app.get('/', (req, res) => {
	res.send(`
        <h1>OAuth</h1>
        <a href="/auth/google">LogIn</a>
        <a href="/auth/google/logout">LogOut</a>
    `);
});

const GoogleAuthRouter = require('./routes/GoogleAuth');
app.use('/auth', GoogleAuthRouter);

//Port
app.listen(PORT, () => console.log(`API running PORT ${PORT}`));
