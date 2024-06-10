const express = require('express')
const router = express.Router()
const clientController = require('../controller/clientController')
const uploads = require('../multerConfig.js')

router.post('/clientData',uploads.single('image'), clientController.clientSaveData)
router.post('/loginclientData', clientController.loginclientData)
router.get('/createCleint/:username', clientController.createClient)

router.get('/getClient/:username', clientController.getClient)

module.exports = router