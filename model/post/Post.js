const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],
        trim : true
    },
    description : {
        type : String,
        required : [true, 'Description is required'],
        trim : true
    },
    image : {
        type : String,
        default : 'https://media.istockphoto.com/photos/flying-color-books-on-pastel-yellow-background-picture-id1304915362?b=1&k=20&m=1304915362&s=170667a&w=0&h=1oBLMT9JLYt6Ju3LbSppu8Fga92YfvSHiPu7zQlculg='
    },  
},{
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps: true      
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;