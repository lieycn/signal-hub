import { createFileRoute } from "@tanstack/solid-router"
import { usePagination } from "alova/client"
import { For } from "solid-js"

import { alova } from "@/api"
import type { Member } from "@/api/types/member.ts"
import { Button, Checkbox } from "@/components/widgets"
import { PlatformTag } from "@/components/widgets"
import { duration } from "@/libs/dayjs.ts"

export const Route = createFileRoute("/contact/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { data, loading, total } = usePagination(
		(page, pageSize) =>
			alova.Get<PaginationResp<Member>>("/members", {
				params: {
					page,
					pageSize,
				},
			}),
		{},
	)
	return (
		<main class="flex flex-col bg-linear-to-b from-white to-[#FDFDFD] overflow-hidden">
			<header class="px-12 py-8 flex justify-between items-center">
				<div>
					<h1 class="text-2xl font-bold mb-1">客户画廊</h1>
					<p class="text-sm text-secondary">
						已聚合 {total()?.toLocaleString()} 位活跃联系人
					</p>
				</div>
				<div class="flex gap-2">
					<Button leftIcon={<IconLucidePlus />} variant={"primary"} size={"large"}>
						手动添加
					</Button>
				</div>
			</header>

			<div class="px-12 pb-6 flex justify-between items-center gap-4">
				<div class="flex-1 relative">
					<div class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
						<IconLucideSearch class={"text-xl"} />
					</div>
					<input
						type="text"
						class="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-[rgba(0,0,0,0.05)] rounded-[30px] text-sm outline-none"
						placeholder="快速定位联系人..."
					/>
				</div>

				<div class="flex gap-2">
					<Button leftIcon={<IconLucideFilter />} variant={"outline"}>
						平台筛选
					</Button>
				</div>
			</div>

			<div class="px-12 pb-12 flex-1 overflow-y-auto columns-3 column-gap-5">
				<For each={data()}>
					{(member) => (
						<div class="break-inside-avoid group bg-white border border-slate-100 rounded-2xl mb-5 p-5 relative transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-[rgba(0,0,0,0.08)]">
							<div class="absolute top-2 left-2 hidden group-hover:block">
								<Checkbox />
							</div>
							<div class="flex justify-between items-start mb-4">
								<div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base text-[#666] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] bg-[#FFE0E0]">
									{member.name.charAt(0).toUpperCase()}
								</div>

								<PlatformTag platform={member.platform} />
							</div>
							<div>
								<h3 class="text-base font-bold mb-1">{member.name}</h3>
								<div class="text-xs text-secondary mb-3">
									ID: {member.platform_member_id}
								</div>
								<div class="text-xs text-secondary flex items-center gap-1 mb-1">
									<IconLucideClock />
									{duration(member.created_at, true)}
								</div>
							</div>
							{/*<div class="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[rgba(0,0,0,0.04)]">*/}
							{/*	<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">*/}
							{/*		意向客户*/}
							{/*	</span>*/}
							{/*	<span class="text-xs px-2.5 py-1 bg-[rgba(0,0,0,0.04)] rounded-md text-secondary font-medium">*/}
							{/*		高互动*/}
							{/*	</span>*/}
							{/*</div>*/}
						</div>
					)}
				</For>
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
