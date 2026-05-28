import { useWatcher } from "alova/client"

import { alova } from "@/api"
import type { Member } from "@/api/types/member.ts"
import { PlatformTag, Spin } from "@/components/widgets"
import { cn } from "@/libs/utils.ts"

interface InfoProps {
	class?: string
	memberId?: number
}

export function Info(props: InfoProps) {
	const { data, loading } = useWatcher(
		alova.Get<Member>("/members/" + props.memberId),
		[() => props.memberId],
		{
			immediate: true,
			initialData: {},
			middleware: (_, next) => {
				if (props.memberId) {
					return next()
				}
			},
		},
	)

	return (
		<Spin spinning={loading()}>
			<aside class={cn("bg-white flex flex-col overflow-y-auto", props.class)}>
				<div class="px-6 py-10 pb-6 flex flex-col items-center text-center border-b border-[rgba(0,0,0,0.03)]">
					<img
						src={data().avatar}
						class="size-25 rounded-4xl object-cover mb-4 shadow-[0_8px_20px_rgba(0,0,0,0.1)]"
						alt={data().name}
					/>
					<h3 class="text-xl font-bold text-[#333333] mb-1">{data().name}</h3>
					{/*<p class="text-sm text-secondary leading-relaxed px-5">*/}
					{/*	Tech enthusiast and interior designer. Loves exploring smart home gadgets*/}
					{/*	and minimalist aesthetics.*/}
					{/*</p>*/}
				</div>

				<div class="px-6 py-6 border-b border-[rgba(0,0,0,0.03)]">
					<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
						Connected Platforms
					</h4>
					<div class="flex gap-2.5 flex-wrap">
						<PlatformTag platform={data().platform} />
						{/*<div class="flex items-center gap-2 bg-[#F8F8F8] px-3 py-2 rounded-xl text-xs font-semibold">*/}
						{/*	<div class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-black text-[8px] text-white font-bold">*/}
						{/*		T*/}
						{/*	</div>*/}
						{/*	<span>TikTok</span>*/}
						{/*</div>*/}
						{/*<div class="flex items-center gap-2 bg-[#F8F8F8] px-3 py-2 rounded-xl text-xs font-semibold">*/}
						{/*	<div class="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-[#1877F2] text-[8px] text-white font-bold">*/}
						{/*		f*/}
						{/*	</div>*/}
						{/*	<span>Facebook</span>*/}
						{/*</div>*/}
					</div>
				</div>

				{/*<div class="px-6 py-6 border-b border-[rgba(0,0,0,0.03)]">*/}
				{/*	<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">*/}
				{/*		Conversation Timeline*/}
				{/*	</h4>*/}
				{/*	<div class="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#F0F0F0] before:rounded-sm">*/}
				{/*		<div class="relative mb-5 after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#97E08F] after:border-2 after:border-white">*/}
				{/*			<div class="text-[11px] text-secondary mb-0.5">Today, 14:18</div>*/}
				{/*			<div class="text-sm text-[#333333] font-medium">*/}
				{/*				Inquired about "Smart Lighting" video*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<div class="relative mb-5 after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#DDD] after:border-2 after:border-white">*/}
				{/*			<div class="text-[11px] text-secondary mb-0.5">Oct 24, 2023</div>*/}
				{/*			<div class="text-sm text-[#333333] font-medium">*/}
				{/*				Followed your TikTok account*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<div class="relative after:content-[''] after:absolute after:-left-6 after:top-1 after:w-2.5 after:h-2.5 after:rounded-full after:bg-[#DDD] after:border-2 after:border-white">*/}
				{/*			<div class="text-[11px] text-secondary mb-0.5">Oct 12, 2023</div>*/}
				{/*			<div class="text-sm text-[#333333] font-medium">*/}
				{/*				First interaction via Facebook post*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div class="px-6 py-6 border-b-0">*/}
				{/*	<h4 class="text-xs font-bold text-secondary uppercase tracking-widest mb-4">*/}
				{/*		Quick Actions*/}
				{/*	</h4>*/}
				{/*	<div class="grid grid-cols-2 gap-3">*/}
				{/*		<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2]">*/}
				{/*			<IconLucideBell class={"text-xl"} />*/}
				{/*			<span class="text-xs font-semibold">Mute</span>*/}
				{/*		</div>*/}
				{/*		<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2]">*/}
				{/*			<IconLucideDownload class={"text-xl"} />*/}
				{/*			<span class="text-xs font-semibold">Export</span>*/}
				{/*		</div>*/}
				{/*		<div class="flex flex-col items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[rgba(0,0,0,0.03)] bg-[#FAFAFA] cursor-pointer transition-all hover:bg-[#F2F2F2] col-span-2 text-[#FF4D4F]">*/}
				{/*			<div class="flex items-center gap-2">*/}
				{/*				<IconLucideBan class={"text-xl"} />*/}
				{/*				<span class="text-xs font-semibold">Block User</span>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</aside>
		</Spin>
	)
}
