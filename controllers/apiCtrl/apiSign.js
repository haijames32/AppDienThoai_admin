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

                    res.status(200).json({ success: true, msg: "Đăng nhập thành công", obj: objU })
                } else {
                    res.status(401).json({ success: false, msg: "Sai mật khẩu" })
                }
            } else {
                res.status(401).json({ success: false, msg: "Tài khoản không tồn tại" })
            }
        } catch (error) {
            console.log("Lỗi " + error);
        }
    }
}

exports.Register = async (req, res, next) => {
    try {
        var list = await myModel.userModel.find();
    } catch (error) {
        console.log(error);
    }

    if (req.method == 'POST') {
        const { fullname, username, passwd, phone, email } = req.body;
        const newUser = new myModel.userModel({
            fullname,
            username,
            passwd,
            phone,
            email
        });
        try {
            let obj = await newUser.save()
            console.log(obj);
            res.status(201).json({ success: true, msg: "Đăng ký thành công" })
        } catch (error) {
            res.status(500).json({ success: false, msg: "Đăng ký không thành công: " + error })
        }

    }
    // res.json(list)
}