const express = require('express')
const uploads = require('../multerConfig.js')
const router = express.Router()
const cartController = require('../controller/cartController.js')

router.post('/saveCart/:username',uploads.single('productImages'), cartController.cartData)

router.get('/getCart/:username', cartController.getCart)

router.delete('/deleteCart/:id/:username', cartController.deleteCart)

module.exports = router
