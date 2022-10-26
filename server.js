const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

//Add New Routes Below the Following >>>>>>>>>>>>>>>>
const SiteNormalUser = require('./src/routes/route.normaluser');
const SiteStation = require('./src/routes/route.station');


dotenv.config();
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

/**
 * Get MONGODB_URI from .env
 */

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) {
        console.log('Database Error:', error.message);
        console.log('######################################################');
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected and EAD Project API on Progress');
    console.log('######################################################');
});

app.route('/').get((req, res) => {
    res.send('Our EAD Project Backend Nodejs API Called Successfully - R.K');

  });


app.use('/normaluser', SiteNormalUser());
app.use('/station', SiteStation());

app.listen(PORT, () => {
    console.log('######################################################');
    console.log(`Server is ON and running on PORT : ${PORT}`);
    console.log('...Wait DB connecting...');
});