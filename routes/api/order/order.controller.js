//configure routes for order API's here

const ordersEndpoint = '/order';
const orderCollection = 'order'
var ObjectID = require('mongodb').ObjectID;

const Order = require('../../../models/order')
const Product = require('../../../models/product')
const User = require('../../../models/user')

/* 
    GET /api/order/
*/


exports.create = (req, res) => {
    // refuse if not an admin
    var productData=[] ;
    productData.push(Product.findById(req.body.product_id)._id);
    var userData = User.findById(req.body.user_id);
    var orderData = {
        user : userData._id,
        product : productData._id,
        amount : req.body.amount,
        status : req.body.status
    }
    Order.createOrder(orderData)
       .then((result) => {
           res.status(201).send({id: result._id});
       }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );

}


exports.getById = (req, res) => {
    Order.findById(req.params.id).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

exports.findById  = (req, res) => {
   
    Order.findById(req.params.id)
    .then(
        order => {
            res.status(200).send(result)
        }
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
};

exports.patchById = (req, res) => {
    var productData=[] ;
    productData.push(Product.findById(req.body.Product_id)._id);
    var userData = User.findById(req.body.Product_id);
    var orderData = {
        user : userData._id,
        product : productData._id,
        amount : req.body.amount,
        status : req.body.status
    }
    Order.patchOrder(req.params.id,orderData).then((result) => {
            res.status(204).send({});
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

 exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Order.list(limit, page).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

 exports.listbyUser = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    var userData = User.findById(req.params.id);
    Order.listByUser(userData,limit, page).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 }; 

 exports.removeById = (req, res) => {
    Order.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );
 };


