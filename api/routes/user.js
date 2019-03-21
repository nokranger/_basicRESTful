const express = require('express')
const route = express.Router()

const UserController = require('../controllers/user')

const checkAuth = require('../middleware/check-auth')

route.get('/alluser',UserController.user_get_alluser)
route.post('/signup', UserController.user_signup)
route.post('/login',UserController.user_login)
route.delete('/:userId',checkAuth,UserController.user_delete_user)
module.exports = route
