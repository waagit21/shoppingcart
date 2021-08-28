const LocalStrategy = require('passport-local').Strategy;

const users = require('../models/users');
//const roles = require('../models/roles');
//const config = require('../config');
const bcrypt = require('bcrypt');
var endecode = require('../config/endecode');;

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {username:username};
    users.findOne(query, function(err, user){
      if(err){
        return done(null, false, {message: 'Invalid user'});
      }
      if(!user){
        return done(null, false, {message: 'No user found'});
      }
      bcrypt.compare(password, user.password, function(err, isMatch){
        if(err) {
          return done(null, false, {message: 'Invalid password'});
        }
        if(isMatch){
          return done(null, user, {user: user});
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
      var thisuser = {
        id: user.id,
        enid: endecode.encryptstr(user.id),
        name: user.name,
        username: user.username,
        type: user.type,
        token: endecode.settoken(user.id)
      };
      done(err, thisuser);
    });
  });
}
// users.findById(id, function(err, user) {
//   roles.findById(user.admtype, function(err, role) {      
//     var thisuser = {
//       id: user.id,
//       enid: endecode.encryptstr(user.id),
//       name: user.name,
//       username: user.username,
//       type: role.type
//     };
//     done(err, thisuser);
//   });
// });