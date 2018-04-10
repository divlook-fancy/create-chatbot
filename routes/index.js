const express = require('express')
const router = express.Router()

router.use('/kakao', require('./api/kakao'))

module.exports = router
