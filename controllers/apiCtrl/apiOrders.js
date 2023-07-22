const myModel = require('../../models/myModel');

exports.listOrder = async (req, res, next) => {
    let list = await myModel.donHangModel.find({ id_khachhang: req.params.id_khachhang });
    res.json(list)
}

exports.postOrder = async (req, res, next) => {
    if (req.method == 'POST') {
        const { id_khachhang, id_sanpham, soluong, ngaymua, trangthai, tongtien } = req.body;
        const newOrder = new myModel.donHangModel({
            id_khachhang,
            id_sanpham,
            soluong,
            ngaymua,
            trangthai,
            tongtien
        });
        try {
            let obj = await newOrder.save()
            console.log(obj);
            res.status(201).json({ success: true, msg: "Đặt hàng thành công" })
        } catch (error) {
            res.status(401).json({ success: false, msg: "Đặt hàng không thành công" })
            console.log(error);
        }
    }
}