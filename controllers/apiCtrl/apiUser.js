const myModel = require('../../models/myModel');

exports.getUser = async (req, res, next) => {
    try {
        var list = await myModel.userModel.find();
    } catch (error) {
        res.status(401).json({ msg: "Lỗi: ", error })
    }
    res.json(list)
}

exports.editUser = async (req, res, next) => {
    let idU = req.params.id;

    //tạo đối tượng model và gán dữ liệu
    let objU = {
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        _id: idU
    };

    try {
        await myModel.userModel.findByIdAndUpdate({ _id: idU }, objU);
        res.status(201).json({ msg: "Thay đổi thông tin thành công" })
    } catch (error) {
        res.status(401).json({ msg: "Lỗi: ", error })
    }
}