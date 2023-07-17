const myModel = require('../models/myModel');

exports.Signin = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        try {
            let objU = await myModel.managerModel.findOne({ username: req.body.username })
            console.log(objU);
            if (objU != null) {
                //tồn tại username => kiểm tra passwd
                if (objU.passwd == req.body.passwd) {
                    //đúng thông tin tài khoản => lưu vào session
                    req.session.userLogin = objU;
                    //chuyển trang về trang quản trị
                    return res.render('main/dashboard', { objU: objU })
                } else {
                    msg = "Không đúng mật khẩu"
                }
            } else {
                msg = "Tài khoản không tồn tại"
            }
        } catch (error) {
            msg = error.message;
        }
    }
    res.render('main/signin', { msg: msg })
}

exports.Logout = (req, res, next) => {
    if (req.session != null) {
        req.session.destroy(function () {
            console.log("Đăng xuất")
            res.redirect('/');
        });
    }
}