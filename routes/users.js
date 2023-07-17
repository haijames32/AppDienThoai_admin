var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/UserCtrl')

// List
router.get('/',userCtrl.listUser);

// Add
router.post('/',userCtrl.listUser);

// Edit
router.put('/edit/:idUser', userCtrl.editUser);

// Detail
router.get('/detail/:idUser', userCtrl.detailUser);

module.exports = router;
