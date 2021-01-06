const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required: '{PATH} is required!'
    },
    bio: {
        type:String
    },
    email:{
        type:String
    },
    website:{
        type:String
    },
    password:{type:String,required: '{PATH} is required!',default:"123"},
    
    posts : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Post'}
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('User',UserSchema);

