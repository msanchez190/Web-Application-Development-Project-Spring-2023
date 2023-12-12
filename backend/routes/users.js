const express = require('express')
const router = express.Router()
var bcrypt = require('bcrypt-nodejs');

const org = process.env.ORG

const { users } = require('../models/models')

router.post('/',  function(req, res) {
    var new_user = new users({
      username: req.body.username, //Had to be changed from example as it did not allow to add for some odd reason
      password: req.body.password, //possibly due to "required" attributes
      org: org
    });
    new_user.password = new_user.generateHash(req.body.password);
    users.create(new_user, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  });
  
router.post('/login', function(req, res) {
        users.findOne({username: req.body.username}, function(err, user) {
        if(user != null){ //Had to be added to verify result of findOne
            if (!user.validPassword(req.body.password)) {
            //password did not match
            res.send('Username or password is not correct')
            } 
            else {
            // password matched. proceed forward
            res.send({isAllowed:true, name:req.body.username})
            }
        }
        else{ //result if findOne does not find a matching username, thus returns null
            res.send('Username not valid')
        }
    })
  });

module.exports = router