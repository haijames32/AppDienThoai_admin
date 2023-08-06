const myModel = require('../../models/myModel');

exports.listOrder = async (req, res, next) => {
    // console.log( req.body.id_khachhang);\
    try {
        let list = await myModel.donHangModel.find({ id_khachhang: req.params.id }).populate('id_khachhang').populate('id_sanpham')
        console.log(list);
        // Tính tổng tiền
        list.forEach(order => {
            let gia = order.id_sanpham.giasp
            let sl = order.soluong
            order.tongtien = gia * sl;
            order.save();
        })

        res.json(list)
    } catch (error) {
        console.log('err ', error);
    }

}

exports.postOrder = async (req, res, next) => {
    if (req.method == 'POST') {
        let objPro = await myModel.spModel.findOne({ _id: req.body.id_sanpham })


        let newOrder = new myModel.donHangModel();
        newOrder.id_khachhang = req.body.id_khachhang;
        newOrder.id_sanpham = req.body.id_sanpham;
        newOrder.soluong = req.body.soluong;
        newOrder.ngaymua = new Date();
        newOrder.trangthai = "Chờ xác nhận";
        newOrder.tongtien = 0;

        try {
            objPro.tonkho -= req.body.soluong;
            objPro.save()
            let obj = await newOrder.save()
            console.log(obj);
            res.status(201).json({ success: true, msg: "Đặt hàng thành công" })
        } catch (error) {
            res.status(401).json({ success: false, msg: "Đặt hàng không thành công" })
            console.log(error);
        }
    }
}
//lấy tất cả sản phẩm