const myModel = require('../models/myModel');
exports.listStaff = async (req, res, next) => {
    let msg = '';
    let objU = req.session.userLogin

    let dk = null;
    // Search Name
    let loc_name = req.body.searchName
    if (loc_name) {
        dk = { fullname: { $regex: '.*' + loc_name + '.*' } }
    }

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu(validate) ở đây
        let obj = await myModel.managerModel.findOne({ username: req.body.username })
        if (obj != null) {
            msg = "Tài khoản đã tồn tại"
            console.log(msg);
        } else {
            //tạo đối tượng model và gán dữ liệu
            let objU = new myModel.managerModel();
            objU.fullname = req.body.fullname;
            objU.username = req.body.username;
            objU.passwd = req.body.passwd;
            objU.id_gender = req.body.gender;
            objU.phone = req.body.phone;
            objU.role = 2

            try {
                let new_u = await objU.save();
                console.log(new_u);
                return res.redirect('/staffs');
            } catch (error) {
                console.log("Lỗi" + error);
            }
        }

    }
    let listGender = await myModel.genderModel.find()
    let listStaff = await myModel.managerModel.find(dk).populate('id_gender')
    res.render('staffs/list', { listStaff: listStaff, listGender: listGender, objU: objU,msg:msg })
}
exports.editStaff = async (req, res, next) => {
    let msg = ''
    let objU = req.session.userLogin
    let idStaff = req.params.idStaff;

    try {
        var objStaff = await myModel.managerModel.findById(idStaff);
        var listGender = await myModel.genderModel.find();
        var checkusername = await myModel.managerModel.findOne({ username: req.body.username });
    } catch (error) {
        console.log(error.message);
    }

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu(validate) ở đây

        //tạo đối tượng model và gán dữ liệu
        let objStaff = {
            fullname: req.body.fullname,
            phone: req.body.phone,
            id_gender: req.body.gender,
            _id: idStaff
        };

        try {
            // if (checkusername != null) {
            //     msg = "Username đã tồn tại"

            // }else if(objStaff.username == req.body.username){
            //     //thực hiện ghi vào CSDL
            //     await myModel.managerModel.findByIdAndUpdate({ _id: idStaff }, objStaff);
            //     return res.redirect('/staffs')
            // }
            // else {
            //     //thực hiện ghi vào CSDL
            //     await myModel.managerModel.findByIdAndUpdate({ _id: idStaff }, objStaff);
            //     return res.redirect('/staffs')
            // }

            //thực hiện ghi vào CSDL
            await myModel.managerModel.findByIdAndUpdate({ _id: idStaff }, objStaff);
            return res.redirect('/staffs')

        } catch (error) {
            console.log(error.message);
        }

    }

    res.render('staffs/edit', { objStaff: objStaff, listGender: listGender, objU: objU, msg: msg })
}
exports.delStaff = async (req, res, next) => {
    res.redirect('/staffs')
}
exports.detailStaff = async (req, res, next) => {
    res.render('staffs/detail')
}