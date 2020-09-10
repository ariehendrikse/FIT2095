const mongoose = require('mongoose');
let authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    dob:  Date,
    
    address:{
        unit: String,
        street: String,
        suburb: String,
        state: {
            type: String,
            validate: (val)=> val==2 || val == 3
        },
        numBooks: {
            type: Number,
            validate: (val)=> 1<=val && val<=150
        }
    
    },

 //   age     : { type: Number, min: 5, max: 20 }, 
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Author', authorSchema);