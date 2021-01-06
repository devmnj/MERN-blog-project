const mongoose = require('mongoose')
const tagSchema=mongoose.Schema({
	tagName:{type:String,require:true},
	posts:[{type: mongoose.Schema.Types.ObjectId,ref:'Post'}],
	user:{type: mongoose.Schema.Types.ObjectId,ref:'User'}
},
{
	timestamps:true
})

module.exports = mongoose.model('Tag',tagSchema)