const assert = require('assert')
const { chatStart } = require('../controllers/Help')
const { defaultData, hasResult, resultIsFalse } = require('./lib')

describe('Controllers', () => {
  describe('Help', () => {
    describe('function chatStart', () => {
      let result = chatStart({}, defaultData)
      it('result 검사', () => {
        hasResult(result)
      })
      it('키워드가 포함되어 있을 때', () => {
        let arr = [
          '할줄아는게뭐냐',
          '할줄아는게뭐야',
          '할줄아는게뭐니',
          '할줄아는게뭐여',
          '할줄아는게뭐지',
          '할줄아는게뭐있냐',
          '할줄아는게뭐있나',
          '할줄아는게뭐있니',
          '할줄아는게뭐있어',
          '할줄아는게뭐있엉',
          '심심',
          '심심해',
          '놀아줘',
          '뭐할까',
          '도움말',
          '?',
          '??',
          'help',
          'Help',
          'HELP',
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
