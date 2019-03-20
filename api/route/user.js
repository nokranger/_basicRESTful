const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

route.post('/signup', (req, res, next) => {
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message : 'Mail exists'
            })
        }else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    let user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                        console.log(result)
                        res.status(201).json({
                            message : 'User Created',
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error : err
                        })
                    })
                }
            })
        }
    })
})

// route.delete('/:userId',(res,res,next) => {
//     User.deleteOne({_id : req.params._id})
//     .exec()
//     .then(res => {
//         res.status(200).json({
//             message : 'User deleted'
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({
//             error : err
//         })
//     })
// })
route.delete('/:userId',(req, res, next) => {
    User.deleteOne({_id : req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message : 'User deleted'
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
