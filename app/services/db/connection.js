/* eslint-disable no-undef */
const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
};

if (process.env.DB_USER && process.env.DB_PASS) {
    options['user'] = process.env.DB_USER;
    options['pass'] = process.env.DB_PASS;
}

mongoose.connect(process.env.DB, options).then(() => console.log('Connected to MongoDb...'));

module.exports.closeMongoDBConnection = () => mongoose.disconnect();
