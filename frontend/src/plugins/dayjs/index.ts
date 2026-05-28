import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh-cn"

dayjs.locale("zh-cn")
dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)
