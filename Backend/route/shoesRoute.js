const express = require('express')
const uploads = require('../multerConfig.js')
const router = express.Router()
const shoesController = require('../controller/shoesController.js')

router.post('/saveData', uploads.single('shoesImage'), shoesController.saveData)

router.get('/getData', shoesController.getData)

router.get('/getDataByBrand/:inp', shoesController.getDataByBrand)

router.get('/getDataById/:id', shoesController.getDataById)

router.delete('/deleteData/:id', shoesController.deleteData)

router.put('/updateData/:id', shoesController.updateData)

module.exports = router