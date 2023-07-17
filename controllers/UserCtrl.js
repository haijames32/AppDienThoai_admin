const myModel = require('../models/myModel');

exports.listUser = async (req, res, next) => {
    res.render('users/list')
}
exports.editUser = async (req, res, next) => {
    res.render('users/edit')
}
exports.delUser = async (req, res, next) => {
    res.redirect('/users')
}
exports.detailUser = async (req, res, next) => {
    res.render('users/detail')
}