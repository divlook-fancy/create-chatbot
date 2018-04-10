'use stric'
/**
 * @author uihyeon<uihyeon.cha@gmail.com>
 */
class StandardWeight {
  /**
   * 표준몸무게
   * @param {number} cm 키
   * @param {number} kg 몸무게
   * @param {'m' | 'f'} gender 성별
   */
  constructor(cm, kg, gender) {
    this.height = cm
    this.weight = kg
    this.gender = gender
    this.standardWeight = null
    this.BMI = null
    this.obesity = null
    this.message = null

    this.obesityTable = [
      {
        text: '저체중',
        min: 0,
        max: 18.4,
      },
      {
        text: '정상체중',
        min: 18.5,
        max: 22.9,
      },
      {
        text: '과체중',
        min: 23,
        max: 24.9,
      },
      {
        text: '비만 (하)',
        min: 25,
        max: 29.9,
      },
      {
        text: '비만 (중)',
        min: 30,
        max: 39.9,
      },
      {
        text: '비만 (상)',
        min: 40,
        max: 999999,
      },
    ]

    if (Boolean(cm) && Boolean(kg) && Boolean(gender)) this.getStandard()
  }

  /**
   * @param {number} height cm
   */
  getHeight(height) {
    this.height = height
  }
  /**
   * @param {number} weight kg
   */
  getWeight(weight) {
    this.weight = weight
  }
  /**
   * @param {'m' | 'f'} gender m: 남자, f: 여자
   */
  getGender(gender) {
    this.gender = gender
  }
  getStandard() {
    let m = this.height / 100
    let bmi = this.gender === 'm' ? 22 : 21
    this.standardWeight = m * m * bmi
    this.BMI = this.weight / (m * m)
    for (let i = 0, len = this.obesityTable.length; i < len; i++) {
      let { text, min, max } = this.obesityTable[i]
      if (min <= this.BMI && this.BMI <= max) {
        this.obesity = text
        break
      }
    }
    this.message = `키 : ${this.height}
몸무게 : ${this.weight}
성별 : ${this.gender}
표준체중 : ${this.standardWeight}
BMI : ${this.BMI}
비만도 : ${this.obesity}`
  }
}

// new StandardWeight()

const chatStart = ({ req, res, next }, { param, result }) => {
  let eventCheck = /^standardWeight/.test(req.app.get('event'))
  let contentCheck = /체중|몸무게|비만/.test(param.content)

  if (!eventCheck && contentCheck) {
    return chatQuestion({ req, res, next }, { param, result })
  } else if (eventCheck) {
    let eventClass = req.app.get('eventClass')
    if (param.content === '안해') {
      req.app.set('event', null)
      req.app.set('eventClass', null)
      result.message.text = 'ㅇㅅㅇ'
      return { req, result }
    } else if (/^standardWeight$/.test(req.app.get('event'))) {
      return chatGetHeight({ req, res, next }, { param, result, eventClass })
    } else if (/^standardWeight1$/.test(req.app.get('event'))) {
      return chatGetWeight({ req, res, next }, { param, result, eventClass })
    } else if (/^standardWeight2$/.test(req.app.get('event'))) {
      return chatGetGender({ req, res, next }, { param, result, eventClass })
    } else if (/^standardWeight3$/.test(req.app.get('event'))) {
      return chatGetResult({ req, res, next }, { param, result, eventClass })
    }
  }
  return false
}

const chatQuestion = ({ req, res, next }, { param, result }) => {
  req.app.set('event', 'standardWeight')
  req.app.set('eventClass', new StandardWeight())
  result.message.text = '표준몸무게 알아볼까?'
  result.keyboard.type = 'buttons'
  result.keyboard.buttons = ['좋아', '아니']
  return { req, result }
}

const chatGetHeight = ({ req, res, next }, { param, result, eventClass }) => {
  switch (param.content) {
    case '좋아':
      req.app.set('event', 'standardWeight1')
      result.message.text = `키를 입력해줘 (cm)\n그만하고 싶으면 '안해'라고 입력해줘`
      break
    default:
      req.app.set('event', null)
      req.app.set('eventClass', null)
      result.message.text = '구래!!!!'
      break
  }
  return { req, result }
}

const chatGetWeight = ({ req, res, next }, { param, result, eventClass }) => {
  if (isNaN(parseInt(param.content))) {
    result.message.text = chatIsNaN({ param, result })
  } else {
    eventClass.getHeight(param.content)
    req.app.set('event', 'standardWeight2')
    result.message.text = `몸무게를 입력해줘 (kg)\n그만하고 싶으면 '안해'라고 입력해줘`
  }
  return { req, result }
}

const chatGetGender = ({ req, res, next }, { param, result, eventClass }) => {
  if (isNaN(parseInt(param.content))) {
    result.message.text = chatIsNaN({ param, result })
  } else {
    eventClass.getWeight(param.content)
    req.app.set('event', 'standardWeight3')
    result.message.text = `성별을 입력해줘\n한번만 더 하면 돼. 그냥 하자 ^^`
    result.keyboard.type = 'buttons'
    result.keyboard.buttons = ['남자', '여자']
  }
  return { req, result }
}

const chatGetResult = ({ req, res, next }, { param, result, eventClass }) => {
  let gender = 'm'
  switch (param.content) {
    case '여자':
      gender = 'f'
      break
    default:
      gender = 'm'
      break
  }
  eventClass.getGender(gender)
  eventClass.getStandard()
  req.app.set('event', null)
  req.app.set('eventClass', null)
  result.message.text = eventClass.message
  return { req, result }
}

const chatIsNaN = ({ param, result}) => {
  let randomText = [
    `숫자를 입력해 달라구!!`,
    '숫자가 아니잖아!!',
    '숫자를 입력해줘',
    '숫자숫자..숫자숫자숫자..숫자..숫자숫자...',
  ]
  let randomIndex = Math.floor(Math.random() * 10) % randomText.length
  return randomText[randomIndex]
}

module.exports = chatStart
