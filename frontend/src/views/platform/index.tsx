import { createFileRoute } from "@tanstack/solid-router"
import { useForm, useRequest } from "alova/client"
import { createSignal, For } from "solid-js"

import { alova } from "@/api"
import type { Account } from "@/api/types/account.ts"
import { Button, Modal, Switch } from "@/components/widgets"
import { duration } from "@/libs/dayjs.ts"
import { PlatformForm } from "@/views/platform/components/form.tsx"

export const Route = createFileRoute("/platform/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { data: accounts, send: refresh } = useRequest(alova.Get<Account[]>("/accounts/_batch"), {
		initialData: [],
	})

	const getPlatformIcon = (platform: string) => {
		switch (platform) {
			case "v2ex":
				return <IconSimpleIconsV2ex />
			case "tiktok":
				return <IconLogosTelegram />
			case "facebook":
				return <IconLogosFacebook />
			case "wechat":
				return <IconIonLogoWechat class={"text-green-600"} />
			case "dingtalk":
				return <IconAntDesignDingtalkCircleFilled class={"text-blue-500"} />
			default:
				return <IconLogosTelegram />
		}
	}

	const getPlatformLabel = (platform: string) => {
		switch (platform) {
			case "tiktok":
				return "TikTok Global"
			case "facebook":
				return "Facebook Business"
			case "wechat":
				return "微信公众平台"
			case "dingtalk":
				return "钉钉"
			default:
				return platform
		}
	}

	const formatLastSync = (timestamp?: string) => {
		if (!timestamp) return "未同步"
		return duration(timestamp, true)
	}

	const { send: sync, loading: syncing } = useForm((form) => alova.Post("/sync", form))

	const [open, setOpen] = createSignal(false)

	return (
		<div class={"flex flex-col"}>
			<header class="px-8 py-12 flex justify-between items-center">
				<div>
					<h1 class={"text-2xl font-bold mb-1"}>平台集成</h1>
					<p class={"text-sm text-secondary"}>连接并管理您的社交媒体与即时通讯账号</p>
				</div>

				<button
					class={"btn btn-primary btn-large"}
					onClick={() => {
						setOpen(true)
					}}
				>
					<IconLucidePlus />
					添加新平台
				</button>
			</header>

			<Modal
				open={open()}
				title={"添加新平台集成"}
				size={"lg"}
				onClose={() => setOpen(false)}
			>
				<PlatformForm
					onClose={() => {
						setOpen(false)
						refresh()
					}}
				/>
			</Modal>

			<div class="px-12 pb-12 min-w-4xl max-w-5xl w-full mx-auto">
				<div class="bg-white border border-black/10 rounded-3xl p-6 mb-8 w-full">
					<div class="flex flex-col gap-4">
						<For each={accounts()}>
							{(account) => (
								<div class="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl transition-all">
									<div class="flex items-center gap-4">
										<div class="size-11 inline-flex items-center justify-center text-5xl">
											{getPlatformIcon(account.platform)}
										</div>
										<div class="platform-details">
											<h4 class={"text-base font-semibold mb-0.5"}>
												{getPlatformLabel(account.platform)}
											</h4>
											<p class={"text-xs text-secondary"}>
												已连接账号: {account.name}
											</p>
										</div>
									</div>
									<div class="flex items-center gap-6">
										<span class="text-xs py-0.5 px-2 bg-slate-100 rounded text-secondary">
											最后同步: {formatLastSync(account.last_sync_at)}
										</span>
										<div class="flex items-center gap-1.5 text-xs">
											<div class="bg-green-500 size-2 rounded-full"></div>
											已连接
										</div>

										<Switch />
									</div>
								</div>
							)}
						</For>
					</div>
				</div>

				<div class={"bg-zinc-50 rounded-2xl p-5 flex items-center gap-4"}>
					<div
						class={
							"size-10 rounded-full bg-white flex items-center justify-center text-secondary"
						}
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="16" x2="12" y2="12"></line>
							<line x1="12" y1="8" x2="12.01" y2="8"></line>
						</svg>
					</div>

					<div class={"flex-1"}>
						<p class={"text-sm font-semibold mb-0.5"}>同步频率设置</p>
						<p class={"text-xs text-secondary"}>
							当前设置为每 5 分钟自动抓取一次全平台新消息。
						</p>
					</div>

					<Button variant={"outline"} onClick={sync} loading={syncing()}>
						立即全局刷新
					</Button>
				</div>
			</div>
		</div>
	)
}
