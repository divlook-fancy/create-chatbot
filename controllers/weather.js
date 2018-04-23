'use stric'
/**
 * @author uihyeon<uihyeon.cha@gmail.com>
 * @description
 * - API 참고 : http://api.wunderground.com/api/{{Api-Key}}/{{Forecast}}/q/{{Query}}.json
 * - example : http://api.wunderground.com/api/{{Api-Key}}/forecast/q/ko/jeonju.json
 * - example : http://api.wunderground.com/api/{{Api-Key}}/forecast/q/autoip.json
 * @see https://www.wunderground.com/weather/api
 * @see Query https://www.wunderground.com/weather/api/d/docs?d=data/index
 * @see CityName https://www.wunderground.com/global/KO.html
 */
class Weather {
  /**
   * 날씨
   */
  constructor() {

  }
}

/**
 * 날씨
 */
const chatStart = ({ req, res, next }, { param, result }) => {
  let reg = new RegExp(/weather|날씨/)
  if (reg.test(param.content)) {
    result.message.text = '날씨 기능은 아직 준비중이야...'
    return result
  }
  return false
}

module.exports = chatStart
