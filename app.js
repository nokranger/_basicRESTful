const express = require('express');
const app = express();
const morgan = require('morgan')

const productRoute = require('./api/route/product')
const ordersRoute = require('./api/route/orders')

// app.use((req,res,next) => {
//     res.status(200).json({
//         message : 'It works!'
//     });
// });

app.use(morgan('dev'))

app.use('/product',productRoute)
app.use('/orders',ordersRoute)

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(400)
})
app.use((err,req,res,next) => {
    res.status(err.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})
const server = app.listen(8081,function(req,res,next){
    const host = server.address().address
    const port = server.address().port
    console.log("Server run port : " + port)
})
module.export = app;