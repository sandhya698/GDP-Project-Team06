const mongoose = require('mongoose');

const databaseUrl = 'mongodb://127.0.0.1:27017/'

mongoose.connect(`${databaseUrl}${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection succesfull to the database');
}).catch((err) => {
    console.log(`error connecting to the database: ${err}`);
})