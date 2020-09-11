const mongoose = require('mongoose');
const moment = require('moment')
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
        get: (val)=>moment(val).format('DD-MM-YYYY')
    },
    
    address:{
        unit: String,
        street: String,
        suburb: String,
        state: {
            type: String,
            validate: (val)=> val.length==2 || val.length == 3 || (!val)
        },
        
    
    },
    numBooks: {
        type: Number,
        min: 1,
        max: 150,
        default: 1
    },

    abn: {
        type: Number,
        validate: (val)=>(String(val).length==11) || (!val),
        get: val=>{
            if(val){
                n=String(val);
                return n.slice(0,2)+" "+ n.slice(2,5)+" "+ n.slice(5,8)+" "+ n.slice(8,12)
            }
            else{
                return '-'
            }
            
        }
    },
    dob: Date
});
module.exports = mongoose.model('Author', authorSchema);