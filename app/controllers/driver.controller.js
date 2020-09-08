const {DriverLocation} = require('../models/driver-location');
const objectId = require('mongoose').Types.ObjectId;

class DriverController {
    static async updateLocation(id, lat, long) {
        let previousLocation = await DriverLocation.findOne({driver: objectId(id)});
        if (!previousLocation) {
            previousLocation = new DriverLocation({
                driver: objectId(id),
                geolocation: {type: 'Point', coordinates: [parseFloat(long), parseFloat(lat)]},
            });
        } else {
            previousLocation['geolocation']['coordinates'] = [parseFloat(long),parseFloat(lat)];
        }

        return await previousLocation.save();
    }

    static async findNearByDrivers(lat, long) {
        if (!lat || !long) throw new Error('Invalid Coordinates');

        // Checking for drivers whoes location is updated within last 15 min 
        return await DriverLocation.find({
            updatedAt: {$gte: new Date(new Date().getTime() - 1000 * 60 * 15)},

            geolocation: {
                $near: {
                    $geometry: {type: 'Point', coordinates: [parseFloat(long), parseFloat(lat)]},
                    $minDistance: 0,
                    $maxDistance: 200,
                },
            },
        })
            .populate('driver', '_id, name')
            .lean();
    }
}

module.exports = DriverController;
