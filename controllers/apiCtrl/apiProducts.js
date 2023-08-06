const myModel = require('../../models/myModel');

exports.listPro = async (req, res, next) => {
    if(req.method == 'POST'){
        // Search Name
        var dk = null
        let loc_name = req.body.searchpro
        if (loc_name) {
            dk = { tensp: { $regex: '.*' + loc_name + '.*' } }
        }
    }
    try {
        
        var list = await myModel.spModel.find(dk).populate('id_theloai');
    } catch (error) {
        console.log(error);
    }

    res.json(list);
}

exports.listCat = async (req, res, next) => {
    try {
        var list = await myModel.theLoaiModel.find();
    } catch (error) {
        console.log(error);
    }

    res.json(list);
}