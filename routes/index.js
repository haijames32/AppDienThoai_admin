var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/signinCtrl')

router.get('/',Ctrl.Signin)
router.post('/',Ctrl.Signin)

router.get('/logout',Ctrl.Logout)

module.exports = router;
