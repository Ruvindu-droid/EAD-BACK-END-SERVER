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