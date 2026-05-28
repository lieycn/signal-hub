import type { Platform } from "@/api/types/platform.ts"

export interface Account {
	id: number
	platform: Platform
	name: string
	avatar: string
	config: PlatformConfig
	is_active: boolean
	last_sync_at: string
	created_at: string
	updated_at: string
}

export interface PlatformConfig {
	v2ex: V2exConfig
}

export interface V2exConfig {
	personal_access_token: string
}
