const assert = require('assert')
const { chatStart } = require('../controllers/Default')
const { defaultData, hasResult } = require('./lib')

describe('Controllers', () => {
  describe('Default', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, defaultData)
      it('result 검사', () => {
        hasResult(result, true)
      })
    })
  })
})
