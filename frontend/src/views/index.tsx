import { createFileRoute } from "@tanstack/solid-router"

import { Chat } from "@/views/components/chat"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div class="size-full bg-white flex shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden relative">
			<aside class="bg-[#FAFAFA] border-r border-[rgba(0,0,0,0.03)] flex flex-col shrink-0">
				<div class="px-6 py-6 text-sm font-semibold text-secondary uppercase tracking-wider flex justify-between items-center">
					<span>Messages</span>
					<div class="w-8 h-8 flex items-center justify-center text-secondary cursor-pointer">
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
							<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
						</svg>
					</div>
				</div>
				<div class="flex-1 overflow-y-auto px-3">
					<div class="flex items-center px-3 py-3 mb-2 rounded-2xl cursor-pointer transition-bg bg-white shadow-base">
						<div class="relative mr-3">
							<img
								src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&amp;fit=crop&amp;w=100&amp;q=80"
								class="w-12 h-12 rounded-full bg-[#EEE] object-cover"
								alt="User"
							/>
							<div class="absolute -bottom-0.5 -right-0.5 size-4.5 rounded-full border-2 border-white flex items-center justify-center bg-black text-[8px] text-white font-bold">
								T
							</div>
						</div>
						<div class="flex-1 min-w-0">
							<div class="flex justify-between items-baseline mb-0.5">
								<span class="font-semibold text-[15px]">Alex Rivera</span>
								<span class="text-[11px] text-secondary">14:20</span>
							</div>
							<div class="text-[13px] text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
								太感谢了！期待你的链接...
							</div>
						</div>
					</div>
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
				</div>
			</aside>

			<Chat />
		</div>
	)
}
