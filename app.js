const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes/routes');

// env and database connection configurations
dotenv.config({ path: './config.env' });
require('./src/db/conn');

// set up express and port
const app = express();
const port = 1432 || process.env.PORT;

app.get('/', (req, res) => {
    res.send('home page');
});

// configure routes
app.use('/api', routes);
// undefined route for get
app.get('*', (req, res) => {
    res.status(404).send(`undefined get request: ${req.url}`);
});


// start server on user defined port

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});