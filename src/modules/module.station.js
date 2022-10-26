/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Create database schema for station

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (THis .js file is commonly used by all the three 
    members to continue the implementation of relevant functions)

 ============================================================================================================================
 **/
const { isInteger } = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const StationSchema = new mongoose.Schema(
    {
        stationname: {
            type: String,
            required: true,
            min: 1,
            max: 50
        },
        petrolarrivaltime: {
            type: String,
            min: 1,
            max: 50
        },
        petrolfinishtime: {
            type: String,
            min: 1,
            max: 50
        },
        dieselarrivaltime: {
            type: String,
            min: 1,
            max: 50
        },
        dieselfinishtime: {
            type: String,
            min: 1,
            max: 50
        },
        status: {
            type: String,
            required: true,
            min: 1,
            max: 50
        },
        queue: {
            type: Number,
            required: true,
        }    
    },
    { timestamps: true}
);

module.exports = mongoose.model('station', StationSchema);