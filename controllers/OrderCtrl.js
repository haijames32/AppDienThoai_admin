const myModel = require('../models/myModel');

exports.listOrder = async (req, res, next) => {
    let objU = req.session.userLogin

    let listOr = await myModel.donHangModel.find().populate('id_khachhang').populate('id_sanpham')

    // Tính tổng tiền
    listOr.forEach(order => {
        let tong = order.tongtien
        let gia = order.id_sanpham.giasp
        let sl = order.soluong
        tong = gia * sl;
        order.save();
    })

    res.render('orders/list', { listOr: listOr, objU: objU })
}

exports.detailOrder = async (req, res, next) => {
    let objU = req.session.userLogin
    let idOr = req.params.idOr;

    var obj = await myModel.donHangModel.findById(idOr).populate('id_sanpham').populate('id_khachhang');

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu(validate) ở đây

        //tạo đối tượng model và gán dữ liệu
        let objOr = {
            trangthai: req.body.trangthai,
            _id: idOr
        };

        await myModel.donHangModel.findByIdAndUpdate({ _id: idOr }, objOr);

        return res.redirect('/orders')
    }

    res.render('orders/detail', { objU: objU, obj: obj })
}