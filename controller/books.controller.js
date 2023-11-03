const Books = require('../db/books.model');
const { FAIL , SUCCESS , OK } = require('../utils/httpStatus')
const asyncWrapper = require('../middleWare/asyncWrapper');
const appError = require('../utils/appError') 
/* ====================== Get All Books ================================= */
const getAllBooks = async (req , res) =>{
    const query = req.query;
    const limit = query.limit || 20;
    const page = query.page || 1;
    // [ p1 , p2 , p3 , p4 , p5 , p6 , p7 , p8 ]
    const skip = (page - 1) * limit;
    const all = await Books.find({} , {"__v" : false}).limit(limit).skip(skip);
    res.status(201).json({status : OK , data : all});
}
/* ====================== Add New Book ================================= */
const addBook = asyncWrapper(
    async(req , res , next)=>{
            const newBook = await new Books(req.body);
            await newBook.save();
            res.status(200).json({status : SUCCESS , data : {newBook} , data_ar : "تم اضافة كتاب جديد" })
            if (!newBook) {
            const error = appError.create("not found Book" , 404 , SUCCESS );;
            next(error);                  
            }
})

/* ====================== Search Book By Id ================================= */
const get_single_book = asyncWrapper(
    async (req , res , next)=>{
        const {id} = req.params;
        const get_book = await Books.findById({_id : id});
           if (!get_book) {
            const error = appError.create("not found Book" , 404 , SUCCESS );;
           return next(error);
           }
           res.status(200).json({status : SUCCESS , data : get_book});
    }
)
/* ====================== Update Book By Id ================================= */
const update_book = asyncWrapper(
    async (req ,res , next) =>{
            const update = await Books.updateOne({_id : req.params.id} , {$set: {...req.body}});
            if (!update) {
                next({status : FAIL , data : null})
            }
        res.status(200).json({status : SUCCESS , data : {update} , data_ar : "تم تعديل بنجاح"})
      
    }
)
/* ====================== delete Book By Id ================================= */
const delete_book = async (req , res) =>{
    const del = await Books.deleteOne({_id : req.params.id});
    res.status(200).json({status : SUCCESS , data : del });
}

module.exports = {
    addBook,
    getAllBooks,
    get_single_book,
    update_book,
    delete_book
}