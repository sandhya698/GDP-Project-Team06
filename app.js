const express = require('express');

const app = express();
const port = 1432 || process.env.PORT;

app.get('/', (req, res) => {
    res.send('home page');
});

app.get('/register', (req, res) => {
    res.send('<h1>registration page</h1>');
});

app.get('/login', (req, res) => {
    res.send('<h1>login page</h1>');
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});