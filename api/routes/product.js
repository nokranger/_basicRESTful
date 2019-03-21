const express = require('express')
const route = express.Router()
const multer = require('multer')


const checkAuth = require('../middleware/check-auth')

const ProductController = require('../controllers/products')

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

route.get('/',ProductController.products_get_all)
route.post('/',checkAuth,upload.single('productImage'),ProductController.products_create_products)
route.get('/:productId',ProductController.products_get_product)
route.patch('/:productId',checkAuth,ProductController.product_update_products)
route.delete('/:productId',checkAuth,ProductController.product_delete_products)
module.exports = route
