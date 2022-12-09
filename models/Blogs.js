const mongoose = require('mongoose');

const blogSchema = new mongoose.schema({
    userid : {type : mongoose.Schema.type.ObjectId, ref:'User'},
    body : String,
    dateCreated : Date,
    commentId : [{type : mongoose.Schema.type.ObjectId, ref : 'Comments'}],
    likes_count : Number

});


module.exports = mongoose.model('Recipe', recipeSchema);