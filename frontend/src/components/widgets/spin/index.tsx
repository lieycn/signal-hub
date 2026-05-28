import { Show, type JSX } from "solid-js"

import { cn } from "@/libs/utils"

export interface SpinProps {
	loading?: boolean
	size?: "small" | "default" | "large"
	tip?: string
	delay?: number
	spinning?: boolean
	class?: string
	children?: JSX.Element
	wrapperClassName?: string
}

const sizeClasses = {
	small: "w-4 h-4 border-2",
	default: "w-6 h-6 border-2",
	large: "w-8 h-8 border-3",
}

export function Spin(props: SpinProps) {
	const isLoading = () => props.loading ?? props.spinning ?? true
	const size = () => props.size ?? "default"

	return (
		<Show when={isLoading()} fallback={props.children}>
			<div class={cn("size-full", props.class)}>
				<Show when={props.children}>
					<div class={cn("size-full relative inline-block", props.wrapperClassName)}>
						{props.children}
						<Show when={isLoading()}>
							<div class="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
								<Spinner size={size()} />
								<Show when={props.tip}>
									<p class="mt-2 text-sm text-gray-600">{props.tip}</p>
								</Show>
							</div>
						</Show>
					</div>
				</Show>
				<Show when={!props.children}>
					<div class="flex flex-col items-center justify-center size-full">
						<Spinner size={size()} />
						<Show when={props.tip}>
							<p class="mt-2 text-sm text-gray-600">{props.tip}</p>
						</Show>
					</div>
				</Show>
			</div>
		</Show>
	)
}

function Spinner(props: { size: "small" | "default" | "large" }) {
	return (
		<div
			class={cn(
				"rounded-full border-solid border-gray-300 border-t-primary animate-spin",
				sizeClasses[props.size],
			)}
		/>
	)
}

// Full page spin component
export interface SpinFullScreenProps {
	loading?: boolean
	tip?: string
	size?: "small" | "default" | "large"
	class?: string
}

export function SpinFullScreen(props: SpinFullScreenProps) {
	return (
		<Show when={props.loading ?? true}>
			<div
				class={cn(
					"fixed inset-0 flex items-center justify-center bg-white/90 z-50",
					props.class,
				)}
			>
				<div class="flex flex-col items-center">
					<div
						class={cn(
							"rounded-full border-solid border-gray-300 border-t-primary animate-spin",
							sizeClasses[props.size ?? "default"],
						)}
					/>
					<Show when={props.tip}>
						<p class="mt-3 text-base text-gray-700">{props.tip}</p>
					</Show>
				</div>
			</div>
		</Show>
	)
}

// Simple spinner only component
export interface SpinnerOnlyProps {
	size?: "small" | "default" | "large"
	class?: string
	color?: string
}

export function SpinnerOnly(props: SpinnerOnlyProps) {
	const size = () => props.size ?? "default"
	const color = () => props.color ?? "border-t-primary"

	return (
		<div
			class={cn(
				"rounded-full border-solid border-gray-300 animate-spin",
				sizeClasses[size()],
				color(),
				props.class,
			)}
		/>
	)
}
