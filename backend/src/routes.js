const express = require('express')
const multer = require('multer')

const uploadConfig = require('./config/upload')
const userController = require('./controller/userController')
const productController = require('./controller/productController')
const loginController = require('./controller/loginController')

const routes = express.Router()
const upload = multer(uploadConfig)


routes.get('/users', userController.index)
routes.post('/users', userController.create)


routes.get('/products', productController.index)
routes.post('/products', upload.single('image'),productController.create)
routes.delete('/products/:product_id', productController.delete)

routes.post('/users/:name', loginController.login)

module.exports = routes;