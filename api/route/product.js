const express = require('express')
const route = express.Router()

route.get('/',function(req,res,next){
    res.status(200).json({
        message : 'Handling get request to /product'
    })
})
route.post('/',function(req,res,next){
    let product = {
        name : req.body.name,
        price : req.body.price
    }
    res.status(200).json({
        message : 'Handling post request to /product',
        createProduct : product
    })
    console.log(product)
})
route.get('/:productId',function(req,res,next){
    const id = req.params.productId
    if(id === 'special'){
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        })
    }else{
        res.status(200).json({
            message : 'You passed an ID'
        })
    }
})
route.patch('/:productId',function(req,res,next){
    res.status(200).json({
        message : 'Update product'
    })
})
route.delete('/:productId',function(req,res,next){
    res.status(200).json({
        message : 'Delete product'
    })
})
module.exports = route
