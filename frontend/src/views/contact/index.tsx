import { createFileRoute } from "@tanstack/solid-router"
import { usePagination } from "alova/client"

import { alova } from "@/api"

export const Route = createFileRoute("/contact/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { data } = usePagination((page, pageSize) =>
		alova.Get("/members", {
			params: {
				page,
				pageSize,
			},
		}),
	)
	return (
		<main class="flex flex-col bg-linear-to-b from-white to-[#FDFDFD] overflow-hidden">
			<header class="px-12 py-8 flex justify-between items-center">
				<div>
					<h1 class="text-2xl font-bold mb-1">客户画廊</h1>
					<p class="text-sm text-secondary">已聚合 5 个平台的 2,481 位活跃联系人</p>
				</div>
				<div class="flex gap-2">
					<button class="px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-[30px] text-sm font-medium cursor-pointer flex items-center gap-1.5 transition-all hover:bg-[#FAFAFA]">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<rect x="3" y="3" width="7" height="7"></rect>
							<rect x="14" y="3" width="7" height="7"></rect>
							<rect x="14" y="14" width="7" height="7"></rect>
							<rect x="3" y="14" width="7" height="7"></rect>
						</svg>
						网格视图
					</button>
					<button class="px-4 py-2.5 bg-[#333333] rounded-[30px] text-sm font-medium cursor-pointer flex items-center gap-1.5 transition-all text-white">
						+ 手动添加
					</button>
				</div>
			</header>

			<div class="px-12 pb-6 flex justify-between items-center gap-4">
				<div class="flex-1 relative">
					<div class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
					</div>
					<input
						type="text"
						class="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-[rgba(0,0,0,0.05)] rounded-[30px] text-sm outline-none"
						placeholder="快速定位联系人..."
					/>
				</div>
				<div class="flex gap-2">
					<button class="px-4 py-2.5 bg-white border border-[rgba(0,0,0,0.08)] rounded-[30px] text-sm font-medium cursor-pointer flex items-center gap-1.5 transition-all hover:bg-[#FAFAFA]">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
						</svg>
						平台筛选
					</button>
				</div>
			</div>

			<div class="px-12 pb-12 flex-1 overflow-y-auto columns-3 column-gap-5">
				<div class="break-inside-avoid bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
					<div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100">
						<div class="size-4.5 border-2 rounded-md flex items-center justify-center bg-[#333333]">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								stroke-width="4"
							>
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</div>
					</div>
					<div class="flex justify-between items-start mb-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#FFE0E0]">
							AL
						</div>
						<span class="inline-flex items-center px-2.5 py-1 rounded-[20px] text-[10px] font-bold text-white uppercase tracking-wider bg-black">
							TikTok
						</span>
					</div>
					<div>
						<h3 class="text-base font-bold mb-1">Alex Ling</h3>
						<div class="text-xs text-secondary mb-3">ID: 8829103</div>
						<div class="text-xs text-secondary flex items-center gap-1 mb-1">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							2分钟前
						</div>
					</div>
					<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							意向客户
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							高互动
						</span>
					</div>
				</div>

				<div class="break-inside-avoid bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
					<div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100">
						<div class="size-4.5 border-2 border-[#DDD] rounded-md bg-white flex items-center justify-center"></div>
					</div>
					<div class="flex justify-between items-start mb-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#E0F0FF]">
							W
						</div>
						<span class="inline-flex items-center px-2.5 py-1 rounded-[20px] text-[10px] font-bold text-white uppercase tracking-wider bg-[#07C160]">
							WeChat
						</span>
					</div>
					<div>
						<h3 class="text-base font-bold mb-1">王小明 (Mandy)</h3>
						<div class="text-xs text-secondary mb-3">灵感视觉摄影</div>
						<div class="text-xs text-secondary flex items-center gap-1 mb-1">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							1小时前
						</div>
					</div>
					<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							重要客户
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							摄影
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							本地
						</span>
					</div>
				</div>

				<div class="break-inside-avoid bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
					<div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100">
						<div class="size-4.5 border-2 border-[#DDD] rounded-md bg-white flex items-center justify-center"></div>
					</div>
					<div class="flex justify-between items-start mb-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#FFFFE0]">
							甜
						</div>
						<span class="inline-flex items-center px-2.5 py-1 rounded-[20px] text-[10px] font-bold text-white uppercase tracking-wider bg-[linear-gradient(45deg,#25F4EE,#FE2C55)]">
							Douyin
						</span>
					</div>
					<div>
						<h3 class="text-base font-bold mb-1">甜心果冻</h3>
						<div class="text-xs text-secondary mb-3">粉丝数: 12.4w</div>
						<div class="text-xs text-secondary flex items-center gap-1 mb-1">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							2天前
						</div>
					</div>
					<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							达人合作
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							美妆
						</span>
					</div>
				</div>

				<div class="break-inside-avoid bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
					<div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100">
						<div class="size-4.5 border-2 border-[#DDD] rounded-md bg-white flex items-center justify-center"></div>
					</div>
					<div class="flex justify-between items-start mb-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#F3E0FF]">
							SB
						</div>
						<span class="inline-flex items-center px-2.5 py-1 rounded-[20px] text-[10px] font-bold text-white uppercase tracking-wider bg-[#1877F2]">
							Facebook
						</span>
					</div>
					<div>
						<h3 class="text-base font-bold mb-1">Sarah Brown</h3>
						<div class="text-xs text-secondary mb-3">sarah.b@media.com</div>
						<div class="text-xs text-secondary flex items-center gap-1 mb-1">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							3小时前
						</div>
					</div>
					<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							海外代理
						</span>
					</div>
				</div>

				<div class="break-inside-avoid bg-white border border-[rgba(0,0,0,0.04)] rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
					<div class="absolute top-3 left-3 opacity-0 group-hover:opacity-100">
						<div class="size-4.5 border-2 border-[#DDD] rounded-md bg-white flex items-center justify-center"></div>
					</div>
					<div class="flex justify-between items-start mb-4">
						<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#E0FFE0]">
							CJ
						</div>
						<span class="inline-flex items-center px-2.5 py-1 rounded-[20px] text-[10px] font-bold text-white uppercase tracking-wider bg-[#0089FF]">
							DingTalk
						</span>
					</div>
					<div>
						<h3 class="text-base font-bold mb-1">陈建国 (钉钉)</h3>
						<div class="text-xs text-secondary mb-3">采购主管 - 恒太贸易</div>
						<div class="text-xs text-secondary flex items-center gap-1 mb-1">
							<svg
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
							昨天 14:30
						</div>
					</div>
					<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							B端客户
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							大客户
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							长期协议
						</span>
						<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">
							决策者
						</span>
					</div>
				</div>
			</div>

			<div class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#333333] text-white px-12 py-3 rounded-[40px] flex items-center gap-5 shadow-[0_10px_40px_rgba(0,0,0,0.2)] z-100">
				<div class="text-sm font-medium">已选择 1 个项目</div>
				<div class="w-px h-4 bg-black/20"></div>
				<button class="bg-transparent border-none text-white text-sm font-semibold cursor-pointer flex items-center gap-1.5">
					<IconLucideMessageSquare />
					批量消息
				</button>
				<button class="bg-transparent border-none text-white text-sm font-semibold cursor-pointer flex items-center gap-1.5">
					<IconLucideTag />
					标签管理
				</button>
				<button class="bg-transparent border-none text-[#FF6B6B] text-sm font-semibold cursor-pointer flex items-center gap-1.5">
					<IconLucideTrash2 />
					移除
				</button>
			</div>
		</main>
	)
}
