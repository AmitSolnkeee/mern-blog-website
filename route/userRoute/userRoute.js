const express = require('express');
const { userRegisterCtrl, userLoginCtrl, userFetchAllCtrl, userDeleteCtrl, userFetchSingleUser, userUpdateProfileCtrl, userFollowCtrl, userUnfollowCtrl, userBlockCtrl, userUnBlockCtrl } = require('../../controller/user/userCtrl');
const authMiddleware = require('../../middleware/authMiddleware');


const userRoute = express.Router();


userRoute.post('/register' , userRegisterCtrl);

userRoute.post('/login',userLoginCtrl);

userRoute.get('/' , authMiddleware , userFetchAllCtrl);

userRoute.put('/updateprofile' , authMiddleware , userUpdateProfileCtrl);

userRoute.put('/follow', authMiddleware, userFollowCtrl);

userRoute.put('/unfollow', authMiddleware, userUnfollowCtrl);

userRoute.delete('/:id' , authMiddleware , userDeleteCtrl);

userRoute.get('/:id' ,authMiddleware, userFetchSingleUser);

userRoute.put('/user-block/:id',authMiddleware,userBlockCtrl);

userRoute.put('/user-unblock/:id',authMiddleware,userUnBlockCtrl)

module.exports = {userRoute}