const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

route.get('/',function(req,res,next){
    // res.status(200).json({
    //     message : 'Handling get request to /product'
    // })
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs)
        // if(docs.length >= 0){
            res.status(200).json(docs)
        // }else{
        //     res.status(404).json({
        //         message : "No entries found"
        //     })
        // }
        res.status(200).json(docs)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
})
route.post('/',function(req,res,next){
    // let product = {
    //     name : req.body.name,
    //     price : req.body.price
    // }
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : 'Handling post request to /product',
            createProduct : result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })

    console.log(product)
})
route.get('/:productId',function(req,res,next){
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Data base",doc)
        if(doc){
        res.status(200).json(doc)
        }else{
            res.status(404).json({message : "No valid entry for productID"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error : err})
    })
})
route.patch('/:productId',function(req,res,next){
    // res.status(200).json({
    //     message : 'Update product'
    // })
    let id = req.params.productId
    let updateOps = {}
    for(let ops of req.body){
        updateOps[ops.proName] = ops.value
    }
    Product.update({_id : id}, {$set : updateOps})//{$set:{name : req.body.newName,price : req.body.newPrice}})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
})
route.delete('/:productId',function(req,res,next){
    let id = req.params.productId
Product.remove({_id : id})
.exec()
.then(result => {
    console.log("Delete product",result)
    res.status(200).json(result)
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        error : err
    })
})
})
module.exports = route
