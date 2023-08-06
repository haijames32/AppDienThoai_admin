const myModel = require('../models/myModel');

exports.listUser = async (req, res, next) => {
    let objU = req.session.userLogin

    let dk = null;
    // Search Name
    let loc_name = req.body.searchName
    if (loc_name) {
        dk = { fullname: { $regex: '.*' + loc_name + '.*' } }
    }

    if (req.method == 'POST') {

        let obj = await myModel.userModel.findOne({ username: req.body.username })
        if (obj != null) {
            console.log("Tài khoản đã tồn tại");
            return;
        } else {
            //tạo đối tượng model và gán dữ liệu
            let objU = new myModel.userModel();
            objU.fullname = req.body.fullname;
            objU.username = req.body.username;
            objU.passwd = req.body.passwd;
            objU.email = req.body.email;
            objU.phone = req.body.phone;

            try {
                let new_u = await objU.save();
                console.log(new_u);
                return res.redirect('/users');
            } catch (error) {
                console.log("Lỗi" + error);
            }
        }

    }
    let listUser = await myModel.userModel.find(dk)
    res.render('users/list', { listUser: listUser, objU: objU })
}
exports.editUser = async (req, res, next) => {
    res.render('users/edit')
}

exports.detailUser = async (req, res, next) => {
    let objU = req.session.userLogin
    var detailU = await myModel.userModel.findById(req.params.idU);
    res.render('users/detail', { detailU: detailU, objU: objU })
}