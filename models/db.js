const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/asm_androidnetworking').catch((err) => {
    console.log("Lỗi kết nối CSDL");
    console.log(err);
});

module.exports = { mongoose };

//Một số trường hợp báo lỗi timeout... thì đổi chữ localhost thành 127.0.0.1