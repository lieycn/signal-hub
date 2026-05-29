import { Match, Switch } from "solid-js"

import type { Platform } from "@/api/types/platform.ts"

interface Props {
	platform: Platform
}

export function PlatformTag(props: Props) {
	return (
		<Switch>
			<Match when={props.platform === "v2ex"}>
				<span class="text-xs font-semibold inline-flex items-center gap-1">
					<div
						class={
							"size-5 bg-white text-black inline-flex items-center justify-center rounded border p-0.5 border-slate-300"
						}
					>
						<IconSimpleIconsV2ex />
					</div>
					V2EX
				</span>
			</Match>
			<Match when={props.platform === "2libra"}>
				<span class="text-xs font-semibold inline-flex items-center gap-1">
					<IconLocalLibra class={"text-xl"} />
					2Libra
				</span>
			</Match>
		</Switch>
	)
}
