const express = require('express');
const Driver = require('../controllers/driver.controller');
const Response = require('../utils/response')

const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.lat || !req.body.long) throw new Error('Invalid Coordinates');
        const {lat = null, long = null} = req.body;
        const {id = null} = req.params;
        
        if (!id) throw new Error('Invalid Driver Id');

        const newLocation = await Driver.updateLocation(id, lat, long);
        new Response(200).success(newLocation).send(req, res);
    } catch (err) {
        new Response(500).error(err).send(req, res);
    }
});

module.exports = router;
