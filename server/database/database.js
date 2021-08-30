const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost/uploadMusic', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to Mongodb...');
        })
        .catch((error) => {
            console.log('Deconnected to Mongodb', error);
        })
}

module.exports = connect;