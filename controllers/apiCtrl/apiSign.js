const myModel = require('../../models/myModel');

exports.Signin = async (req, res, next) => {
    if (req.method == 'POST') {
        try {
            let objU = await myModel.userModel.findOne({ username: req.body.username });
            console.log(objU);
            if (objU != null) {
                //tồn tại username => kiểm tra passwd
                if (objU.passwd == req.body.passwd) {
                    //đúng thông tin tài khoản
                    res.json({ status: 200, msg: "Đăng nhập thành công", obj: objU })
                } else {
                    res.json({ status: 0, msg: "Sai mật khẩu" })
                }
            } else {
                res.json({ status: 0, msg: "Tài khoản không tồn tại" })
            }
        } catch (error) {
            console.log("Lỗi " + error);
        }
    }
}

exports.Register = async (req, res, next) => {



    if (req.method == 'POST') {
        var obj = await myModel.userModel.findOne({ username: req.body.username });
        const { fullname, username, passwd, phone, email } = req.body;
        if (obj != null) {
            res.json({ status: 0, msg: "Tài khoản đã tồn tại" })
        } else {
            const newUser = new myModel.userModel({
                fullname,
                username,
                passwd,
                phone,
                email
            })
            try {
                let obj = await newUser.save()
                res.json({ status: 200, msg: "Đăng ký thành công" })
            } catch (error) {
                res.json({ status: 0, msg: "Đăng ký không thành công: " + error })
            }
        }



    }
    // res.json(list)
}