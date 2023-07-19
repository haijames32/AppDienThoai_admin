var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/signinCtrl')
var mdWare = require('../middleWare/checkLogin')

router.get('/',mdWare.not_login,Ctrl.Signin)
router.post('/',mdWare.not_login,Ctrl.Signin)

router.get('/logout',Ctrl.Logout)

module.exports = router;
