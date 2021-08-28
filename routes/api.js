var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var users = require('../controllers/users/users');
var products = require('../controllers/product/products');
var orders = require('../controllers/order/orders');

/* GET users listing. */
router.get('/admblk/:id', auth, users.updAdmBlk);
router.get('/admrsm/:id', auth, users.updAdmRsm);
router.get('/admdel/:id', auth, users.updAdmDel);
router.get('/getwebusers/:id', auth, users.getMoreWebUsers);
router.post('/srhwebusers/:id', auth, users.getSearcheWebUsers);
router.get('/webblk/:id', auth, users.updWebBlk);
router.get('/webrsm/:id', auth, users.updWebRsm);


router.get('/getproducts/:id', auth, products.getMoreProducts);
router.post('/srhproducts/:id', auth, products.getSearchProducts);
router.get('/prdblk/:id', auth, products.updPrdBlk);
router.get('/prdrsm/:id', auth, products.updPrdRsm);
router.get('/prddel/:id', auth, products.updPrdDel);

router.get('/getorders/:id', auth, orders.getMoreOrders);
router.post('/srhorders/:id', auth, orders.getSearchOrders);
router.get('/ordblk/:id', auth, orders.updOrdBlk);
router.get('/ordrsm/:id', auth, orders.updOrdRsm);
router.get('/orddel/:id', auth, orders.updOrdDel);



// router.get('/data', function(req, res) {
//   //res.send({type:'GET'});
//   res.json("dfgfdgd");
// });


module.exports = router;