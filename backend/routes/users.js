const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(200).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    })

});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  // TODO: find user
  User.findOne({
      email: req.body.email
    })
    .then(targetUser => {
      // TODO: check find user or not
      if (!targetUser) {
        return res.status(401).json({
          message: 'Auth Failed.'
        });
      }

      fetchedUser = targetUser;
      console.log(bcrypt.compare(req.body.password, fetchedUser.password));
      return bcrypt.compare(req.body.password, fetchedUser.password);
    })
    .then(result => {
      // TODO: check password
      if (!result) {
        return res.status(401).json({
          message: 'Auth Failed.'
        });
      }
      // TODO: generate JWT
      const token = jwt.sign({
        email: fetchedUser.email,
        userId: fetchedUser._id
      }, 'secret_this_should_be_longer', {
        expiresIn: '1h'
      });
      console.log(token);

      // TODO: success!
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: err
      });
    })
});



module.exports = router;
