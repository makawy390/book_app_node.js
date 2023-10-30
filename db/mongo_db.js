const  mongoose = require("mongoose");

const url = process.env.MONGO_DATA_BASE;

const connection_DB = mongoose.connect(url).then(()=>{
    console.log('====================================')
    console.log('Connection By Data Base From Mongoose')
    console.log('====================================')
});

module.exports = connection_DB;