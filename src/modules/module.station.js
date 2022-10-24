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