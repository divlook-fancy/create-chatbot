/***
 * KakaoTalk Chatbot
 * @author uihyeon<uihyeon.cha@gmail.com>
 * @link https://github.com/plusfriend/auto_reply
 */

const express = require('express')
const router = express.Router()

router.post('/message', async (req, res, next) => {
  let textCheck = () => {
    if (result.message.text) result.message.text += '\n'
    else result.message.text = ''
  }

  /**
   * @type {TypeResponse}
   */
  let result = {
    message: {},
  }

  /**
   * @type {TypeParam}
   */
  let param = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content,
  }

  console.log('user_key', param.user_key)
  console.log('type', param.type)
  console.log('content', param.content)

  if (param.type === 'photo') {
    res.json({
      message: {
        text: '이미지는 보내지마',
      },
    })
    return
  }

  if (/안녕/.test(param.content)) {
    result.message.text = '응 안녕!'
  }

  if (/할 줄 아는게 뭐야\?/.test(param.content)) {
    textCheck()
    result.message.text += '아직 없어'
  }

  if (!result.message.text) {
    let randomText = ['안뇽', '아직 개발 중이야.', '아직 할 줄 아는게 없어', '조금만 기다려줘!\n빨리 성장할게']
    let randomIndex = Math.floor(Math.random() * 10) % randomText.length
    res.json({
      message: {
        text: randomText[randomIndex],
      },
    })
    return
  }

  res.json(result)
})

router.get('/keyboard', async (req, res, next) => {
  /**
   * @type {TypeKeyboard}
   */
  let result = {
    type: 'buttons',
    buttons: ['안녕', '할 줄 아는게 뭐야?'],
  }
  res.json(result)
})

module.exports = router

/**
 * @typedef {object} TypeParam
 * @property { string } user_key 메시지를 발송한 유저 식별 키
 * @property { 'text' | 'photo' } type text, photo
 * @property { string } content 자동응답 명령어의 메시지 텍스트 혹은 미디어 파일 uri
 */

/**
 * @typedef {object} TypeKeyboard
 * @property {'buttons' | 'text'} type buttons: 객관식 응답의 목록을 구성할 수 있음, text: 주관식 응답을 입력받을 수 있음
 * @property { string[] } [buttons] 객관식 응답 내용의 목록 (최대 100개)
 */

/**
 * @typedef {object} TypePhoto
 * @property {string} url 이미지 url
 * @property {number} width 이미지 width
 * @property {number} height 이미지 height
 */

/**
 * @typedef {object} TypeMessageButton
 * @property {string} label 링크버튼의 타이틀
 * @property {string} url 링크버튼의 연결 링크 주소
 */

/**
 * @typedef {object} TypeMessage
 * @property {string} [text] 사용자에게 발송될 메시지 텍스트(최대 1000자)
 * @property {TypePhoto} [photo] 말풍선에 들어갈 이미지 정보. 1장 제한, JPEG/PNG 포맷
 * @property {TypeMessageButton} [message_button] 말풍선에 붙는 링크버튼 정보
 */

/**
 * @typedef {object} TypeResponse
 * @property {TypeMessage} message 3가지 타입 중 1개 이상이 반드시 들어가야 하며, 최대 3가지 타입 모두 포함될 수 있음
 * @property {TypeKeyboard} [keyboard]
 */
