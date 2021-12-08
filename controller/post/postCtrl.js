const expressAsyncHandler = require('express-async-handler');
const Post = require('../../model/post/Post');
const { validateMongoDbId } = require('../../utils/validateId');



//postCtrl
const postUserCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const post = await Post.create(req?.body)
        res.json(post)
    } catch (error) {
        res.json(error)
    }
})

const fetchAllPostCtrl = expressAsyncHandler(async(req,res)=>{
    try {
        const post = await Post.find({})
        res.json(post)
    } catch (error) {
         res.json(error) 
    }
    
})

const updatePostCtrl = expressAsyncHandler( async(req,res)=> {
    const {id} = req.params;
    console.log(id)
    validateMongoDbId(id);
    console.log(req.body)
    try {
        const post = await Post.findByIdAndUpdate(id,{
            title : req?.body?.title,
            description : req?.body?.description
        },{
            new: true,
            runValidators : true
        })
        res.json(post)
    } catch (error) {
        res.json(error)
    }
})

module.exports = {postUserCtrl, fetchAllPostCtrl,updatePostCtrl}