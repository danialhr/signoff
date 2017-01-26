const User = require('../models/user.js')
const passport = require('../config/ppConfig');

let usersController = {
  //Route are important becasue you uses it to grab and dsipaly information. We don't
  //talk directly to the file itself it's always a thridparty.

  // Read
  signup: (req, res) => {
        res.render('users/signup')
    },

login: (req, res) => {
  res.render('users/login');
  },

display_profile: (req, res) => {
    User.findById(req.params.id, function (err, index) {
      if (err)
      console.log(err);
      return res.json('Not Succesful')
      res.render('users/profile', {singleBriefs:index})
    })
  },
edit: (req, res) => {
    User.findById(req.params.id, function (err, index) {
      if (err) return res.json('Not Succesful')
      res.render('users/edit_profile', {singleBriefs:index})
    })
  },

  // // Create
create: (req, res) => {
  User.create({
    firstName: req.body.firstName,
    //re.body.firstName is linked to the ejs form
    lastName: req.body.lastName,
     email: req.body.email,
     password: req.body.password
   }, function(err, createdUser) {
     if(err){
       // FLASH -
       console.log(err);
       console.log(createdUser);
       req.flash('error', 'Could not create user account');
       res.redirect('/users/signup');
     } else {
       // FLASH
      console.log(createdUser);
       passport.authenticate('local', {
        //  successRedirect:'/users/'+ createdUser._id +'/edit',
        successRedirect:('/users/' + createdUser._id) ,
         successFlash: 'Account created and logged in'
       })(req, res);
     }
   });
 },

  //Update
  update: (req, res) => {
    User.findOneAndUpdate({_id:req.params.id},req.body, function (err, index) {
      if (err) {
        throw err
      }
      res.redirect('/users/profile/'+ req.params.id)
    })
  },

  //Destory
deactivate: (req, res) => {
    User.findOneAndRemove({_id:req.params.id}, function (err) {
      if (err) return res.json('Error Message: Not Succesful')
      res.redirect('./')
    })
  },


}
module.exports = usersController
