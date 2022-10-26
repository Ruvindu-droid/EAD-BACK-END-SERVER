/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Define the functions which are invoked by the route.normaluser.js file

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (This .js file is commonly used by all the three 
    members)

 ============================================================================================================================
 **/
const NormalUser = require('../modules/module.normaluser');
const {next} = require("lodash");




// R.K Testing Space -----------------------------------------------------------------------
//create a new vehicle entry (to the mobile application database) to the queue
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

//Get the available users details in the queue by using the vehicle number
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
//Remove the user from the queue by considering the vehicle number from the fuel queue
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


//R.K Testing Space Four SPECIAL ------------------------------------------------------------------
//Get details about the normal user by considering the vehicle number as the input data
const normalUserByNumber2 = async (req, res) => {
    
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





// Working- Tested >>
//Create a new vehicle entry to the existing fuel queue of a specific fuel station
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
//Get the list of all the users who are available at the fuel queue
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
//Retrieve a user by considering the document id from the database
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
//Update a user details by considering the document id from the database
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
//Delete a user record by considering the document id from the database
const deleteNormalUserById = async (req, res) => {
    const id  = req.params.id
    await NormalUser.findByIdAndRemove(id).exec()
    res.send("Deleted");
};




// Working- Tested >>
//Count the number of users available in the fuel queue
const countNormalUsers = (req, res) => {
    NormalUser.count({ }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
};

//=================================Test praveena (Working - Just for a testing Purpose)==============
//Retrieve the time and date of a specific fuel station of the last user in the queue
const getLastDateRecord = async (req, res) => {

    
const name="VV";
    NormalUser.findOne({stationName:name}, {}, { sort: { 'createdAt' : 1 } }, function(err, date) {
        console.log( date );
      });


};

//====================================================================================================

//R.K Testing Space FIVE SPECIAL ------------------------------------------------------------------
//Retrieve the date and time of the user, who entered the queue at last for a specific station

const getEarliestRDateRecordByStationID = async (req, res) => {
    
    const name= req.body.stationName;
    NormalUser.findOne({stationName:name}, {}, { sort: { 'createdAt' : 1 } }, function(err, result) {

        if (result != null) {

            const objToSend = {
                vehicleID: result.vehicleID,
                arrivalTime: result.arrivalTime,
                depatutrTime: result.depatutrTime,
                vehicleType: result.vehicleType,
                stationName: result.stationName,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
            }

            res.status(200).send(JSON.stringify(objToSend))

        } else {
            res.status(404).send()
        }

      });

};

//---------------------------------------------------------------------------------------------------------------





module.exports = {
    createNormalUser,
    normalUserById,
    getAllNormalUsers,
    updateNormalUserById,
    deleteNormalUserById,
    countNormalUsers,
    normalUserByNumber,
    createRuNormalUser,
    normalUserDeleteByNumber,
    getLastDateRecord,
    getEarliestRDateRecordByStationID
}