const NormalUser = require('../modules/module.normaluser');
const {next} = require("lodash");




// R.K Testing Space -----------------------------------------------------------------------

const createRuNormalUser = (req, res) => {
    const {vehicleID, arrivalTime, depatutrTime, vehicleType, stationName} = req.body
    
    // validate fields
    if(!vehicleID || !arrivalTime || !vehicleType || !stationName) {
        return res.status(400).json({
            error: "All Necessary Fields Are Required"
        });
    }

    const query = { vehicleID: req.body.vehicleID }

    NormalUser.findOne(query, (err, result) => {

        if (result == null) {
            
            NormalUser.create({vehicleID, arrivalTime, depatutrTime, vehicleType, stationName},(err,vehicleID) => {
                if(err) {
                    return res.status(400).json({
                        error: 'Error Found'
                    });
                }
                res.json(vehicleID);
            })

        } else {
            
            return res.status(400).json({
                error: 'Your Vehicle is already existing on a Queue !, Please Leave from That Queue First !'
            });
        }

    })

}


//------------------------------------------------------------------------------------------

//R.K Testing Space Two --------------------------------------------------------------------


const normalUserByNumber = async (req, res) => {
    
    const query = {
        vehicleID: req.body.vehicleID
    }

    NormalUser.findOne(query, (err, result) => {

        if (result != null) {

            const objToSend = {
                vehicleID: result.vehicleID,
                arrivalTime: result.arrivalTime,
                depatutrTime: result.depatutrTime,
                vehicleType: result.vehicleType,
                stationName: result.stationName,
            }

            res.status(200).send(JSON.stringify(objToSend))

        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------

//R.K Testing Space Three ------------------------------------------------------------------

const normalUserDeleteByNumber = async (req, res) => {
    
    const query = {
        vehicleID: req.body.vehicleID
    }

    NormalUser.findOne(query, (err, result) => {

        if (result != null) {

            //const id  = result.id
            NormalUser.findByIdAndRemove(result.id).exec()
            res.send("Deleted Successfully !");

        } else {
            res.status(404).send()
        }

    })

};


//------------------------------------------------------------------------------------------


// Working- Tested >>

const createNormalUser = async (req, res) => {

    //validate vehicle id from db
    const {vehicleID, arrivalTime, depatutrTime, vehicleType, stationName} = req.body;

    // validate fields
    if(!vehicleID || !arrivalTime || !vehicleType || !stationName) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    NormalUser.create({vehicleID, arrivalTime, depatutrTime, vehicleType, stationName},(err,vehicleID) => {
          
        if(err) {
            return res.status(400).json({
                error: 'Error Found'
            });
        }
        res.json(vehicleID);
    });

}



// Working- Tested >>
const getAllNormalUsers = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    NormalUser.find()
        .sort([[sortBy, order]])
        .exec((err, NormalUser) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(NormalUser);
        });
}



// Working- Tested >>
const normalUserById = async (req, res) => {
    NormalUser.findById(req.params.id, (error, data) =>{
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};


// Working- Tested >>
const updateNormalUserById = async(req, res) => {
    const { slug } = req.params
    const {vehicleID, arrivalTime, depatutrTime, vehicleType, stationName} = req.body
    NormalUser.findOneAndUpdate({slug}, {vehicleID, arrivalTime, depatutrTime, vehicleType, stationName}, {new: true})
        .exec((err,NormalUser) => {
            if(err) console.log(err)
            res.json(NormalUser);
        })
};


// Working- Tested >>
const deleteNormalUserById = async (req, res) => {
    const id  = req.params.id
    await NormalUser.findByIdAndRemove(id).exec()
    res.send("Deleted");
};




// Working- Tested >>
const countNormalUsers = (req, res) => {
    NormalUser.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};


module.exports = {
    createNormalUser,
    normalUserById,
    getAllNormalUsers,
    updateNormalUserById,
    deleteNormalUserById,
    countNormalUsers,
    normalUserByNumber,
    createRuNormalUser,
    normalUserDeleteByNumber
}