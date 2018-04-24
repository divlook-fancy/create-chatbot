const express = require('express')
const router = express.Router()

router.use('/', require('./api/chat').router)

module.exports = router
