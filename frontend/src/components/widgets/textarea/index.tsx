import { Show, type JSX } from "solid-js"

import { cn } from "@/libs/utils"

export interface TextareaProps {
	value?: string
	onInput?: (value: string) => void
	onChange?: (value: string) => void
	placeholder?: string
	disabled?: boolean
	readonly?: boolean
	required?: boolean
	label?: string
	description?: string
	error?: string
	success?: string
	size?: "sm" | "md" | "lg"
	variant?: "default" | "filled" | "outlined"
	class?: string
	ref?: (element: HTMLTextAreaElement) => void
	name?: string
	id?: string
	minLength?: number
	maxLength?: number
	pattern?: string
	rows?: number
	resize?: "none" | "vertical" | "horizontal" | "both"
}

const sizeClasses = {
	sm: {
		textarea: "px-3 py-1.5 text-sm",
		label: "text-xs",
		description: "text-xs",
	},
	md: {
		textarea: "px-4 py-2 text-sm",
		label: "text-sm",
		description: "text-sm",
	},
	lg: {
		textarea: "px-4 py-3 text-base",
		label: "text-base",
		description: "text-base",
	},
}

const variantClasses = {
	default:
		"bg-white border-zinc-200 focus:border-primary focus:ring-primary/20 focus:bg-white",
	filled: "bg-zinc-50 border-transparent focus:bg-white focus:border-primary focus:ring-primary/20",
	outlined:
		"bg-transparent border-zinc-300 focus:border-primary focus:ring-primary/20 focus:bg-transparent",
}

const resizeClasses = {
	none: "resize-none",
	vertical: "resize-y",
	horizontal: "resize-x",
	both: "resize",
}

export function Textarea(props: TextareaProps) {
	const textareaId = () =>
		props.id || `textarea-${Math.random().toString(36).slice(2, 9)}`

	const size = () => props.size || "md"
	const variant = () => props.variant || "default"

	const hasError = () => !!props.error
	const hasSuccess = () => !!props.success && !hasError()

	const handleInput = (e: Event & { currentTarget: HTMLTextAreaElement }) => {
		const value = e.currentTarget.value
		props.onInput?.(value)
	}

	const handleChange = (e: Event & { currentTarget: HTMLTextAreaElement }) => {
		const value = e.currentTarget.value
		props.onChange?.(value)
	}

	return (
		<div class={cn("flex flex-col gap-1.5", props.class)}>
			{/* Label */}
			<Show when={props.label}>
				<label
					for={textareaId()}
					class={cn(
						"font-medium text-zinc-700",
						sizeClasses[size()].label,
						props.required && "after:content-['*'] after:ml-0.5 after:text-red-500"
					)}
				>
					{props.label}
				</label>
			</Show>

			{/* Textarea */}
			<textarea
				id={textareaId()}
				ref={props.ref}
				value={props.value ?? ""}
				onInput={handleInput}
				onChange={handleChange}
				placeholder={props.placeholder}
				disabled={props.disabled}
				readonly={props.readonly}
				required={props.required}
				name={props.name}
				rows={props.rows || 4}
				minLength={props.minLength}
				maxLength={props.maxLength}
				pattern={props.pattern}
				class={cn(
					"flex-1 w-full border rounded-xl transition-all duration-200 placeholder:text-zinc-400",
					"focus:outline-none focus:ring-4",
					"disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50",
					"readonly:cursor-default readonly:bg-zinc-50",
					sizeClasses[size()].textarea,
					hasError() && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
					hasSuccess() && "border-green-500 focus:border-green-500 focus:ring-green-500/20",
					variantClasses[variant()],
					resizeClasses[props.resize || "vertical"]
				)}
			/>

			{/* Description / Error / Success */}
			<Show when={props.description || props.error || props.success}>
				<div class={cn("flex items-start gap-1.5", sizeClasses[size()].description)}>
					{/* Icon */}
					<Show when={props.error || props.success}>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class={cn(
								"mt-0.5 shrink-0",
								hasError() && "text-red-500",
								hasSuccess() && "text-green-500"
							)}
						>
							<Show when={hasError()}>
								<path d="M10 10l4 4m0-4l-4 4" />
								<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
							</Show>
							<Show when={hasSuccess()}>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</Show>
						</svg>
					</Show>

					{/* Text */}
					<span
						class={cn(
							hasError() && "text-red-500",
							hasSuccess() && "text-green-500",
							!hasError() && !hasSuccess() && "text-zinc-500"
						)}
					>
						{props.error || props.success || props.description}
					</span>
				</div>
			</Show>
		</div>
	)
}
