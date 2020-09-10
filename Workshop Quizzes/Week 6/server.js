const mongoose = require('mongoose');
const Flight = require('./models/flightschema');

mongoose.connect('mongodb://59.0.152.66:88566/Agency', function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
    let flight1 = new Flight({
        from: 'MEL',
        to: 'JNB',
        airline: 'VA',
        cost: 2500
        });
    flight1.save(function (err) {if (err) throw err;
        console.log('Flight1 successfully Added to DB');});
});