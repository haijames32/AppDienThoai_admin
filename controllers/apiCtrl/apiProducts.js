const myModel = require('../../models/myModel');

exports.listPro = async (req,res,next)=>{
    try {
        var list = await myModel.spModel.find({}).populate('id_theloai');
    } catch (error) {
        console.log(error);
    }
    
    res.json(list);
}