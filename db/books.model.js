const  mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    

},{timestamps : true});
const book_model = mongoose.model('Book' , bookSchema);

module.exports = book_model;
