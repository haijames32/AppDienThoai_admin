var express = require('express');
var router = express.Router();
var OrderCtrl = require('../controllers/OrderCtrl')
var mdWare = require('../middleWare/checkLogin')

router.use(mdWare.do_login);// áp dụng cho tất cả router trong file này

// List
router.get('/',OrderCtrl.listOrder);
router.post('/',OrderCtrl.changeStatus);

// Detail
router.get('/detail/:idOr', OrderCtrl.detailOrder);
router.post('/detail/:idOr', OrderCtrl.detailOrder);


module.exports = router;