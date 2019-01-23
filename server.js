var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var exphbs = require('express-handlebars');
var passport = require('passport');
var Data_file = require('./models/Data_file.js');
dotenv.load();
var HomeController = require('./controllers/home');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
require('./config/passport');
var app = express();
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b)
      {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 80);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*app.use(function(req, res, next) {
  sendMeData_file(req.user, function(data_file) {
    res.locals.user = req.user ? req.user.toJSON() : null;
    next();
  });
}); 
function sendMeData_file(user, callback) {
  if (!user) {
      callback();
  } else {
  new Data_file({})  
      .query('where', 'id_user', '=', user.id)
      .fetchAll()
      .then(function(data_file) {
        callback(data_file);
      });
  }
}*/
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', HomeController.index);
app.get('/contact', contactController.contactGet);
app.post('/contact', contactController.contactPost);
app.get('/account', userController.ensureAuthenticated, userController.accountGet);
app.put('/account', userController.ensureAuthenticated, userController.accountPut);
//app.post('/home', userController.ensureAuthenticated, HomeController.homePost);
//app.put('/home', userController.ensureAuthenticated, HomeController.homePut);
//app.delete('/home', userController.ensureAuthenticated, HomeController.homeDelete);
//app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.get('/signup', userController.signupGet);
app.post('/signup', userController.signupPost);
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/forgot', userController.forgotGet);
app.post('/forgot', userController.forgotPost);
app.get('/reset/:token', userController.resetGet);
app.post('/reset/:token', userController.resetPost);
app.get('/logout', userController.logout);app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});
console.log("poulet");
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
console.log("poulet");
module.exports = app;