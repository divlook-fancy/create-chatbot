const assert = require('assert')
const { chatStart } = require('../controllers/Default')
const { data, hasResult } = require('./lib')

describe('Controllers', () => {
  describe('Default', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, data)
      it('result 검사', () => {
        hasResult(result, true)
      })
    })
  })
})
