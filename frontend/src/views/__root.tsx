import { Outlet, createRootRoute } from "@tanstack/solid-router"

import { Sidebar } from "@/components/sidebar"

export const Route = createRootRoute({
	component: RootComponent,
})

function RootComponent() {
	return (
		<div class={"size-full flex"}>
			<Sidebar />

			<main class="bg-linear-to-b from-white to-[#fdfdfd] overflow-y-auto w-full">
				<Outlet />
			</main>
		</div>
	)
}
