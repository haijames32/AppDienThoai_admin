var express = require('express');
var router = express.Router();

var apiSign = require('../controllers/apiCtrl/apiSign')
var apiProducts = require('../controllers/apiCtrl/apiProducts')
var apiOrders = require('../controllers/apiCtrl/apiOrders')
var apiUser = require('../controllers/apiCtrl/apiUser')

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Signin
router.post('/signin', apiSign.Signin)

// Register
router.post('/register', apiSign.Register)

// Products
router.get('/products', apiProducts.listPro)
router.post('/products', apiProducts.listPro)
router.get('/cats', apiProducts.listCat)

// Orders
router.get('/orders/:id', apiOrders.listOrder)
router.post('/orders', apiOrders.postOrder)

//User
router.get('/users',apiUser.getUser)
router.put('/users/edit/:id',apiUser.editUser)



module.exports = router;