const assert = require('assert')

exports.data = {
  param: {
    content: '',
  },
  result: {
    message: {
      text: '',
    },
  },
}

exports.serverData = {
  req: {
    body: {},
    params: {},
    query: {},
    app: {
      get: () => null,
      set: () => null,
    },
  },
  res: {
    send: () => null,
    json: () => {},
  },
  next: () => true,
}

exports.hasResult = (result, isExist = false) => {
  assert.ok(
    typeof result === 'object' || result === false,
    'object 또는 false 반환한다.'
  )
  if (result || isExist) {
    assert.ok('message' in result, 'message가 존재한다.')
    assert.ok('text' in result.message, 'text가 존재한다.')
    assert.ok(typeof result.message.text === 'string', 'text는 string')
    if ('keyboard' in result) {
      assert.ok(typeof result.keyboard === 'object', 'keyboard는 object')
      if ('type' in result.keyboard) {
        assert.ok(typeof result.keyboard.type === 'string', 'type은 string')
        assert.ok(
          result.keyboard.type === 'buttons' || result.keyboard.type === 'text',
          'type은 buttons | text'
        )
        if (result.keyboard.type === 'buttons') {
          assert.ok(Array.isArray(result.keyboard.buttons), 'buttons는 array')
          assert.ok(
            result.keyboard.buttons.length > 0,
            'buttons는 비어있지 않는다.'
          )
          result.keyboard.buttons.map(btn => {
            assert.ok(typeof btn === 'string', 'button은 string')
          })
        }
      }
    }
  }
}

exports.resultIsFalse = ({ content, data = this.data, fn, isTrue = false }) => {
  let result,
    arr = []
  if (Array.isArray(content)) {
    arr.concat(content)
  } else {
    arr.push(content)
  }
  arr.map(keyword => {
    data.param.content = keyword
    result = fn({}, data)
    this.hasResult(result, isTrue)
    if (isTrue) assert.notEqual(result, false, keyword)
    else assert.equal(result, false, keyword)
  })
}
