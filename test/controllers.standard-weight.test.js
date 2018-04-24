const sinon = require('sinon')
const should = require('should')
const {
  chatStart,
  StandardWeight
} = require('../controllers/StandardWeight')
const {
  data,
  serverData,
  hasResult,
  resultIsFalse
} = require('./lib')

describe('Controllers', () => {
  describe('StandardWeight', () => {
    let newClass = new StandardWeight()
    describe('Class review', () => {
      before(() => {
        newClass = new StandardWeight()
      })
      it('Property is exist', () => {
        newClass.should.have.ownProperty('height')
        newClass.should.have.ownProperty('weight')
        newClass.should.have.ownProperty('gender')
        newClass.should.have.ownProperty('standardWeight')
        newClass.should.have.ownProperty('BMI')
        newClass.should.have.ownProperty('obesity')
        newClass.should.have.ownProperty('message')
        newClass.should.have.ownProperty('obesityTable')
        should(newClass.height).is.Undefined()
        should(newClass.weight).is.Undefined()
        should(newClass.gender).is.Undefined()
        should(newClass.BMI).is.Null()
        should(newClass.obesity).is.Null()
        should(newClass.standardWeight).is.Null()
        should(newClass.message).is.Null()
      })
      it('Get height', () => {
        newClass.getHeight(180)
        should(newClass.height).is.Number()
      })
      it('Get weight', () => {
        newClass.getWeight(72)
        should(newClass.weight).is.Number()
      })
      it('Get gender', () => {
        newClass.getGender('m')
        should(newClass.gender).is.String()
      })
      it('Get standard', () => {
        newClass.getStandard()
        should(newClass.BMI).is.Number()
        should(newClass.obesity).is.String()
        should(newClass.standardWeight).is.Number()
        should(newClass.message).is.String()
      })
    })
    describe('function chatStart', () => {
      let event, eventClass = new StandardWeight()
      before(() => {
        sinon.stub(data, 'param').value({
          user_key: 'user_key',
          type: 'text',
          content: 'content',
        })
        sinon
          .stub(serverData.req.app, 'get')
          .callsFake(arg => {
            switch (arg) {
              case `event:${data.param.user_key}`:
                return event
                break
              case `eventClass:${data.param.user_key}`:
                return eventClass
                break
            }
          })
      })
      describe('# 키워드가 없을 때', () => {
        it('아무거나', () => {
          sinon.stub(data.param, 'content').value('아무거나')
          should(chatStart(serverData, data)).is.False()
        })
        it('날씨 어때?', () => {
          sinon.stub(data.param, 'content').value('날씨 어때?')
          should(chatStart(serverData, data)).is.False()
        })
      })
      describe('# 키워드가 있을 때', () => {
        before(() => {
          event = false
        })
        it('체중계', () => {
          sinon.stub(data.param, 'content').value('체중계')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('몸무게', () => {
          sinon.stub(data.param, 'content').value('몸무게')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('비만', () => {
          sinon.stub(data.param, 'content').value('비만')
          should(chatStart(serverData, data)).is.not.False()
        })
      })
      describe('# 첫번째 이벤트 : 표준몸무게 알아볼까?', () => {
        before(() => {
          event = 'standardWeight'
        })
        it('좋아', () => {
          sinon.stub(data.param, 'content').value('좋아')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('아니', () => {
          sinon.stub(data.param, 'content').value('아니')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('안해', () => {
          sinon.stub(data.param, 'content').value('안해')
          should(chatStart(serverData, data)).is.not.False()
        })
      })
      describe('# 두번째 이벤트 : 키를 입력해줘', () => {
        before(() => {
          event = 'standardWeight1'
        })
        it('안해', () => {
          sinon.stub(data.param, 'content').value('안해')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('숫자입력 = 180', () => {
          sinon.stub(data.param, 'content').value(180)
          should(chatStart(serverData, data)).is.not.False()
        })
        it('문자입력', () => {
          sinon.stub(data.param, 'content').value('백팔십')
          should(chatStart(serverData, data)).is.not.False()
        })
      })
      describe('# 두번째 이벤트 : 몸무게를 입력해줘', () => {
        before(() => {
          event = 'standardWeight2'
        })
        it('안해', () => {
          sinon.stub(data.param, 'content').value('안해')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('숫자입력 = 70', () => {
          sinon.stub(data.param, 'content').value(70)
          should(chatStart(serverData, data)).is.not.False()
        })
        it('문자입력', () => {
          sinon.stub(data.param, 'content').value('칠십')
          should(chatStart(serverData, data)).is.not.False()
        })
      })
      describe('# 세번째 이벤트 : 성별을 입력해줘', () => {
        before(() => {
          event = 'standardWeight3'
        })
        it('남자', () => {
          sinon.stub(data.param, 'content').value('남자')
          should(chatStart(serverData, data)).is.not.False()
        })
        it('여자', () => {
          sinon.stub(data.param, 'content').value('여자')
          should(chatStart(serverData, data)).is.not.False()
        })
      })
      describe('# 결과', () => {
        it('height', () => {
          should(eventClass.height).is.Number()
        })
        it('weight', () => {
          should(eventClass.weight).is.Number()
        })
        it('gender', () => {
          should(eventClass.gender).is.String()
        })
        it('BMI', () => {
          should(eventClass.BMI).is.Number()
        })
        it('obesity', () => {
          should(eventClass.obesity).is.String()
        })
        it('standardWeight', () => {
          should(eventClass.standardWeight).is.Number()
        })
        it('message', () => {
          should(eventClass.message).is.String()
        })
      })
    })
  })
})