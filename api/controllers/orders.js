const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req,res,next) => {
    Order.find()
    .select('_id product quantity')
    .populate('product','name')
    .exec()
    .then(doc => {
        let response = {
            count : doc.length,
            orders : doc.map(docs => {
                return {
                    quantity : docs.quantity,
                    product : docs.product,
                    _id : docs._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:8081/orders/' + docs._id
                    }
                }
            })
        }
        res.status(200).json(response)
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
}

exports.orders_create_orders = function(req,res,next){
    // let order = {
    //     productId : req.body.productId,
    //     quantity : req.body.quantity
    // }
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message : 'Product not found'
            })
        }
        let order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        })
        return order
        .save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : 'Orders Store',
            createOrders : {
                _id : result._id,
                product : result.product,
                quantity : result.quantity
            },
            request : {
                type : 'GET',
                url : 'http://localhost:8081/orders/' + result._id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
}

exports.orders_get_orders = function(req,res,next){
    // res.status(200).json({
    //     message : 'Order were fetched',
    //     orderId : req.params.orderId
    // })    
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message : 'Orders not found'
            })
        }
        res.status(200).json({
            order : order,
            request : {
                type : 'GET',
                url : 'http://localhost:8081/orders'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
}

exports.orders_delete_orders = function(req,res,next){
    // res.status(200).json({
    //     message : 'Order were deleted',
    //     orderId : req.params.orderId
    // })
    Order.deleteOne({_id : req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : 'Order Deleted',
            request : {
                type : 'POST',
                url : 'http://localhost:8081/orders',
                body : {
                    productId : 'ID',
                    quantity : 'Number'
                }
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message : "Orders can't deleted",
            error : err
        })
    })
}