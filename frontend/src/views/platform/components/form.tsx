import { useForm } from "alova/client"
import { Show } from "solid-js"

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
				platform: "v2ex",
				config: {},
			},
		},
	)

	onSuccess(() => props.onClose && props.onClose())

	return (
		<div>
			<Show when={form().platform.length === 0}>
				<div class={"grid grid-cols-2 gap-4"}>
					<div class="p-5 bg-white border border-slate-100 rounded-2xl flex flex-col gap-4 transition-all hover:border-slate-200">
						<div class="flex justify-between items-start">
							<div class="size-11 rounded-xl flex items-center justify-center">
								<IconSimpleIconsV2ex class={"text-2xl"} />
							</div>

							<button
								class="btn btn-outline"
								onClick={() => updateForm({ platform: "v2ex" })}
							>
								连接
							</button>
						</div>
						<div>
							<h5 class={"text-base font-semibold mb-1"}>Instagram Business</h5>
							<p class={"text-xs text-secondary leading-normal"}>
								同步帖子评论、快拍回复和私信内容。
							</p>
						</div>
					</div>
				</div>
			</Show>

			<Show when={form().platform === "v2ex"}>
				<div class={"space-y-6"}>
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
