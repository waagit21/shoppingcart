var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const { validate, User } = require('../models/wbuser')
const jwt_decode = require("jwt-decode");


/* GET users listing. */
router.post('/login', async function (req, res) {
  console.log(req.body);
  const user = await User.find({ email: req.body.email });

  console.log(user);
  if (user && user[0].password == req.body.password) {
    const token = user[0].generateAuthToken();
    res.json({
      token: token,
      _id: user[0]._id,
      name: user[0].name,
      email: user[0].email
    });
  } else {
    res.json({
      data: "Wrong Credentials"
    })
  }
});

router.post('/signup', async function (req, res) {
  let user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipcode: req.body.zipcode,
  });

  await user.save();

  const token = user.generateAuthToken();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token
  });

});

router.post('/loginUser', async function (req, res) {
  try {

    const value = jwt_decode(req.body.accessToken);
    const user = await User.find({ _id: value._id });;

    console.log(user);
    res.json({
      id: user[0]._id,
      name: user[0].name,
      email: user[0].email,
      password: user[0].password
    })


  } catch (e) {
    console.log(e);
  }
});


module.exports = router;
