const jwt = require("jsonwebtoken");
//const config = require("config");
var utils = require('../config/utils');
const configkeys = require("../config/default.json");

module.exports = function(req, res, next) {
     //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  //console.log(token,"Token");
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    //const decoded = jwt.verify(token, config.get("myprivatekey"));
    //console.log(configkeys.myprivatekey);
    const decoded = jwt.verify(token, configkeys.myprivatekey);
    //console.log(decoded);
    req.jsweb = decoded;
    next();
  } catch (ex) {
    //if invalid token
    utils.logException(ex, null, "Invalid token.")
    res.status(400).send("Invalid token.");
  }
};