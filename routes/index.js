
const blogsController = require('../Controllers/blogsController');
const mainController  = require('../Controllers/mainController');

const constructorMethod = (app) => {

  app.get('/',mainController.Homepage);
  app.use('/Home', mainController.Homepage);
  app.get('/login',mainController.loginRoute);
  app.post('/login', mainController.loginRouteOnPost);
  app.get('/private', mainController.private);
  app.get('/signup',mainController.signupRoutes)
  app.post('/signup', mainController.signupRoutesOnPost);
  app.get('/logout', mainController.logoutRoutes);
  app.get('/Blogs',blogsController.getlatestblogs);
  app.get('/newBlog',blogsController.submitNewBlog);
  app.post('/newBlog',blogsController.submitNewBlogOnPost);
  
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
