const mongoose = require('mongoose')
var bcrypt   = require('bcrypt');
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new mongoose.Schema({
  profileImage: {
      type: String,
    },
    firstName:  {
      type: String,
      required: true,
      minlength: [3, 'First Name must be between 3 and 99 characters'],
      maxlength: [20, 'First Name must be between 3 and 99 characters'],
    },
    lastName:  {
      type: String,
      minlength: [3, 'Last Name must be between 3 and 99 characters'],
      maxlength: [40, 'Last Name must be between 3 and 99 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: emailRegex
    },
    country: {
      type: String,
    },
    password: {
      type: String,
      required: true ,
      minlength: [8, 'Password must be between 8 and 99 characters'],
      maxlength: [99, 'Password must be between 8 and 99 characters'],
    },
    role: {
      type: String,
      minlength: [4, 'Role must be more then 4 character long'],
      maxlength: [100, 'You have reached the maximum characters allowed'],
    },
    summary: {
      type: String,
      minlength: [5, 'Your summary should be longer'],
      maxlength: [2000, 'You have reached the maximum characters allowed'],
    },
    portfolio1kind: {
      type: String,
    },
    portfolio1: {
      type: String,
      minlength: [5, 'Your portfolio must be longer'],
      maxlength: [2000, 'You have reached the maximum characters allowed'],
    },
    portfolio2kind: {
      type: String,
    },
    portfolio2: {
      type: String,
      minlength: [5, 'Your portfolio must be longer'],
      maxlength: [2000, 'You have reached the maximum characters allowed'],
    },
    portfolio3kind: {
      type: String,
    },
    portfolio3: {
      type: String,
      minlength: [5, 'Your portfolio must be longer'],
      maxlength: [2000, 'You have reached the maximum characters allowed'],
    }
  });

  userSchema.pre('save', function(next) {
   var user = this;

   // Only hash the password if it has been modified (or is new)
   if (!user.isModified('password')) return next();

   //hash the password
   var hash = bcrypt.hashSync(user.password, 10);

   // Override the cleartext password with the hashed one
   user.password = hash;
   next();
});

userSchema.methods.validPassword = function(password) {
  // Compare is a bcrypt method that will return a boolean,
  return bcrypt.compareSync(password, this.password);
};

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        // delete the password from the JSON data, and return
        delete ret.password;
        return ret;
    }
}


const User = mongoose.model('User', userSchema)

module.exports = User
