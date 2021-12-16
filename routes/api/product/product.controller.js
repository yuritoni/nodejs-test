
const Product = require('../../../models/product')

/* 
    GET /api/user/list
*/


exports.create = (req, res) => {
    // refuse if not an admin
    Product.createProduct(req.body)
       .then((result) => {
           res.status(201).send({id: result._id});
       }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );

}


exports.getById = (req, res) => {
    Product.findById(req.params.id).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

exports.findById  = (req, res) => {
    // refuse if not an admin

    Product.findById(req.params.id)
    .then(
        product => {
            res.status(200).json(result)
        }
    ).catch(
        (err) => { res.status(404).json({message: err.message})}
    )
};

exports.patchById = (req, res) => {
   
    Product.patchProduct(req.params.id, req.body).then((result) => {
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
    Product.list(limit, page).then((result) => {
        res.status(200).json(result);
    }).catch(
        (err) => { res.status(404).json({message: err.message})}
    );
 };

 exports.removeById = (req, res) => {
    Product.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        }).catch(
            (err) => { res.status(404).json({message: err.message})}
        );
 };