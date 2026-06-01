import { usePagination } from "alova/client"
import { For, Show } from "solid-js"

import { alova } from "@/api"
import type { Message } from "@/api/types/message.ts"
import { Spin } from "@/components/widgets"
import { Empty } from "@/views/components/empty"

import { Info } from "./info.tsx"

interface Props {
	memberId?: number
}

export function Chat(props: Props) {
	const { data, loading } = usePagination(
		(page, pageSize) =>
			alova.Get<PaginationResp<Message>>("/messages", {
				params: {
					page,
					pageSize,
					"filter[from_member_id][eq]": props.memberId,
				},
			}),
		{
			initialData: [],
			watchingStates: [() => props.memberId],
			middleware: (_, next) => {
				if (props.memberId) {
					return next()
				}
			},
		},
	)

	return (
		<Show when={data().length > 0} fallback={<Empty />}>
			<Spin spinning={loading()}>
				<div class={"size-full grid grid-cols-12"}>
					<main class="col-span-12 xl:col-span-8 flex flex-col bg-linear-to-b from-white to-[#FDFDFD] border-r border-[rgba(0,0,0,0.03)] size-full overflow-hidden">
						<header class="px-6 py-4 bg-white/75 backdrop-blur-md flex items-center justify-between border-b border-[rgba(0,0,0,0.02)]">
							<div class="flex items-center gap-3">
								<div>
									<h2 class="text-base font-bold">Alex Rivera</h2>
									<span class="text-[11px] text-secondary">
										Active 15 mins ago
									</span>
								</div>
							</div>
							<div class="flex gap-2">
								<IconLucideSearch class={"text-xl text-secondary"} />
								<IconLucideEllipsisVertical
									class={"text-xl text-secondary cursor-pointer"}
								/>
							</div>
						</header>

						<div class="flex-1 px-6 py-4 overflow-y-auto flex flex-col gap-6">
							<For each={data()}>
								{(msg) => (
									<div class="max-w-4/5 flex flex-col gap-1 self-start">
										<div class={"flex gap-1 items-start"}>
											<h1
												class={"text-xs font-normal [&_a]:hover:underline"}
												innerHTML={msg.title}
											></h1>
											<span class={"text-xs text-secondary shrink-0"}>
												{msg.send_at}
											</span>
										</div>
										<Show when={msg.content}>
											<div
												class="px-4.5 py-3 rounded-2xl text-sm leading-relaxed bg-[#F2F2F2] text-[#333333] rounded-bl-lg wrap-break-word"
												innerHTML={msg.content}
											/>
										</Show>
									</div>
								)}
							</For>

							{/*<div class="max-w-[80%] flex flex-col gap-1 self-end items-end">*/}
							{/*	<div class="px-4.5 py-3 rounded-2xl text-sm leading-relaxed bg-[#333333] text-white rounded-br-lg">*/}
							{/*		嗨，Alex！那个是 Philips Hue 系列的一款极简主义设计款。*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>

						<footer class="px-6 py-5 flex items-center gap-3">
							<IconLucidePaperclip class={"text-xl cursor-pointer text-secondary"} />

							<div class="flex-1 bg-[rgba(0,0,0,0.03)] rounded-[30px] px-5 py-2.5 flex items-center">
								<input
									type="text"
									placeholder="Type a message..."
									class="bg-none border-none outline-none w-full text-sm"
								/>
							</div>
							<button class="w-11 h-11 rounded-full bg-[#97E08F] border-none flex items-center justify-center cursor-pointer">
								<IconLucideSend class={"text-white text-xl"} />
							</button>
						</footer>
					</main>

					<Info class={"hidden xl:block xl:col-span-4"} memberId={props.memberId} />
				</div>
			</Spin>
		</Show>
	)
}
