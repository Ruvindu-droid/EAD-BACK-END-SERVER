const Station = require('../modules/module.station');
const {next} = require("lodash");




// R.K Testing Space -----------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------



// Please Enter your Newly Implimented Methords Below the Following Line. (Please Don't edit above)
//-----------------------------------------------------------------------






module.exports = {
    createRuStation,
    stationRByname,
    stationincreaseQAmountRByname,
    stationdecreaseQAmountRByname,
    StationQdecreaseSpecialFunction,
    StationQincreaseSpecialFunction,
    getAllStations

}