const http = require('http');
const express = require('express')
// const app = express()
const app = require('./app.js');

// const port = process.env.PORT || 8081;

// const server = http.createServer(app);

// server.listen(port,function(err,data){
//     console.log('Server run port : ' + port)
// })

// app.use((req,res,next) => {
//     res.status(200).json({
//       message : "It works!"  
//     })
// })