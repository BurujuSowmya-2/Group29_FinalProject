require('../models/DBConnection');
const Blogs = require('../models/Blogs');
const Users = require('../models/Users');
const validators = require('../validators');


exports.getlatestblogs = async(req,res)=>{
    try {
        const limitNumber = 20;
        const allBlogs = await Blogs.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render('getlatestblogs', { title: 'latest blogs', allBlogs } );
      } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
      }
}

exports.submitNewBlog = async ( req,res,next)=>{
    const user = req.session.user;
    if(user){
       res.render('submitNewBlog');
    }
    else{
        res.redirect('/login');
    }
}

exports.submitNewBlogOnPost = async (req,res) =>{
    try {

        let user = req.session.user;
        console.log(user);
        if(!user){

            return res.redirect('/login');
        }

        let id = req.session.userId;
        console.log(req.body);

        let blogTitle = req.body.title;
        let blogBody = req.body.body;
        let blogDate = req.body.date;

        const errors = validators.checkBlogparams(blogTitle,blogBody,blogDate);

        if(errors){
            throw new Error(errors);
        }

        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
    
        }
    
        const userdata = await Users.findOne({_id:req.session.userId});
        let authorname = userdata.firstName+" "+userdata.lastName;

        const newBlog = new Blogs({
          userid:id,
          author: authorname,
          title: blogTitle,
          body: blogBody,
          picture: newImageName,
          dateCreated:blogDate,
          commentId:[]
        });
        
        const blog = await newBlog.save();




        Users.findOneAndUpdate(
                      { _id: req.session.userId }, 
                     { $push: { blogsId: blog._id  } },
                     function (error, success) {
                     if (error,success) {
                           console.log(error);
                     } else {
                            console.log(success);
                        }
        });


        console.log(blog)
    
        //req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submitNewBlog');

      } catch (error) {
        let err = [];
        console.log(error);
        err.push('error in submit blogs');
        res.render('error',{errors:err,hasErrors : true});
      }
}