const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./src/routes/userRoutes');
const inventoryRouter = require('./src/routes/inventoryRoutes');
const historyRouter = require('./src/routes/historyRoutes');
const adminRouter = require('./src/routes/adminRoutes');

// env and database connection configurations
dotenv.config({ path: './config.env' });
require('./src/db/conn');

// set up express and port
const app = express();
const port = 1432 || process.env.PORT;

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["bloodToken"],
};

// To accept requests from client
app.use(cors(corsOptions));

// parsing incoming requesting to json
app.use(express.json());

// To parse incoming cookies
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('home page');
});

// congigure routes
app.use('/api/user', userRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/history', historyRouter);
app.use('/api/admin', adminRouter);

// undefined route for get and post
app.get('*', (req, res) => {
    res.status(404).send(`undefined get request: ${req.url}`);
});
app.post('*', (req, res) => {
    res.status(404).send(`undefined post request: ${req.url}`);
});

// start server on user defined port
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});