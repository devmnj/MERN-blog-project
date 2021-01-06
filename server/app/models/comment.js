const mongoose  = require('mongoose');
const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required: '{PATH} is required!'
    },
    post :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }, 
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Comment',commentSchema);
