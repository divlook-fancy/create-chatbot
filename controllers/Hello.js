/**
 * 안녕
 */
const chatStart = ({ req, res, next }, { param, result }) => {
  if (/안녕/.test(param.content)) {
    let randomText = [
      '안녕안녕안녕',
      '응 안녕!',
      '하잇!!!',
      '반가워^^',
    ]
    let randomIndex = Math.floor(Math.random() * 10) % randomText.length
    result.message.text = randomText[randomIndex]
    return result
  }
  return false
}

module.exports = chatStart
