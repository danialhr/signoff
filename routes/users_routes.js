const express = require('express')
const usersController = require('../controllers/users_controller')
const passport = require('../config/ppConfig');
const router = express.Router()


router.get('/signup', usersController.signup)

router.post('/signup', usersController.create)
// 'singup' because should match my form action"users/signup", POST

router.get('/', usersController.login)
// list is a key. It's also a function. Check controller brief_controller to understand how this is called out.
// FLASH
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/:id', usersController.display_profile)
//using :id as a consistent we can also call it anything we want
//such as /:briefId but using id for clarity.

// router.get('/:id/dashboard', usersController.display_profile)
//using :id as a consistent we can also call it anything we want
//such as /:briefId but using id for clarity.

router.get('/:id/edit', usersController.edit)


router.put('/:id', usersController.update)

router.delete('/:id', usersController.deactivate)

module.exports = router
