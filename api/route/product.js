const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads')
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }

}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

const Product = require('../models/product')

route.get('/',function(req,res,next){
    // res.status(200).json({
    //     message : 'Handling get request to /product'
    // })
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        let response = {
            count : docs.length,
            products : docs.map(doc => {
                return {
                    name : doc.name,
                    price : doc.price,
                    productImage : doc.productImage,
                    _id : doc._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:8081/product/' + doc._id
                    }
                }
            })
        }
        console.log(docs)
        // if(docs.length >= 0){
            res.status(200).json(response)
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
route.post('/',upload.single('productImage'),function(req,res,next){
    // let product = {
    //     name : req.body.name,
    //     price : req.body.price
    // }
    // console.log(req.file)
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    })
    product
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : 'Create Product successfully',
            createProduct : {
                name : result.name,
                price : result.price,
                _id : result._id,
                request : {
                    type : 'GET',
                    url : 'http://localhost:8081/product/' + result._id
                }
            }
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
    .select('name price _id productImage')
    .exec()
    .then(doc =>{
        console.log("From Data base",doc)
        if(doc){
        res.status(200).json({
            product : doc,
            request : {
                type : 'GET',
                url : 'http://localhost:8081/product/'
            }
        })
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
        res.status(200).json({
            message : 'Product update',
            request : {
                type : 'GET',
                url : 'http://localhost:8081/product/' + result._id
            }
        })
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
    res.status(200).json({
        message : 'Product deleted',
        request : {
            type : 'POST',
            url : 'http://localhost:8081/product/',
            body : {
                name : 'String',
                price : 'Number'
            }
        }
    })
})
.catch(err => {
    console.log(err)
    res.status(500).json({
        error : err
    })
})
})
module.exports = route
