var express = require('express');
var router = express.Router();
const User = require('../models/user');


router.get('/', function(req, res, next) {
  User.find({})
  .then(users => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.json(users);
    res.render('users', {users: users});
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  req.body.agree = Boolean(req.body.agree);
  console.log(req.body);
  User.find({email: req.body.email})
  .then((user) => {
    if (user!=null) {
      User.create(req.body)
      .then((user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, msg: 'Successfull'});
          //res.render('users', {users: users});
      }); 
    }
    else{
      res.statusCode = 409;
      res.setHeader('Content-Type', 'application/json');
      res.json({msg: "User " + req.body.firstname + " Exists"});
    }
  }, err => next(err));
});



router.get('/:userId',(req, res, next) => {
    User.findById(req.params.userId)
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.render('display', {user: user, email: email});
      }, (err) => next(err))
      .catch(err => next(err));
});

router.post('/:userId', (req, res, next) => {
  User.find({_id: req.params.userId})
  .then((user) => {
    if (user!=null) {
      User.update({_id: req.params.userId}, req.body)
      .then((user) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, msg: 'Successfull Updation'});
      }); 
    }
    else{
      res.statusCode = 409;
      res.setHeader('Content-Type', 'application/json');
      res.json({msg: "User " + req.body.firstname + " cannot be updated"});
    }
  }, err => next(err));
});

module.exports = router;
