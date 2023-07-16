var db = require('./db');

// Bảng sanpham
const spSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        tensp: { type: String, required: true },
        giasp: { type: Number, required: true },
        mota: { type: String, required: true },
        image: { type: String, required: true },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectId, ref: 'theLoaiModel' }
    },
    { collection: 'sanpham' }
);

// Bảng users
const userSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        tensp: { type: String, required: true },
        giasp: { type: Number, required: true },
        mota: { type: String, required: true },
        image: { type: String, required: true },
        id_theloai: { type: db.mongoose.Schema.Types.ObjectId, ref: 'theLoaiModel' }
    },
    { collection: 'sanpham' }
);


// Bảng theloai
const theLoaiSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true }
    },
    { collection: 'theloai' }
);



//Tạo model
let spModel = db.mongoose.model('spModel', spSchema);
let theLoaiModel = db.mongoose.model('theLoaiModel', theLoaiSchema);

module.exports = { spModel, theLoaiModel };