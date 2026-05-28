import dayjs, { Dayjs } from "dayjs"

export function duration(time: string | Dayjs, withSuffix?: boolean) {
	if (!time) return undefined
	return dayjs.duration(dayjs(time).diff(dayjs(), "seconds"), "seconds").humanize(withSuffix)
}

export const normalizeDate = (value: any) => {
	if (!value) return undefined
	if (typeof value === "string") return value
	if (dayjs.isDayjs(value)) return value.toISOString()
	return value
}
