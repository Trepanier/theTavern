/**
 * Routes for express app
 */
 var express = require('express');
 var _ = require('lodash');
 var path = require('path');
 var collectionController = require("../controllers/collectionController")
 var authController = require("../controllers/authController")

 var App = require(path.resolve(__dirname, '../../', 'public', 'assets', 'server.js'))['default'];

 module.exports = function(app, passport) {
  // app.put('/myRoute', myController.handlerMethod);
  // app.delete('/otherRoute', routeController.handlerMethod);

  // This is where the magic happens. We take the locals data we have already
  // fetched and seed our stores with data.
  // App is a function that requires store data and url to initialize and return the React-rendered html string

  var multer  =   require('multer');
  //var upload = multer({ dest: path.join(__dirname, '../..', 'public/uploads/') })


  var suffix = {
    'image/jpeg' : 'jpg',
    'image/png'  : 'png'
  }
  var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      //uploads is empty
      console.log('file!', file)
      callback(null, __dirname +'/../../public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, `${file.fieldname}-${Date.now()}.${suffix[file.mimetype]}`);
    }
  });

//need to download multer

var upload = multer({ storage : storage}).single('userPhoto');

app.post('/api/v1/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/v1/signup/true', // redirect to the secure profile section
        failureRedirect : '/api/v1/signup/false', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
      }));

app.get('/api/v1/signup/:result',function(req, res){
  res.json({success: req.params.result})
  } )//write function her 

app.post('/api/v1/login', passport.authenticate('local-login', {
        successRedirect : '/api/v1/login/true', // redirect to the secure profile section
        failureRedirect : '/api/v1/login/false', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
      }));

app.get('/api/v1/login/:result',function(req, res){
  res.json({success: req.params.result})
  } )//write function her 

app.get('/api/v1/user',function(req,res){
  res.json({user : _.get(req, 'user.username','none')});
});

app.get('/api/v1/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

  app.get('/api/v1/collection/:slug', collectionController.retreiveOne)
  app.put('/api/v1/collection/:slug', upload, collectionController.addItem)
  app.get('/api/v1/photo', function(req,res){
      return res.json(req.file);
  });

  app.get('/api/v1/getuser', function(req,res){
    res.json(req.user)
  })
  app.get('/api/v1/loggedin',function(req,res){
    if(req.isAuthenticated()){
      res.json({loggedIn : true})
    }else{
      res.json({loggedIn : false})
    }
  })
  
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.writeHead(403, {"Content-Type" : "text/JSON"});
    res.end(JSON.stringify({message : "You are not authorized for this action"}))
  }

  app.get('*', function (req, res, next) {
    App(req, res);
  });

};




//req.perams.slug