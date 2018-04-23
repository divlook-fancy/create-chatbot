/**
 * 기본값
 */
const chatStart = ({ req, res, next }, { param, result }) => {
  let randomText = [
    '나는야 월루~~.\n너도 월루?!',
    '응???',
    '아직 할 줄 아는게 많이 없어',
    '곧 새로운 기능이 생길거야\n기대하라구!!',
  ]
  let randomIndex = Math.floor(Math.random() * 10) % randomText.length
  result.message.text = randomText[randomIndex]
  return result
}

module.exports = chatStart
