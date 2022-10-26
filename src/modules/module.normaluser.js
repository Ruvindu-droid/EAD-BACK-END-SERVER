/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Create database schema for normal user

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (This .js file is commonly used by all the three 
    members to continue the implementation of relevant functions)

 ============================================================================================================================
 **/

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const NormalUserSchema = new mongoose.Schema(
    {
        vehicleID: {
            type: String,
            required: true,
            trim: true,
            min: 1,
            max: 50
        },
        arrivalTime: {
            type: String,
            trim: true,
            min: 1,
            max: 50
        },
        depatutrTime: {
            type: String,
            trim: true,
            min: 1,
            max: 50
        },
        vehicleType: {
            type: String,
            trim: true,
            min: 1,
            max: 50
        },
        stationName: {
            type: String,
            trim: true,
            min: 1,
            max: 50
        }  
    },
    { timestamps: true}
);

module.exports = mongoose.model('normalusers', NormalUserSchema);