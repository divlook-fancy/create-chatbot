const sinon = require('sinon')
const should = require('should')
const { chatStart, StandardWeight } = require('../controllers/StandardWeight')
const { data, hasResult, resultIsFalse } = require('./lib')

describe('Controllers', () => {
  describe('StandardWeight', () => {
    let newClass = new StandardWeight()
    describe('Class review', () => {
      before('Init', () => {
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
  })
})
