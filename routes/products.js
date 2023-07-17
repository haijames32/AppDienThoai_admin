var express = require('express');
var router = express.Router();

var spCtrl = require('../controllers/ProductCtrl')
// var mdWare = require('../middleWare/checkLogin')

var multer = require('multer');
var objImg = multer({ dest: './tmp' })
var objImgEdit = multer({ dest: './tmp' })

// router.use(mdWare.do_login);// áp dụng cho tất cả router trong file này

// List
router.get('/', spCtrl.listProduct)

// Add
router.post('/', objImg.single("file_img"), spCtrl.listProduct);

// Edit
router.get('/edit/:idPro', spCtrl.editProduct);
router.post('/edit/:idPro', objImgEdit.single('file_img_edit'), spCtrl.editProduct);

// Delete
router.get('/del/:idPro', spCtrl.delProduct);

// Detail
router.get('/detail/:idPro', spCtrl.detailProduct);


module.exports = router;