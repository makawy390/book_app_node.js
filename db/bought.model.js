
const  mongoose = require("mongoose");
const boughtSchema = new mongoose.Schema({
    
    
},{timestamps : true});
module.exports = mongoose.model("Bought" , boughtSchema)