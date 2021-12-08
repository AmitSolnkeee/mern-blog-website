const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
       type : String,
       required : [true , 'First Name is required']
    },
    lastName : {
        type : String,
        required : [true , 'Last Name is required']
    },
    email : {
        type : String,
        required : [true , 'Email is required']
    },
    password : {
        type : String,
        required : [true , 'Password is required']
    },
    profilePhoto : {
        type : String,
        default :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
    },
    bio : {
        type : String
    },
    postCount : {
        type : Number,
        default : 0
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        enum : ['Admin', 'Guest', 'Blogger']
    },
    isFollowing : {
        type : Boolean,
        default : false
    },
    onFollowing : {
        type : Boolean,
        default : false
    },
    viewedBy : {
        type : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ]
    },
    followers : {
        type : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ]
    },
    following : {
        type : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            }
        ]
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

const User = mongoose.model('User' , userSchema);

module.exports = {User}