//configure routes for payment API's here

//const paymentsEndpoint = '/payment';
//const paymentCollection = 'payment';
var ObjectID = require('mongodb').ObjectID;

const Payment = require('../../../models/payment')
const Order = require('../../../models/order')

/* 
    GET /api/user/list
*/


exports.create = (req, res) => {
  
	var orderData=[] ;
    var orderData.push(Order.findById(req.body.order_id)._id);
  var paymentData = {
      order : orderData,
      amount : req.body.amount,
      status : req.body.status
  }
    Payment.createPayment(paymentData)
       .then((result) => {
           res.status(201).json({id: result._id});
       }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );

}


exports.getById = (req, res) => {
    Payment.findById(req.params.id).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

exports.findById  = (req, res) => {
    // refuse if not an admin

    Payment.findById(req.params.id)
    .then(
        payment => {
            res.status(200).json(result)
        }
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
};

exports.patchById = (req, res) => {
	var orderData=[] ;
    var orderData.push(Order.findById(req.body.order_id)._id);
    var paymentData = {
        order : orderData,
        amount : req.body.amount,
        status : req.body.status
    }
    Payment.patchPayment(req.params.id,paymentData).then((result) => {
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
    Payment.list(limit, page).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

 exports.removeById = (req, res) => {
    Payment.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );
 };

