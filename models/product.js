const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Product = new Schema({
    name : String,
    price  : Number,
    qty : Number,
    
})

exports.createProduct = (productData) => {
    const product = new Product(productData);
    return product.save();
};

exports.findById = (id) => {
    return Product.findById(id).then((result) => {
       
        return result;
    });
};

exports.patchProduct = (id, productData) => {
    return Product.findOneAndUpdate({
        _id: id
    }, productData);
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Product.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
    });
};


exports.removeById = (id) => {
    return new Promise((resolve, reject) => {
        Product.deleteMany({_id: id}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


module.exports = mongoose.model('Product', Product)