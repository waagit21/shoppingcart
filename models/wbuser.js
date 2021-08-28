const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const configkeys = require("../config/default.json");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    phone: {type: String, required: true},
    address: {type: String, required: true},  
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipcode: {type: String, required: true},
    status: {type: Number, required: true},
    creation_date: {type: String},
    //give different access rights if admin or not 
    isAdmin: Boolean
  });
  
  
  //custom method to generate authToken 
  UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, configkeys.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
  }
  
  const User = mongoose.model('User', UserSchema);
  
  //function to validate user 
  function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(3).max(255).required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      zipcode: Joi.string().required(),
    };
  
    return Joi.validate(user, schema);
  }
  
  exports.User = User; 
  exports.validate = validateUser;