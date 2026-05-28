import { Link } from "@tanstack/solid-router"
import { For } from "solid-js"

import { cn } from "@/libs/utils.ts"

export function Sidebar() {
	const items = [
		{
			path: "/",
			label: "消息中心",
			icon: <IconLucideMessageSquare />,
		},
		{
			path: "/contact",
			label: "通讯录",
			icon: <IconLucideUsers />,
		},
		{
			path: "/platform",
			label: "平台集成",
			icon: <IconLucideLayoutGrid />,
		},
		{
			path: "/settings",
			label: "通用设置",
			icon: <IconLucideSettings />,
		},
	]
	return (
		<aside class="border-r border-slate-200 flex flex-col w-32 shrink-0">
			<div class="p-6 text-sm font-semibold text-secondary">
				<span>管理菜单</span>
			</div>
			<nav class="px-3">
				<div
					class={cn(
						"text-secondary text-base",
						"[&_a]:flex [&_a]:flex-col [&_a]:items-center [&_a]:gap-3 [&_a]:px-1 [&_a]:py-4 [&_a]:mb-1 [&_a]:rounded-2xl [&_a]:cursor-pointer [&_a]:transition-all",
						"[&_svg]:text-xl",
					)}
				>
					<For each={items}>
						{(item) => (
							<Link
								to={item.path}
								activeProps={{
									class: "bg-white text-primary shadow-base",
								}}
							>
								{item.icon}
								<span>{item.label}</span>
							</Link>
						)}
					</For>
				</div>
			</nav>
		</aside>
	)
}
