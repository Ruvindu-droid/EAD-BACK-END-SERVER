const express = require('express');
const router = express.Router();
const controller_station = require('../controllers/controller.station');

module.exports = function () {

    ///Station validate Registation :-
    router.post('/create-r-station', controller_station.createRuStation);
    router.post('/find-r-station-by-name', controller_station.stationRByname);
    router.post('/increment-r-queue-by-name', controller_station.stationincreaseQAmountRByname);
    router.post('/decrment-r-queue-by-name', controller_station.stationdecreaseQAmountRByname);
    router.post('/decrment-r-queue-by-special-function', controller_station.StationQdecreaseSpecialFunction);
    router.post('/increment-r-queue-by-special-function', controller_station.StationQincreaseSpecialFunction);

    return router;
}