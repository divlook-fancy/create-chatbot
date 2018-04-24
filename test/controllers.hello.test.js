const assert = require('assert')
const { chatStart } = require('../controllers/Hello')
const { data, hasResult, resultIsFalse } = require('./lib')

describe('Controllers', () => {
  describe('Hello', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, data)
      it('result 검사', () => {
        hasResult(result)
      })
      it('키워드가 포함되어 있을 때', () => {
        let arr = [
          '안녕',
          '안뇽',
          'hi',
          'Hi',
          'hI',
          'HI',
          '안녕하세요',
          '반가워',
          '반가워요',
        ]
        resultIsFalse({
          content: arr,
          fn: chatStart,
          isTrue: true,
        })
      })
      it('키워드가 없을 때', () => {
        let arr = ['테스트', '인사말이 없을 때', '아무말']
        resultIsFalse({
          content: arr,
          fn: chatStart,
        })
      })
    })
  })
})
