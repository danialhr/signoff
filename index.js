const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session');
const passport = require('./config/ppConfig');
require('dotenv').config({ silent: true })
const app = express()
const briefRouter = require ('./routes/briefs_routes')
const userRouter = require ('./routes/users_routes')
const bodyParser = require('body-parser')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const isLoggedIn = require('./middleware/isLoggedIn');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const morgan = require('morgan')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/signoff_wdi')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});
app.use('/users', userRouter)


app.get('/', function (req, res) {
  res.render('signoff_index', {title: 'Signoff'})
})

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use(isLoggedIn)
app.use('/briefs', briefRouter)
//using /briefs so that briefController is using /briefs as the start for everything.

app.get('/logout', function (req, res){
  console.log('I have logout');
  req.logout();
 // FLASH
   console.log('I have logout');
 req.flash('success', 'You have logged out');
 res.redirect('/');
}),

// app.get('/', function(req, res) {
//   // use sendFile to render the index page
//   res.sendFile('index.html');
// });
app.listen(process.env.PORT || 3000)
