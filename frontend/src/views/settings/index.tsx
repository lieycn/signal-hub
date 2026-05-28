import { createFileRoute } from "@tanstack/solid-router"

import { Switch } from "@/components/widgets"

export const Route = createFileRoute("/settings/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<main class="flex flex-col bg-linear-to-b from-white to-[#FDFDFD] overflow-y-auto">
			<header class="px-12 py-8">
				<div>
					<h1 class="text-2xl font-bold mb-1">通用设置</h1>
					<p class="text-sm text-secondary">配置系统通知、同步计划及团队安全偏好</p>
				</div>
			</header>

			<div class="px-12 pb-12 pt-0 min-w-4xl max-w-5xl mx-auto">
				{/*<div class="bg-white border border-[rgba(0,0,0,0.05)] rounded-3xl p-8 mb-6">*/}
				{/*	<h3 class="text-base font-bold mb-6 flex items-center gap-2.5">*/}
				{/*		<svg*/}
				{/*			width="18"*/}
				{/*			height="18"*/}
				{/*			viewBox="0 0 24 24"*/}
				{/*			fill="none"*/}
				{/*			stroke="currentColor"*/}
				{/*			stroke-width="2"*/}
				{/*		>*/}
				{/*			<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>*/}
				{/*			<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>*/}
				{/*		</svg>*/}
				{/*		通知偏好*/}
				{/*	</h3>*/}
				{/*	<div class="flex items-center justify-between py-4 border-b border-[rgba(0,0,0,0.03)]">*/}
				{/*		<div>*/}
				{/*			<h4 class="text-sm font-semibold mb-1">系统消息推送</h4>*/}
				{/*			<p class="text-xs text-secondary">在桌面端实时接收新消息通知</p>*/}
				{/*		</div>*/}

				{/*		<Switch />*/}
				{/*	</div>*/}
				{/*	<div class="flex items-center justify-between py-4">*/}
				{/*		<div>*/}
				{/*			<h4 class="text-sm font-semibold mb-1">邮件摘要</h4>*/}
				{/*			<p class="text-xs text-secondary">每日接收未读消息的汇总邮件</p>*/}
				{/*		</div>*/}

				{/*		<Switch />*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div class="bg-white border border-[rgba(0,0,0,0.05)] rounded-3xl p-8 mb-6">
					<h3 class="text-base font-bold mb-6 flex items-center gap-2.5">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M23 4v6h-6"></path>
							<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
						</svg>
						数据同步计划
					</h3>
					<div class="flex items-center justify-between py-4 border-b border-[rgba(0,0,0,0.03)]">
						<div>
							<h4 class="text-sm font-semibold mb-1">自动同步频率</h4>
							<p class="text-xs text-secondary">
								设置从已连接平台抓取新数据的间隔时间
							</p>
						</div>
						<div class="flex items-center gap-3">
							<select class="px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] text-xs font-family outline-none">
								<option>每 5 分钟</option>
								<option selected>每 15 分钟</option>
								<option>每 1 小时</option>
								<option>手动</option>
							</select>
						</div>
					</div>
					<div class="flex items-center justify-between py-4">
						<div>
							<h4 class="text-sm font-semibold mb-1">高峰时段增强同步</h4>
							<p class="text-xs text-secondary">
								在 09:00 - 18:00 期间将同步频率提升至最高
							</p>
						</div>

						<Switch />
					</div>
				</div>

				{/*<div class="bg-white border border-[rgba(0,0,0,0.05)] rounded-3xl p-8 mb-6">*/}
				{/*	<h3 class="text-base font-bold mb-6 flex items-center gap-2.5">*/}
				{/*		<svg*/}
				{/*			width="18"*/}
				{/*			height="18"*/}
				{/*			viewBox="0 0 24 24"*/}
				{/*			fill="none"*/}
				{/*			stroke="currentColor"*/}
				{/*			stroke-width="2"*/}
				{/*		>*/}
				{/*			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>*/}
				{/*			<circle cx="9" cy="7" r="4"></circle>*/}
				{/*			<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>*/}
				{/*			<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>*/}
				{/*		</svg>*/}
				{/*		团队成员与权限*/}
				{/*	</h3>*/}
				{/*	<div class="flex flex-col gap-3">*/}
				{/*		<div class="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-2xl">*/}
				{/*			<div class="flex items-center gap-3">*/}
				{/*				<div class="w-8 h-8 rounded-full bg-[#E3F2FD] text-[#1976D2] flex items-center justify-center text-xs font-semibold">*/}
				{/*					王*/}
				{/*				</div>*/}
				{/*				<div>*/}
				{/*					<h4 class="text-sm font-semibold">王小明 (你)</h4>*/}
				{/*					<p class="text-[11px] text-secondary">*/}
				{/*						管理员 · admin@example.com*/}
				{/*					</p>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<span class="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-[rgba(0,0,0,0.05)] text-secondary">*/}
				{/*				所有权限*/}
				{/*			</span>*/}
				{/*		</div>*/}
				{/*		<div class="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-2xl">*/}
				{/*			<div class="flex items-center gap-3">*/}
				{/*				<div class="w-8 h-8 rounded-full bg-[#F1F8E9] text-[#689F38] flex items-center justify-center text-xs font-semibold">*/}
				{/*					李*/}
				{/*				</div>*/}
				{/*				<div>*/}
				{/*					<h4 class="text-sm font-semibold">李丽莎</h4>*/}
				{/*					<p class="text-[11px] text-secondary">*/}
				{/*						运营专员 · lisa.l@example.com*/}
				{/*					</p>*/}
				{/*				</div>*/}
				{/*			</div>*/}
				{/*			<button class="px-4 py-2 rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-transparent text-xs font-semibold cursor-pointer">*/}
				{/*				编辑权限*/}
				{/*			</button>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*	<div class="mt-4 text-center">*/}
				{/*		<button class="px-4 py-2 rounded-[20px] border border-dashed border-[rgba(0,0,0,0.1)] bg-transparent text-xs font-semibold cursor-pointer w-full">*/}
				{/*			+ 邀请新成员*/}
				{/*		</button>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div class="bg-white border border-[rgba(0,0,0,0.05)] rounded-3xl p-8 mb-6">
					<h3 class="text-base font-bold mb-6 flex items-center gap-2.5">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
						</svg>
						安全与数据管理
					</h3>
					<div class="flex items-center justify-between py-4">
						<div>
							<h4 class="text-sm font-semibold mb-1">历史数据保留期限</h4>
							<p class="text-xs text-secondary">自动清理过期的平台交互数据</p>
						</div>
						<select class="px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] text-xs font-family outline-none">
							<option>30 天</option>
							<option selected>90 天</option>
							<option>1 年</option>
							<option>永久保留</option>
						</select>
					</div>
					{/*<div class="flex items-center justify-between py-4 border-b border-[rgba(0,0,0,0.03)]">*/}
					{/*	<div>*/}
					{/*		<h4 class="text-sm font-semibold mb-1">双重身份验证 (2FA)</h4>*/}
					{/*		<p class="text-xs text-secondary">在登录时增加一层安全防护</p>*/}
					{/*	</div>*/}
					{/*	<button class="px-4 py-2 rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-[#333333] text-white text-xs font-semibold cursor-pointer">*/}
					{/*		立即开启*/}
					{/*	</button>*/}
					{/*</div>*/}
					{/*<div class="flex items-center justify-between py-4">*/}
					{/*	<div>*/}
					{/*		<h4 class="text-sm font-semibold mb-1">登录活动审计</h4>*/}
					{/*		<p class="text-xs text-secondary">查看最近 30 天的账号登录日志</p>*/}
					{/*	</div>*/}
					{/*	<button class="px-4 py-2 rounded-[20px] border border-[rgba(0,0,0,0.1)] bg-transparent text-xs font-semibold cursor-pointer">*/}
					{/*		查看日志*/}
					{/*	</button>*/}
					{/*</div>*/}
				</div>
			</div>
		</main>
	)
}
