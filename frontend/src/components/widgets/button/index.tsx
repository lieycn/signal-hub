import { Show, type JSX } from "solid-js"

import { cn } from "@/libs/utils"

export interface ButtonProps {
	variant?: "default" | "outline" | "primary"
	size?: "default" | "large"
	loading?: boolean
	disabled?: boolean
	type?: "button" | "submit" | "reset"
	leftIcon?: JSX.Element
	rightIcon?: JSX.Element
	class?: string
	children: JSX.Element
	onClick?: (e: MouseEvent) => void
	onMouseDown?: (e: MouseEvent) => void
	onMouseUp?: (e: MouseEvent) => void
	name?: string
	id?: string
	form?: string
}

export function Button(props: ButtonProps) {
	const variant = () => props.variant || "default"
	const size = () => props.size || "default"
	const isDisabled = () => props.disabled || props.loading

	const handleClick = (e: MouseEvent) => {
		if (isDisabled()) {
			e.preventDefault()
			return
		}
		props.onClick?.(e)
	}

	const handleMouseDown = (e: MouseEvent) => {
		if (isDisabled()) {
			e.preventDefault()
			return
		}
		props.onMouseDown?.(e)
	}

	const handleMouseUp = (e: MouseEvent) => {
		if (isDisabled()) {
			e.preventDefault()
			return
		}
		props.onMouseUp?.(e)
	}

	return (
		<button
			id={props.id}
			type={props.type || "button"}
			name={props.name}
			form={props.form}
			disabled={isDisabled()}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			class={cn(
				"btn",
				variant() === "outline" && "btn-outline",
				variant() === "primary" && "btn-primary",
				size() === "large" && "btn-large",
				props.class,
			)}
		>
			{/* Loading Spinner */}
			<Show when={props.loading}>
				<svg
					class="animate-spin"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</Show>

			{/* Left Icon */}
			<Show when={!props.loading && props.leftIcon}>{props.leftIcon}</Show>

			{/* Children */}
			<span class={cn(props.loading && "opacity-50")}>{props.children}</span>

			{/* Right Icon */}
			<Show when={!props.loading && props.rightIcon}>{props.rightIcon}</Show>
		</button>
	)
}

export interface ButtonGroupProps {
	children: JSX.Element
	class?: string
	vertical?: boolean
}

export function ButtonGroup(props: ButtonGroupProps) {
	return (
		<div class={cn("inline-flex gap-2", props.vertical ? "flex-col" : "flex-row", props.class)}>
			{props.children}
		</div>
	)
}
