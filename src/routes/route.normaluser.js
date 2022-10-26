/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Define the path to routes of normal user

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (This .js file is commonly used by all the three 
    members to define the routes for implemented functions)

 ============================================================================================================================
 **/
const express = require('express');
const router = express.Router();
const controller_normaluser = require('../controllers/controller.normaluser');

module.exports = function () {

    //Normal User
    router.post('/create-normal-user', controller_normaluser.createNormalUser);

    router.post('/create-R-normal-user', controller_normaluser.createRuNormalUser);

    router.post('/get-R-normal-user-by-vehicle-number', controller_normaluser.normalUserByNumber);

    router.get('/get-all-normal-users', controller_normaluser.getAllNormalUsers);

    router.get('/get-normal-user/:id', controller_normaluser.normalUserById);

    router.delete('/delete-normal-user/:id', controller_normaluser.deleteNormalUserById);

    router.put('/update-normal-user/:id', controller_normaluser.updateNormalUserById);

    router.get('/normal-user/count', controller_normaluser.countNormalUsers);

    router.post('/Delete-R-normal-user-by-vehicle-number', controller_normaluser.normalUserDeleteByNumber);

    //prav test
    router.post('/get-last-date', controller_normaluser.getLastDateRecord);    

    //Ruvi Again
    router.post('/get-last-R-date-By-Station-Name', controller_normaluser.getEarliestRDateRecordByStationID);  

    return router;
}