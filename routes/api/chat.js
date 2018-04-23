/***
 * KakaoTalk Chatbot
 * @author uihyeon<uihyeon.cha@gmail.com>
 * @link https://github.com/plusfriend/auto_reply
 */

const express = require('express')
const router = express.Router()
const controllers = [
  require('../../controllers/Help'),
  require('../../controllers/Hello'),
  require('../../controllers/StandardWeight'),
  require('../../controllers/Weather'),
  // Default는 항상 마지막
  require('../../controllers/Default'),
]
const { ChatLogsModel } = require('../../models/ChatLogs')

// Message 입력
router.post('/message', async (req, res, next) => {
  let exit = false

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

  console.log(`user: ${param.user_key}\ncontent: ${param.content}`)
  ChatLogsModel.insert({
    user_key: param.user_key,
    content: param.content,
  })

  if (param.type === 'photo') {
    res.json({
      message: {
        text: '이미지는 보내지마',
      },
    })
    return
  }

  for (let i = 0, len = controllers.length; i < len; i++) {
    let el = controllers[i]({ req, res, next }, { param, result })
    if (el !== false) {
      res.json(el)
      exit = true
      break
    }
  }

  if (exit) return
  res.send(404)
})

// 처음 진입시
router.get('/keyboard', async (req, res, next) => {
  /**
   * @type {TypeKeyboard}
   */
  let result = {
    type: 'text',
  }
  res.json(result)
})

// 친구 추가시
router.post('/friend', (req, res, next) => {
  let { user_key } = req.body
  console.log(`친구추가: ${param.user_key}`)
  res.json({
    code: 0,
    message: 'SUCCESS',
    comment: '정상 응답',
  })
})

// 친구 차단시
router.delete('/friend', (req, res, next) => {
  let { user_key } = req.body
  console.log(`친구차단: ${param.user_key}`)
  req.app.set(`event:${user_key}`, null)
  req.app.set(`eventClass:${user_key}`, null)
  res.json({
    code: 0,
    message: 'SUCCESS',
    comment: '정상 응답',
  })
})

// 채팅방 나갔을 때
router.delete('/chat_room/:user_key', (req, res, next) => {
  let { user_key } = req.params
  console.log(`채팅방 나감: ${param.user_key}`)
  req.app.set(`event:${user_key}`, null)
  req.app.set(`eventClass:${user_key}`, null)
  res.json({
    code: 0,
    message: 'SUCCESS',
    comment: '정상 응답',
  })
})

router.get('/log/:offset/:limit', async (req, res, next) => {
  let result = await ChatLogsModel.table({
    limit: Number(req.params.limit),
    offset: Number(req.params.offset),
  })
  res.json({
    code: 0,
    data: result,
    message: 'SUCCESS',
    comment: '정상 응답',
  })
})

router.delete('/log/reset', async (req, res, next) => {
  ChatLogsModel.reset()
  res.json({
    code: 0,
    message: 'SUCCESS',
    comment: '정상 응답',
  })
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
