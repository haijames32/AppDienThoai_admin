var express = require('express');
var router = express.Router();
var staffCtrl = require('../controllers/StaffCtrl')
var mdWare = require('../middleWare/checkLogin')

router.use(mdWare.do_login);// áp dụng cho tất cả router trong file này

// List
router.get('/',staffCtrl.listStaff);

// Add
router.post('/',staffCtrl.listStaff);

// Edit
router.get('/edit/:idStaff', staffCtrl.editStaff);
router.post('/edit/:idStaff',staffCtrl.editStaff);

// Delete
router.delete('/del/:idStaff',staffCtrl.delStaff);

// Detail
router.get('/detail/:idStaff',staffCtrl.detailStaff);


module.exports = router;