const myModel = require('../models/myModel');
var fs = require('fs')

exports.listProduct = async (req, res, next) => {
    objU = req.session.userLogin;

    let ListTL = await myModel.theLoaiModel.find();


    var dk = null
    var sort = null
    var iCat = 0
    let iSort = 0

    //
    let idCat = req.body.loc_theloai
    if (idCat) {
        let locCat = { id_theloai: idCat }
        dk = locCat
        ListTL.map((item, i) => {
            if (item.id == idCat) {
                iCat = i
            }
        })
    }

    // Sort Price 
    let isSort = false

    let sortPrice = req.body.sortPrice
    if (sortPrice) {
        console.log('sortPrice ', sortPrice);
        iSort = sortPrice == 1 ? -1 : 1
        sort = { giasp: iSort }
        isSort = true
    }

    // Sort Name
    let sortName = req.body.sortName
    if (sortName) {
        console.log('sortName ', sortName);
        iSort = sortName == 1 ? -1 : 1
        sort = { tensp: iSort }
        isSort = true
    }

    // Search Name
    let loc_name = req.body.searchName
    if (loc_name) {
        dk = { tensp: { $regex: '.*' + loc_name + '.*' } }
    }

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu(validate) ở đây
        //tạo đối tượng model và gán dữ liệu
        if (dk == null && sort == null) {
            let objSP = new myModel.spModel();
            objSP.tensp = req.body.tensp;
            objSP.giasp = req.body.giasp;
            objSP.tonkho = req.body.tonkho;
            objSP.id_theloai = req.body.theloai;
            objSP.mota = req.body.mota;

            try {
                fs.rename(req.file.path, './public/images/' + req.file.originalname, async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // nếu không có lỗi
                        console.log("Url: http://localhost:3000/images/" + req.file.originalname);
                        objSP.image = 'http://localhost:3000/images/' + req.file.originalname;
                        try {
                            //thực hiện ghi vào CSDL
                            let new_sp = await objSP.save();
                            console.log(new_sp);
                            msg = 'Thêm thành công';
                            return res.redirect('/products');
                        } catch (error) {
                            msg = 'Lỗi ' + error.message;
                            console.log(error);
                        }
                    }
                })
            } catch (error) {
                console.log("Lỗi" + error);
            }
        }
    }

    let listPro = await myModel.spModel.find(dk).populate('id_theloai').sort(sort);

    res.render('products/list', { listPro: listPro, ListTL: ListTL, objU: objU, iSort: iSort, iCat: iCat })
}

exports.addOrder = async (req, res, next) => {
    objU = req.session.userLogin;
    try {
        var listSp = await myModel.spModel.find();
        var listU = await myModel.userModel.find();
    } catch (error) {
        console.log(error.message);
    }

    if (req.method == 'POST') {

        let newOrder = new myModel.donHangModel();
        newOrder.id_khachhang = req.body.id_khachhang;
        newOrder.id_sanpham = req.body.id_sanpham;
        newOrder.soluong = req.body.soluong;
        newOrder.trangthai = "Chờ thanh toán";
        newOrder.ngaymua = new Date();
        newOrder.tongtien = 0;


        try {
            let new_or = await newOrder.save();
            console.log(new_or);
            return res.redirect('/products')
        } catch (error) {
            console.log(error);
        }
    }

    res.render('products/addorder', { listSp: listSp, listU: listU, objU: objU })
}

exports.editProduct = async (req, res, next) => {
    let idPro = req.params.idPro;

    try {
        var objSP = await myModel.spModel.findById(idPro);
        var listTL = await myModel.theLoaiModel.find();
    } catch (error) {
        console.log(error.message);
    }

    if (req.method == 'POST') {
        //kiểm tra hợp lệ dữ liệu(validate) ở đây

        //tạo đối tượng model và gán dữ liệu
        let objSP = {
            tensp: req.body.tensp,
            giasp: req.body.giasp,
            mota: req.body.mota,
            tonkho: req.body.tonkho,
            id_theloai: req.body.theloai,
            _id: idPro
        };

        try {
            fs.rename(req.file.path, './public/images/' + req.file.originalname, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    // nếu không có lỗi
                    objSP.image = 'http://localhost:3000/images/' + req.file.originalname;
                    try {
                        //thực hiện ghi vào CSDL
                        await myModel.spModel.findByIdAndUpdate({ _id: idPro }, objSP);
                        msg = 'Sửa thành công';
                    } catch (error) {
                        msg = 'Lỗi ' + error.message;
                        console.log(error);
                    }
                }
            })
        } catch (error) {
            await myModel.spModel.findByIdAndUpdate({ _id: idPro }, objSP);
            msg = 'Sửa thành công';
        }

        return res.redirect('/products')
    }

    res.render('products/edit', { objSP: objSP, listTL: listTL })
}

exports.delProduct = async (req, res, next) => {
    res.redirect('/products')
}

exports.detailProduct = async (req, res, next) => {
    var detailPro = await myModel.spModel.findById(req.params.idPro).populate('id_theloai');
    res.render('products/detail', { objSP: detailPro })
}