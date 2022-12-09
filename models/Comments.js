const mongoose = require('mongoose');

const commentSchema = new mongoose.schema({
    userId : {type : mongoose.Schema.type.ObjectId, ref : 'Users'},
    blogId : {type : mongoose.Schema.type.ObjectId, ref : 'Blogs'},
    text : String
});


module.exports = mongoose.model('Comments', commentSchema);