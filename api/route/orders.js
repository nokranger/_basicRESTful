const express = require('express')
const route = express.Router()
// handle incoming get reques to orders
route.get('/',function(req,res,next){
    res.status(200).json({
        message : 'Order were fetched'
    })    
})
route.post('/',function(req,res,next){
    let order = {
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'Order were created',
        order : order
    })    
    console.log(order)
})
route.get('/:orderId',function(req,res,next){
    res.status(200).json({
        message : 'Order were fetched',
        orderId : req.params.orderId
    })    
})
route.delete('/:orderId',function(req,res,next){
    res.status(200).json({
        message : 'Order were deleted',
        orderId : req.params.orderId
    })    
})
module.exports = route
