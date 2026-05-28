import { createRouter } from "@tanstack/solid-router"
import { routeTree } from "./routes.gen"

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultStaleTime: 5000,
	scrollRestoration: true,
})

declare module "@tanstack/solid-router" {
	interface Register {
		router: typeof router
	}
}
