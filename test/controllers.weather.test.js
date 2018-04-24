const assert = require('assert')
const { chatStart } = require('../controllers/Weather')
const { data, hasResult } = require('./lib')

describe('Controllers', () => {
  describe('Weather', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, data)
      it('result 검사', () => {
        hasResult(result)
      })
      describe('# 날씨가 있을 때', () => {
        it('날씨', () => {
          data.param.content = '날씨'
          let result = chatStart({}, data)
          assert.notEqual(result, false)
        })
        it('오늘 날씨 어때?', () => {
          data.param.content = '오늘 날씨 어때?'
          let result = chatStart({}, data)
          assert.notEqual(result, false)
        })
      })
      describe('# 날씨가 없을 때', () => {
        it('오늘 어때?', () => {
          data.param.content = '오늘 어때?'
          let result = chatStart({}, data)
          assert.equal(result, false)
        })
      })
    })
  })
})
