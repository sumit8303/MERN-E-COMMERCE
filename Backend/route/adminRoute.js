const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController.js')

router.post('/adminData', adminController.adminSaveData)
router.post('/loginData', adminController.loginSaveData)

module.exports = router