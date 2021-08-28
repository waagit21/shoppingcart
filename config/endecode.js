const jwt = require("jsonwebtoken");
const configkeys = require("../config/default.json");
const ObjectID64 = require('objectid64')('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_');

function encryptstr(id) {
  var str = "";
  if(id !== null && id !== "") {
    var encoded = ObjectID64.encode(id.toString());
    str = encodeURIComponent(encoded);
    str = str + "==";
  }
  return str;
}

function decryptstr(id) {
  var decoded = "";
  if(id !== null && id !== "") {
    id = id.slice(0, -2);
    var str = decodeURIComponent(id);
    decoded = ObjectID64.decode(str);
  }  
  return decoded;
}

function encryptbfstr(id) {
  var encoded = ObjectID64.encode(id.toString());
  var buffer = Buffer.from(encoded, "utf8"); 
  var base = buffer.toString("base64");
  var str = encodeURIComponent(base);
  return str;
}

function decryptbfstr(str) {
  var str = decodeURIComponent(str);
  var base = Buffer.from(str, "base64");
  var buffer = base.toString("utf8"); 
  var decoded = ObjectID64.decode(buffer);
  return decoded;
}

function settoken(id) {
  var token = jwt.sign({ _id: id, isAdmin: true}, configkeys.myprivatekey) //5f91cf971ddcbc215c31dc84
  return token;
}

module.exports={
  encryptstr:encryptstr,
  decryptstr:decryptstr,
  settoken:settoken,
}