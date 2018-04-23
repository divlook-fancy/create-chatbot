/**
 * 도움말
 */
const chatStart = ({ req, res, next }, { param, result }) => {
  if (
    /할?.?줄?.?아는게.?[뭐{냐|야|니|여|지}|있{냐|나|니|어|엉}]\??|심심.?해|놀아줘|뭐할까|^도움말$|^[\?]{1,}$|help/i.test(
      param.content
    )
  ) {
    result.message.text = '원하는 버튼을 선택해줘'
    result.keyboard = {
      type: 'buttons',
      buttons: ['표준몸무게'],
    }
    return result
  }
  return false
}

module.exports = chatStart
