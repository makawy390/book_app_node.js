const asyncWrapper = require("../middleWare/asyncWrapper");
const Bought = require('../db/bought.model');
const getAllBought = asyncWrapper(
    async(req,res)=>{
        const query = req.query;
        const limit = query.limit || 20;
        const page = query.page || 1;
        const skip  = (page - 1 ) * limit;
        const allBought = await Bought.find().limit(limit).skip(skip);
      return  res.status(201).json({status : "success"  , data : {allBought}});
    }
);
const delete_book = async (req , res) =>{
  const del = await  Bought.deleteOne({_id : req.params.id});
  res.status(200).json({status : "succes" , data : del });
}
module.exports = {
  getAllBought,
  delete_book
};