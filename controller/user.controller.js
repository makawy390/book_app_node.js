const User = require('../db/user.model');
const asyncWrapper = require('../middleWare/asyncWrapper');
const bcrypt = require('bcryptjs');
/* ========== Get All Users =========== */
const getAllUsers = asyncWrapper(
    async(req,res)=>{
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip  = (page - 1 ) * limit;
        const allUsers = await User.find({} , {"__v" : false , "password" : false}).limit(limit).skip(skip);
      return  res.status(201).json({status : "success" , data : {allUsers}});
    }
)
/* ========== Create New User =========== */
const register = asyncWrapper(
    async(req,res)=>{
        const {username, email  , password  ,  role } = req.body;
        const oldEmail = await User.findOne({email: email});
        if (oldEmail) {
      return  res.status(400).json({status : "fail" , data : "User is already exists", 
      data_ar : "البريد الالكتروني  موجود بالفعل"});
        }
        /* password hashing */
        const hashingPassword = await bcrypt.hash(password , 10);
        const newUser =  new User({
            username,
            email,
            password : hashingPassword,
            role,
        });
        await newUser.save();
      return  res.status(201).json({status : "success" , data : {newUser} , data_ar : "تم انشاء حساب جديد"});
    }
)
/* ========== Login =========== */
const login = asyncWrapper(
    async(req,res) =>{
    const {email , password} = req.body;
    if (!email && !password) {
    return  res.status(400).json({status : "fail" , data_en : "email and password are required" , 
    data_ar : "يرجاء ادخال البريدك الالكتروني و كلمة المرور"});       
    }
    const findUser = await User.findOne({email : email});
    const matchedPassword = await bcrypt.compare(password , findUser.password);
    if (findUser && matchedPassword) {
    // const token = await generateJWT({email : findUser.email , id : findUser._id});
    return res.status(200).json({status : "success" , data_en : "logged in success" ,
     data_ar : "تم تسجيل الدخول بنجاح" , data_user : {findUser}});       
    }
    else{
    return res.status(500).json({status : "fail" , data : "email and password are not correct" , 
    data_ar : "البريج الالكتروني او كلمة المرور غير صحيحة"});      
    }
    }
)
const updateUser = asyncWrapper(
    async (req , res , next) =>{
        const update = await User.updateOne({_id : req.params.id} , {$set:{...req.body}});
        if (!update) {
            next({status : "Fall"})
        }
        return res.status(200).json({status : "success" , data_ar : "تم التعديل بنجاح"});       
    }
);
const deleteUser = asyncWrapper(
    async(req, res)=>{
        const del = await User.deleteOne({_id : req.params.id});
        return res.status(200).json({status : "success" , data : del , data_ar : "تم حذف الاكونت بنجاح"} );       
    }
)
module.exports = {
    getAllUsers,
    register,
    login,
    updateUser,
    deleteUser
}