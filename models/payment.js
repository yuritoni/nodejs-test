const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Payment = new Schema({
    order  :[ { type: Schema.Types.ObjectId, ref: 'Order' }],
    amount : Number,
    status : { type: Number, default: 1 }
})


// crypto.createHmac('sha1', 'secret')
//              .update('mypasswssord')
//              .digest('base64')
exports.create = (paymentData) => {
    const payment = new Payment(paymentData);
    return payment.save();
};

exports.findById = (id) => {
    return Payment.findById(id).populate('order').then((result) => {
        
       
        return result;
    });
};

exports.patchPayment = (id, paymentData) => {
    return payment.findOneAndUpdate({
        _id: id
    }, paymentData);
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Payment.find()
        .populate('order')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, payments) {
                if (err) {
                    reject(err);
                } else {
                    resolve(payments);
                }
            })
    });
};


exports.listByUser = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Payment.find()
        .populate('order')
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, payments) {
                if (err) {
                    reject(err);
                } else {
                    resolve(payments);
                }
            })
    });
};

exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Payment.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};




module.exports = mongoose.model('Payment', Payment)