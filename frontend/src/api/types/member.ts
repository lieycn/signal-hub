import type { Message } from "@/api/types/message.ts"
import type { Platform } from "@/api/types/platform.ts"

export interface Member {
	id: number
	account_id: number
	platform: Platform
	platform_member_id: string
	name: string
	avatar: string
	created_at: string
	updated_at: string
	latest_message?: Message
}
