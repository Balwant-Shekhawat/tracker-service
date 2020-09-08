const express = require('express');
const Driver = require('../controllers/driver.controller');
const Response = require('../utils/response');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const {lat = null, long = null} = req.query;

        // we can use this passenger id if needed
        const {id = null} = req.params;

        const drivers = await Driver.findNearByDrivers(lat, long);
        new Response(200).success(drivers).send(req, res);
    } catch (err) {
        new Response(500).error(err).send(req, res);
    }
});

module.exports = router;
