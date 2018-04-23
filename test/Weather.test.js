const assert = require('assert')
const WeatherController = require('../controllers/Weather')
const { data } = require('./lib')

describe('Controllers', () => {
  describe('Weather.js', () => {
    describe('function chatStart', () => {
      describe('# 날씨가 있을 때', () => {
        it('날씨', () => {
          data.param.content = '날씨'
          let result = WeatherController({}, data)
          assert.notEqual(result, false)
        })
        it('오늘 날씨 어때?', () => {
          data.param.content = '오늘 날씨 어때?'
          let result = WeatherController({}, data)
          assert.notEqual(result, false)
        })
      })
      describe('# 날씨가 없을 때', () => {
        it('오늘 어때?', () => {
          data.param.content = '오늘 어때?'
          let result = WeatherController({}, data)
          assert.equal(result, false)
        })
      })
    })
  })
})
