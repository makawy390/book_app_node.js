// 1) require to env
require('dotenv').config()
// 2) import express 
const express = require("express");
// 3) app to express
const app = express();
// 4) import to cors library
const cors = require('cors')
app.use(cors());
// 5) app to using express to json
app.use(express.json());
// 6) connection To Data base
const connection_DB = require('./db/mongo_db');
// 7) Add Router Books
const booksRouter = require('./routes/books.route');
app.use('/api/books' , booksRouter);
// 8) Add Router User 
const userRouter = require('./routes/user.route');
app.use('/api/user' , userRouter);
// 9) add Error Api
app.all('*', (req, res, next) => {
    res.status(404).json({status : "Error" , });
    next();
});
//  10) Error Middle Ware 
app.use((error , req , res , next)=>{
    res.status(404).json({status : "ERROR" , message : error.message});
});
// 11)  upload image
const path = require('path')
app.use('/upload', express.static(path.join(__dirname , 'upload')))

// 12) listening to port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
})

