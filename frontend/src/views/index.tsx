import { createFileRoute } from "@tanstack/solid-router"
import { usePagination } from "alova/client"
import { createSelector, createSignal, For } from "solid-js"

import { alova } from "@/api"
import type { Member } from "@/api/types/member.ts"
import { Spin } from "@/components/widgets"
import { cn } from "@/libs/utils.ts"
import { Chat } from "@/views/components/chat"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	const { data, loading } = usePagination((page, pageSize) =>
		alova.Get<PaginationResp<Member>>("/members", {
			params: {
				page,
				pageSize,
				preload: "LatestMessage",
			},
		}),
	)

	const [selectedMemberId, setSelectedMemberId] = createSignal<number | undefined>(undefined)

	const isSelected = createSelector(selectedMemberId)

	return (
		<div class="size-full bg-white flex shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden relative">
			<aside class="bg-[#FAFAFA] border-r border-[rgba(0,0,0,0.03)] flex flex-col shrink-0">
				<div class="px-6 py-6 text-sm font-semibold text-secondary uppercase tracking-wider flex justify-between items-center">
					<span>Messages</span>
					<IconLucideSquarePen class={"text-xl"} />
				</div>
				<div class="flex-1 overflow-y-auto px-3">
					<Spin spinning={loading()}>
						<For each={data()}>
							{(member) => (
								<div
									class={cn(
										"flex items-center px-3 py-3 mb-2 rounded-2xl cursor-pointer transition-bg w-72",
										isSelected(member.id) && "bg-white shadow-base",
									)}
									onClick={() => setSelectedMemberId(member.id)}
								>
									<div class="relative mr-3">
										<img
											src={member.avatar}
											class="size-12 rounded-full bg-[#EEE] object-cover overflow-hidden"
											alt="User"
										/>
										<div class="absolute -bottom-0.5 -right-0.5 size-4.5 rounded-full border-2 border-white flex items-center justify-center bg-black text-[8px] text-white font-bold">
											T
										</div>
									</div>
									<div class="flex-1 min-w-0">
										<div class="flex justify-between items-baseline mb-0.5">
											<span class="font-semibold text-[15px]">
												{member.name}
											</span>
											<span class="text-[11px] text-secondary">14:20</span>
										</div>
										<div
											innerHTML={member.latest_message?.content}
											class="text-[13px] text-secondary whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1"
										></div>
									</div>
								</div>
							)}
						</For>

						<p class={"w-72 px-4 py-8 text-center text-secondary font-normal"}>
							暂无消息
						</p>
					</Spin>
				</div>
			</aside>

			<Chat memberId={selectedMemberId()} />
		</div>
	)
}
