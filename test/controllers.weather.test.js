const assert = require('assert')
const { chatStart } = require('../controllers/Weather')
const { defaultData, hasResult } = require('./lib')

describe('Controllers', () => {
  describe('Weather', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, defaultData)
      it('result 검사', () => {
        hasResult(result)
      })
      describe('# 날씨가 있을 때', () => {
        it('날씨', () => {
          defaultData.param.content = '날씨'
          let result = chatStart({}, defaultData)
          assert.notEqual(result, false)
        })
        it('오늘 날씨 어때?', () => {
          defaultData.param.content = '오늘 날씨 어때?'
          let result = chatStart({}, defaultData)
          assert.notEqual(result, false)
        })
      })
      describe('# 날씨가 없을 때', () => {
        it('오늘 어때?', () => {
          defaultData.param.content = '오늘 어때?'
          let result = chatStart({}, defaultData)
          assert.equal(result, false)
        })
      })
    })
  })
})
