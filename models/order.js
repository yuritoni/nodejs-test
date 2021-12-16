const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Order = new Schema({
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    product  :[ { type: Schema.Types.ObjectId, ref: 'Product' }],
    amount : Number,
    status : { type: Number, default: 1 }
})


// crypto.createHmac('sha1', 'secret')
//              .update('mypasswssord')
//              .digest('base64')
exports.create = (orderData) => {
    const order = new Order(orderData);
    return order.save();
};

exports.findById = (id) => {
    return Order.findById(id).then((result) => {
        return result;
    });
};

exports.patchOrder = (id, orderData) => {
    return order.findOneAndUpdate({
        _id: id
    }, orderData);
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Order.find()
        .populate('product')
        .populate('user')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, orders) {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            })
    });
};

exports.listByUser = (user,perPage, page) => {
    return new Promise((resolve, reject) => {
        Order.find({
            user: user
          })
          .populate('product')
          .populate('user')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, orders) {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            })
    });
};


exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Order.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};




module.exports = mongoose.model('Order', Order)