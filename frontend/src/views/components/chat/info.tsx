import { cn } from "@/libs/utils.ts"

interface InfoProps {
	class?: string
}

export function Info(props: InfoProps) {
	return (
		<aside class={cn("bg-white flex flex-col overflow-y-auto", props.class)}>
			<div class="px-6 py-10 pb-6 flex flex-col items-center text-center border-b border-[rgba(0,0,0,0.03)]">
				<img
					src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&amp;fit=crop&amp;w=200&amp;q=80"
					class="size-25 rounded-4xl object-cover mb-4 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
					alt={""}
				/>
				<h3 class="text-xl font-bold text-[#333333] mb-1">Alex Rivera</h3>
				<p class="text-sm text-secondary leading-relaxed px-5">
					Tech enthusiast and interior designer. Loves exploring smart home gadgets and
					minimalist aesthetics.
				</p>
			</div>

			<div class="px-6 py-6 border-b border-[rgba(0,0,0,0.03)]">
				<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
					Connected Platforms
				</h4>
				<div class="flex gap-2.5 flex-wrap">
					<div class="flex items-center gap-2 bg-[#F8F8F8] px-3 py-2 rounded-xl text-xs font-semibold">
						<div class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-black text-[8px] text-white font-bold">
							T
						</div>
						<span>TikTok</span>
					</div>
					<div class="flex items-center gap-2 bg-[#F8F8F8] px-3 py-2 rounded-xl text-xs font-semibold">
						<div class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-[#1877F2] text-[8px] text-white font-bold">
							f
						</div>
						<span>Facebook</span>
					</div>
				</div>
			</div>

			<div class="px-6 py-6 border-b border-[rgba(0,0,0,0.03)]">
				<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
					Conversation Timeline
				</h4>
				<div class="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#F0F0F0] before:rounded-sm">
					<div class="relative mb-5 after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#97E08F] after:border-2 after:border-white">
						<div class="text-[11px] text-secondary mb-0.5">Today, 14:18</div>
						<div class="text-sm text-[#333333] font-medium">
							Inquired about "Smart Lighting" video
						</div>
					</div>
					<div class="relative mb-5 after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#DDD] after:border-2 after:border-white">
						<div class="text-[11px] text-secondary mb-0.5">Oct 24, 2023</div>
						<div class="text-sm text-[#333333] font-medium">
							Followed your TikTok account
						</div>
					</div>
					<div class="relative after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#DDD] after:border-2 after:border-white">
						<div class="text-[11px] text-secondary mb-0.5">Oct 12, 2023</div>
						<div class="text-sm text-[#333333] font-medium">
							First interaction via Facebook post
						</div>
					</div>
				</div>
			</div>

			<div class="px-6 py-6 border-b-0">
				<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
					Quick Actions
				</h4>
				<div class="grid grid-cols-2 gap-3">
					<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2]">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
							<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
						</svg>
						<span class="text-xs font-semibold">Mute</span>
					</div>
					<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2]">
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span class="text-xs font-semibold">Export</span>
					</div>
					<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2] col-span-2 text-[#FF4D4F]">
						<div class="flex items-center gap-2">
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
							</svg>
							<span class="text-xs font-semibold">Block User</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}
