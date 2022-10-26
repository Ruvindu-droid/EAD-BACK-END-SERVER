/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Define the path to routes of station

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (This .js file is commonly used by all the three 
    members to define the routes for implemented functions)

 ============================================================================================================================
 **/
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
    router.post('/update-station-by-name/:id', controller_station.updateDetailsById);
    router.post('/get-r-all-station', controller_station.getAllStations);

    router.post('/get-r-all-station', controller_station.getAllStations);

    return router;
}
