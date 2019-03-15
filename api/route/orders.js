const express = require('express')
const route = express.Router()

route.get('/',function(req,res,next){
    res.status(200).json({
        message : 'Order were fetched'
    })    
})
route.post('/',function(req,res,next){
    res.status(200).json({
        message : 'Order were created'
    })    
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
