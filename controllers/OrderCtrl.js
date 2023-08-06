const myModel = require('../models/myModel');

exports.listOrder = async (req, res, next) => {
    let objU = req.session.userLogin

    let listOr = await myModel.donHangModel.find().populate('id_khachhang').populate('id_sanpham')

    // Tính tổng tiền
    listOr.forEach(order => {
        let gia = order.id_sanpham.giasp
        let sl = order.soluong
        order.tongtien = gia * sl;
        order.save();
    })

    res.render('orders/list', { listOr: listOr, objU: objU })
}

exports.changeStatus = async (req, res, next) => {
    console.log('>>>', req.body.id);
    let idOr = req.body.id;

    let objOr = {
        trangthai: "Chờ thanh toán",
        _id: idOr
    };

    try {
        await myModel.donHangModel.findByIdAndUpdate({ _id: idOr }, objOr);
    } catch (error) {
        console.log(error);
    }

    return res.redirect('/orders')

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
