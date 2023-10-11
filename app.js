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

// start server on user defined port

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});