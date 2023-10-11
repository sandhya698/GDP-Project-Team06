const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bloodbanksystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection succesfull to the database');
}).catch((err) => {
    console.log(`error connecting to the database: ${err}`);
})