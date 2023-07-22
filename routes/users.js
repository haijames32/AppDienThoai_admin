var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/UserCtrl')
var mdWare = require('../middleWare/checkLogin')

router.use(mdWare.do_login);

// List
router.get('/',userCtrl.listUser);

// Add
router.post('/',userCtrl.listUser);

// Edit
router.put('/edit/:idU', userCtrl.editUser);

// Detail
router.get('/detail/:idU', userCtrl.detailUser);

module.exports = router;
