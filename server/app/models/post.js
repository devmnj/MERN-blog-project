const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required:   '{PATH} is required!'
    },
    content: {
        type: String,
        required:   '{PATH} is required!'
    },
    
    comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'}
    ],
    tags:[{type: mongoose.Schema.Types.ObjectId,ref:'Tag'}],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema);