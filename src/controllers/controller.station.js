/**
 ============================================================================================================================
 HEADER COMMENT BLOCK FOR THIS SPECIFIC .JS FILE

 App:- SMART FUEL APP
 For:- EAD Module Related Development - Sri Lankan Institute of Information Technology

 *** This .js file is implemented for :-
Define the functions which are invoked by the route.station.js file

 Author(s): Ruvindu Kaushalya(Leader), Nethmi Hansika, Praveena Thavarajah (This .js file is commonly used by all the three 
    members)

 ============================================================================================================================
 **/
const Station = require('../modules/module.station');
const {next} = require("lodash");




// R.K Testing Space -----------------------------------------------------------------------
//Add a new station to the mobile application database
const createRuStation = (req, res) => {
    const {stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime,dieselfinishtime,status,queue} = req.body
    
   // Valide required parameters if need Here

    const query = { stationname: req.body.stationname }

    Station.findOne(query, (err, result) => {

        if (result == null) {
            
            Station.create({stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime,dieselfinishtime,status,queue},(err,stationname) => {
                if(err) {
                    return res.status(400).json({
                        error: 'Error Found'
                    });
                }
                res.json(stationname);
            })

        } else {
            
            return res.status(400).json({
                error: 'Your Station is Already Registered!'
            });
        }

    })

}

//------------------------------------------------------------------------------------------




//R.K Testing Space Two --------------------------------------------------------------------
//Retrieve the fuel station details by the station name
const stationRByname = async (req, res) => {
    
    const query = {
        stationname: req.body.stationname
    }

    Station.findOne(query, (err, result) => {

        if (result != null) {

            const objToSend = {
                stationname: result.stationname,
                petrolarrivaltime: result.petrolarrivaltime,
                petrolfinishtime: result.petrolfinishtime,
                dieselarrivaltime: result.dieselarrivaltime,
                dieselfinishtime: result.dieselfinishtime,
                status: result.status,
                queue: result.queue,
            }

            res.status(200).send(JSON.stringify(objToSend))

        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------



//R.K Testing Space Three ------------------------------------------------------------------
//Increment the specific station queue depending on the new vehicle entry
const stationincreaseQAmountRByname = async (req, res) => {
    
    const query = {
        stationname: req.body.stationname
    }

    Station.findOne(query, (err, result) => {

        if (result != null) {

            const test = result.queue +1 ;
            const { slug } = result.queue
            Station.updateOne({slug},{queue:test})
            .exec((err,Station) => {
                if(err) console.log(err)
                res.json(Station);
              //res.status(200).send(JSON.stringify(objToSend))
            })

        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------



//R.K Testing Space Four -------------------------------------------------------------------
//Decrease the specific station queue depending on the removal of a vehicle entry from the queue
const stationdecreaseQAmountRByname = async (req, res) => {
    
    const query = {
        stationname: req.body.stationname
    }

    Station.findOne(query, (err, result) => {

        if (result != null) {

            const test = result.queue -1 ;
            const { slug } = result.queue
            Station.updateOne({slug},{queue:test})
            .exec((err,Station) => {
                if(err) console.log(err)
                res.json(Station);
              //res.status(200).send(JSON.stringify(objToSend))
            })

        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------




//R.K Testing Space Five -- Special Methord Used / TestedWorking ------------------------
//Decrease the specific station queue depending on the removal of a vehicle entry from the queue
const StationQdecreaseSpecialFunction = async (req, res) => {
    
    const query = {
        stationname: req.body.stationname
    }

    Station.findOne(query, (err, result) => {

        if (result != null) {

            const stationname = result.stationname;
            const petrolarrivaltime = result.petrolarrivaltime;
            const petrolfinishtime = result.petrolfinishtime;
            const dieselarrivaltime = result.dieselarrivaltime;
            const dieselfinishtime = result.dieselfinishtime;
            const status = result.status;
            const queue = result.queue-1;

            const { slug } = result._id

            Station.findOneAndUpdate({slug}, {stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime,dieselfinishtime,status,queue}, {new: true})
                .exec((err,Station) => {
                      if(err) console.log(err)
                      res.json(Station);
                    })


        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------



//R.K Testing Space Six -- Special Methord Used / TestedWorking ------------------------
//Increment the specific station queue depending on the new vehicle entry
const StationQincreaseSpecialFunction = async (req, res) => {
    
    const query = {
        stationname: req.body.stationname
    }

    Station.findOne(query, (err, result) => {

        if (result != null) {

            const stationname = result.stationname;
            const petrolarrivaltime = result.petrolarrivaltime;
            const petrolfinishtime = result.petrolfinishtime;
            const dieselarrivaltime = result.dieselarrivaltime;
            const dieselfinishtime = result.dieselfinishtime;
            const status = result.status;
            const queue = result.queue+1;

            const { slug } = result._id

            Station.findOneAndUpdate({slug}, {stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime,dieselfinishtime,status,queue}, {new: true})
                .exec((err,Station) => {
                      if(err) console.log(err)
                      res.json(Station);
                    })


        } else {
            res.status(404).send()
        }

    })

};

//------------------------------------------------------------------------------------------


//R.K Testing Space Seventh -------------------------------------------------------------------
//Retrieve all station details

// Working- Tested >>
const getAllStations = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Station.find()
        .sort([[sortBy, order]])
        .exec((err, Station) => {
            if(err) {
                return res.status(400).json ({
                    error: 'No data Found'
                });
            }
            res.json(Station);
        });
}

//update function >>
//Update a station details by considering the document id from the database

const updateDetailsById = async(req, res) => {
    const { slug } = req.params
    const {stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime, dieselfinishtime, status} = req.body
    Station.findOneAndUpdate({slug}, {stationname, petrolarrivaltime, petrolfinishtime, dieselarrivaltime, dieselfinishtime, status}, {new: true})
        .exec((err,Station) => {
            if(err) console.log(err)
            res.json(Station);
        })
};




// Please Enter your Newly Implimented Methords Below the Following Line. (Please Don't edit above)
//-----------------------------------------------------------------------






module.exports = {
    createRuStation,
    stationRByname,
    stationincreaseQAmountRByname,
    stationdecreaseQAmountRByname,
    StationQdecreaseSpecialFunction,
    StationQincreaseSpecialFunction,
    updateDetailsById,
    getAllStations

}
