const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
    {
        name: {type: String, trim: true},
        active: {type: Boolean, default: true},
    },
    {timestamps: true},
);

const Driver = mongoose.model('Driver', driverSchema);

module.exports = {
    Driver
};
