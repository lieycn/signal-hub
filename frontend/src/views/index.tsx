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
										"flex items-center px-3 py-3 mb-2 rounded-2xl cursor-pointer transition-bg ",
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
										<div class="text-[13px] text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
											太感谢了！期待你的链接...
										</div>
									</div>
								</div>
							)}
						</For>

						<div class="flex items-center px-3 py-3 mb-2 rounded-2xl cursor-pointer transition-bg">
							<div class="relative mr-3">
								<img
									src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&amp;fit=crop&amp;w=100&amp;q=80"
									class="w-12 h-12 rounded-full bg-[#EEE] object-cover"
									alt={""}
								/>
								<div class="absolute -bottom-0.5 -right-0.5 size-4.5 rounded-full border-2 border-white flex items-center justify-center bg-[#1877F2] text-[8px] text-white font-bold">
									f
								</div>
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex justify-between items-baseline mb-0.5">
									<span class="font-semibold text-[15px]">Jessica Smith</span>
									<span class="text-[11px] text-secondary">12:05</span>
								</div>
								<div class="text-[13px] text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
									Hi, did you see the update?
								</div>
							</div>
						</div>
					</Spin>
				</div>
			</aside>

			<Chat memberId={selectedMemberId()} />
		</div>
	)
}
