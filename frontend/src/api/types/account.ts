export interface Account {
	id: number
	platform: "v2ex"
	name: string
	avatar: string
	config: PlatformConfig
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
