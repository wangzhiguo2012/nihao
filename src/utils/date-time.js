
import dayjs from 'dayjs'
import rTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(rTime)
dayjs.locale('zh-cn')

export const formateTime = function (val) {
  return dayjs().format('DD/MM/YYYY')
}

export const relativeTime = function (yourTime) {
  return dayjs().to(dayjs(yourTime))
}
