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
    dob:  {
        type: Date,
        get: (val)=>{val.format('DD-MM-YYYY')}
    },
    
    address:{
        unit: String,
        street: String,
        suburb: String,
        state: {
            type: String,
            validate: (val)=> val.length==2 || val.length == 3
        },
        
    
    },
    numBooks: {
        type: Number,
        min: 1,
        max:150,
        default:1
    },
    dob: Date
});
module.exports = mongoose.model('Author', authorSchema);