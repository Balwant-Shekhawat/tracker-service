const mongoose = require('mongoose');
const {Driver} = require('./driver');


const driverLocationSchema = new mongoose.Schema(
    {
        driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
        geolocation: {type: { type: String }, coordinates: [Number]},
    },
    {timestamps: true},
);

const DriverLocation = mongoose.model('DriverLocation', driverLocationSchema);

module.exports = {
    DriverLocation
};
