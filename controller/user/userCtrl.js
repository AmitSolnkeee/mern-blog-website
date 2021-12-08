const { User } = require("../../model/user/User")
const expressAsyncHandler = require('express-async-handler');
const generateWebToken = require("../../config/generateWebToken/generateWebToken");
const { validateMongoDbId } = require("../../utils/validateId");



//---------------User register -----------------

const userRegisterCtrl =expressAsyncHandler(async(req,res) => {
    const userExist = await User.findOne({email : req?.body?.email});
    if(userExist) throw new Error('User already exist')
     try {
         const user = await User.create({
             firstName : req?.body?.firstName ,
             lastName : req?.body?.lastName ,
             email : req?.body?.email,
             password : req?.body?.password
         })
         res.json(user)
     } catch (error) {
         res.json(error)
     }
 })
 
 //------------UserLoginCtrl----------------

 const userLoginCtrl = expressAsyncHandler(async (req,res) => {
     const {email, password} = req?.body;
      const userExist = await User.findOne({email});
      if(userExist && userExist.password == password){
          res.json({
              _id : userExist._id,
              firstName : userExist?.firstName,
              lastName : userExist?.lastName,
              email : userExist?.email,
              profilePhoto : userExist?.profilePhoto,
              bio : userExist?.bio,
              token : generateWebToken(userExist._id)
          })
      }else{
          res.status(401);
          res.json('Login credential not found')
      }
 })

 //-----------fetchall user for login User ----------
 const userFetchAllCtrl = expressAsyncHandler(async(req,res)=> {
     try {
         const user = await User.find({});
         res.json(user)
     } catch (error) {
         res.json(error)
     }
 })

 //---------------delete user -----------------------
 const userDeleteCtrl = expressAsyncHandler(async(req, res) =>{
     const {id} = req.params ;
     validateMongoDbId(id);
    
     const user = await User.findByIdAndDelete(id);
     res.json(user)
 })

 const userFetchSingleUser = expressAsyncHandler( async ( req, res) => {
     const {id} = req.params ;
     validateMongoDbId(id);
     try {
       const user = await User.findById(id)
       res.json(user)  
     } catch (error) {
         res.json(error)
     }
     
 })

 const userUpdateProfileCtrl = expressAsyncHandler( async (req,res) => {
     const {id} = req?.user ;
     validateMongoDbId(id);
     try {
         const user = await User.findByIdAndUpdate(id , {
             firstName : req?.body?.firstName,
             lastName : req?.body?.lastName,
             email : req?.body?.email,
             bio : req?.body?.bio
         },{
             new : true ,
             runValidators : true
         })
         res.json(user)
     } catch (error) {
         res.json(error)
     }
    
 })

 const userFollowCtrl = expressAsyncHandler( async(req, res) => {
     //1) user will find the id of person to follow from req.body
     //*** after id is found the followers of user will get updated with id of user
     //2) the following of user in params will get updated with id of person
     const {followId} = req?.body ;
     const loginId = req.user.id ;
     
     const followUser = await User.findById(followId);
     const targetUser = followUser?.followers.find(itm => itm.toString() == loginId.toString());
     if(targetUser) throw new Error('You are already following user')
      const user = await User.findByIdAndUpdate(followId ,{
         $push : {followers : loginId}
     },{
         new : true
     })

     await User.findByIdAndUpdate(loginId, {
         $push : {following : followId}
     },{
         new : true
     })
     res.json(`You have succesfully followed ${user.firstName} ${user.lastName}`)
     
 })

 const userUnfollowCtrl = expressAsyncHandler(async(req,res) => {
    const {unfollowId} = req?.body ;
    const loginId = req.user.id ;

    const user = await User.findByIdAndUpdate(unfollowId, {
        $pull : { followers : loginId}
    },{
        new : true 
    })
    await User.findByIdAndUpdate(loginId,{
        $pull : {following : unfollowId}
    },{
        new : true
    })
    res.json(`You have succesfully unfollowed ${user.firstName} ${user.lastName}`)
 })

 const userBlockCtrl  = expressAsyncHandler(async(req,res) => {
     const {id} = req.params;
     validateMongoDbId(id);
     
     const user = await User.findByIdAndUpdate(id, {
         isBlocked : true
     },{
         new:true
     })
     res.json(`You have blocked ${user.firstName} ${user.lastName}`)
 })

 const userUnBlockCtrl  = expressAsyncHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    
    const user = await User.findByIdAndUpdate(id, {
        isBlocked : false
    },{
        new:true
    })
    res.json(`You have Unblocked ${user.firstName} ${user.lastName}`)
})

module.exports = {userRegisterCtrl, userLoginCtrl,userFetchAllCtrl, userDeleteCtrl,userFetchSingleUser,userUpdateProfileCtrl,

userFollowCtrl, userUnfollowCtrl, userBlockCtrl, userUnBlockCtrl}