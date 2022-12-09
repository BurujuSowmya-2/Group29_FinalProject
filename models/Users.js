const mongoose = require('mongoose');

const userSchema = new mongoose.schema({
    firstName : String,
    lastName:String,
    email:String,
    gender : String,
    age : Number,
    password : String,
    blogsId : [{type : mongoose.Schema.type.ObjectId, ref : 'Blogs'}],
    commentsId : [{type : mongoose.Schema.type.ObjectId, ref : 'Comments'}]
});


module.exports = mongoose.model('Users', userSchema);