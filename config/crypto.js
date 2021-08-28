var CryptoJS = require("crypto-js");

function encryptstr(str) {
  var ciphertext = CryptoJS.AES.encrypt(str, 'secret').toString();
  return ciphertext;
}

function decryptstr(str) {
  var bytes  = CryptoJS.AES.decrypt(str, 'secret');
  var text = bytes.toString(CryptoJS.enc.Utf8);
  return text;
}

function encryptobj(obj) {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), 'secret').toString();
  return ciphertext;
}

function decryptobj(data) {
  var bytes  = CryptoJS.AES.decrypt(data, 'secret');
  var obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return obj;
}

module.exports={
  encryptstr:encryptstr,
  decryptstr:decryptstr,
  encryptobj:encryptobj,
  decryptobj:decryptobj,
}