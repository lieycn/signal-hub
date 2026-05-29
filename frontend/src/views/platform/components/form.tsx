import { useForm } from "alova/client"
import { For, Show } from "solid-js"

import { alova } from "@/api"
import { Button, Input } from "@/components/widgets"

interface Props {
	onClose?: () => void
}

export function PlatformForm(props: Props) {
	const { form, send, updateForm, loading, onSuccess } = useForm(
		(form) => alova.Post("/accounts", form),
		{
			initialForm: {
				platform: "",
				config: {},
			},
		},
	)

	onSuccess(() => props.onClose && props.onClose())

	const platforms = [
		{
			title: "V2ex",
			description: "同步帖子评论、回复和私信内容。",
			platform: "v2ex",
			icon: <IconSimpleIconsV2ex class={"text-2xl"} />,
		},
		{
			title: "2libra",
			description: "同步帖子评论、回复和私信内容。",
			platform: "2libra",
			icon: <IconLocalLibra class={"text-3xl"} />,
		},
	]

	return (
		<div>
			<Show when={form().platform.length === 0}>
				<div class={"grid grid-cols-2 gap-4"}>
					<For each={platforms}>
						{(platform) => (
							<div class="p-5 bg-white border border-slate-100 rounded-2xl flex flex-col gap-4 transition-all hover:border-slate-200">
								<div class="flex justify-between items-start">
									{platform.icon}

									<button
										class="btn btn-outline"
										onClick={() => updateForm({ platform: platform.platform })}
									>
										连接
									</button>
								</div>
								<div>
									<h5 class={"text-base font-semibold mb-1"}>{platform.title}</h5>
									<p class={"text-xs text-secondary leading-normal"}>
										{platform.description}
									</p>
								</div>
							</div>
						)}
					</For>
				</div>
			</Show>

			<Show when={form().platform}>
				<div class={"space-y-6"}>
					<Show when={form().platform === "v2ex"}>
						<Input
							label={"Personal Access Token"}
							placeholder={"Personal Access Token"}
							onChange={(value) =>
								updateForm({
									config: {
										v2ex: { personal_access_token: value },
									},
								})
							}
						/>
					</Show>

					<Show when={form().platform === "2libra"}>
						<Input
							label={"Access Token"}
							placeholder={"Access Token"}
							onChange={(value) =>
								updateForm({
									config: {
										libra: { access_token: value },
									},
								})
							}
						/>
					</Show>

					<div class={"text-center"}>
						<Button
							variant={"primary"}
							class={"w-full max-w-sm justify-center gap-4"}
							leftIcon={<IconLucideSend />}
							size={"large"}
							loading={loading()}
							onClick={send}
						>
							提交
						</Button>
					</div>
				</div>
			</Show>
		</div>
	)
}
