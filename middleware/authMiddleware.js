const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const { User } = require('../model/user/User');


const authMiddleware = expressAsyncHandler(async (req,res,next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        token = req?.headers?.authorization.split(' ')[1];
        try {
            if(token){
                const decoded = jwt.verify(token , process.env.JWT_TOKEN);
 
                const user = await User.findById(decoded?.id).select('-password');
                req.user = user ;
                next();
            }else{
                throw new Error('Theres is not token attached');
            }
        } catch (error) {
            throw new Error('Not authorized, login again')
        }
    }else{
        throw new Error('No token attached to header')
    }
 })
 module.exports = authMiddleware;