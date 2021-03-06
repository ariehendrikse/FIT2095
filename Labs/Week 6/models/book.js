const mongoose = require('mongoose');
let bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        require: true

    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        require: true
    },
    isbn: {
        type: String,
        require: true,
        validator: (val)=>val.length==13 && Number.isInteger(val),
        message: 'ISBN should be 13 Digits'
    },

    pubdate: {
        type: Date,
        default: Date.now
    },

    summary: String
});
module.exports = mongoose.model('Book', bookSchema);