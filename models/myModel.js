var db = require('./db');

// Bảng sanpham
const managerSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        fullname: { type: String, required: true },
        username: { type: String, required: true },
        passwd: { type: String, required: true },
        role: { type: Number, required: true }
    },
    { collection: 'managers' }
);

// Bảng sanpham
const sanPhamSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        tensp: { type: String, required: true },
        giasp: { type: Number, required: true },
        mota: { type: String, required: true },
        tonkho: { type: Number, required: true },
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

// Bảng users
const userSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        fullname: { type: String, required: true },
        username: { type: String, required: true },
        passwd: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true }
    },
    { collection: 'users' }
);

// Bảng donHang
const donHangSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        id_khachhang: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel' },
        tongtien: { type: Number, required: true },
        trangthai: { type: String, required: true },
        ngaymua: { type: Date, required: true }
    },
    { collection: 'donhang' }
);

// Bảng chitietdonHang
const chitietdonHangSchema = new db.mongoose.Schema(
    {
        //đối tượng này định nghĩa cấu trúc của model
        id_donhang: { type: db.mongoose.Schema.Types.ObjectId, ref: 'donHangModel' },
        id_sanpham: { type: db.mongoose.Schema.Types.ObjectId, ref: 'spModel' },
        soluong: { type: Number, required: true },
        giatien: { type: Number, required: true }
    },
    { collection: 'chitietdonhang' }
);



//Tạo model
let spModel = db.mongoose.model('spModel', sanPhamSchema);
let theLoaiModel = db.mongoose.model('theLoaiModel', theLoaiSchema);
let userModel = db.mongoose.model('userModel', userSchema);
let donHangModel = db.mongoose.model('donHangModel', donHangSchema);
let chitietdonHangModel = db.mongoose.model('chitietdonHangModel', chitietdonHangSchema);
let managerModel = db.mongoose.model('managerModel', managerSchema);

module.exports = { spModel, theLoaiModel, donHangModel, userModel, chitietdonHangModel, managerModel };