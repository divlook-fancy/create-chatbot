const express = require('express')
const router = express.Router()

router.use('/', require('./api/kakao'))

module.exports = router
