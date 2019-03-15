const express = require('express');
const app = express();

const productRoute = require('./api/route/product')
const ordersRoute = require('./api/route/orders')

// app.use((req,res,next) => {
//     res.status(200).json({
//         message : 'It works!'
//     });
// });

app.use('/product',productRoute)
app.use('/orders',ordersRoute)

const server = app.listen(8081,function(req,res,next){
    const host = server.address().address
    const port = server.address().port
    console.log("Server run port : " + port)
})
module.export = app;