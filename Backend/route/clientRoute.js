const express = require('express')
const router = express.Router()
const clientController = require('../controller/clientController')
const uploads = require('../multerConfig.js')

router.post('/clientData',uploads.single('image'), clientController.clientSaveData)
router.post('/loginclientData', clientController.loginclientData)

router.get('/createClient/:username', clientController.createClient)

router.get('/getClient/:username', clientController.getClient)

router.get('/profile', clientController.profile)


module.exports = router