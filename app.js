const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoute = require('./api/routes/product')
const ordersRoute = require('./api/routes/orders')
const userRoute = require('./api/routes/user')


//this setting connect mongoDB
// mongoose.connect('mongodb://nokranger:'+ 
// process.env.MONGO_ATLAS_PW +
// '@node-rest-shard-00-00-jyl94.mongodb.net:27017,node-rest-shard-00-01-jyl94.mongodb.net:27017,node-rest-shard-00-02-jyl94.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shard-0&authSource=admin&retryWrites=true',
// {
//     useMongoClient: true
// }
// )
//This setting connect DB
mongoose.connect('mongodb+srv://nokranger:'+ 
process.env.MONGO_ATLAS_PW+
'@node-rest-jyl94.mongodb.net/test?retryWrites=true',{
    useNewUrlParser: true
})
mongoose.Promise = global.Promise

// app.use((req,res,next) => {
//     res.status(200).json({
//         message : 'It works!'
//     });
// });

app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use((req,res,next) =>{
    // const error = new Error("Not found")
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/product',productRoute)
app.use('/orders',ordersRoute)
app.use('/users',userRoute)

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(400)
})
app.use((err,req,res,next) => {
    res.status(err.status || 500)
    res.json({
        err : {
            message : err.message
        }
    })
})
const server = app.listen(8081,function(req,res,next){
    const host = server.address().address
    const port = server.address().port
    console.log("Server run port : " + port)
})
module.export = app;