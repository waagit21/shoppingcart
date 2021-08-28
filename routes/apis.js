var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var users = require('../controllers/users/users');
var products = require('../controllers/product/products');
var orders = require('../controllers/order/orders');

router.get('/getAllproducts', products.getApiAllProducts);
router.get('/getproducts/:id', products.getApiProducts);
router.get('/getproductsbyctg/:id', products.getApiProductsByCategory);
router.post('/srhproducts', products.getApiSrhProducts);

router.post('/insorder', orders.insertApiOrder);

module.exports = router;