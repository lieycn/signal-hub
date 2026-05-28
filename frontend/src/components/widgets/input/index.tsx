import { Show, type JSX } from "solid-js"

import { cn } from "@/libs/utils"

export interface InputProps {
	type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search"
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
	leftIcon?: JSX.Element
	rightIcon?: JSX.Element
	rightIconClickable?: boolean
	onRightIconClick?: () => void
	size?: "sm" | "md" | "lg"
	variant?: "default" | "filled" | "outlined"
	shape?: "default" | "rounded" | "square"
	class?: string
	ref?: (element: HTMLInputElement) => void
	name?: string
	id?: string
	minLength?: number
	maxLength?: number
	min?: number
	max?: number
	step?: number
	pattern?: string
}

const sizeModifiers = {
	sm: "input_sm",
	md: "input_md",
	lg: "input_lg",
}

const variantModifiers = {
	default: "input_default",
	filled: "input_filled",
	outlined: "input_outlined",
}

const shapeModifiers = {
	default: "",
	rounded: "input_rounded",
	square: "input_square",
}

const labelSizeModifiers = {
	sm: "input_label_sm",
	md: "input_label_md",
	lg: "input_label_lg",
}

const iconSizeModifiers = {
	sm: "input_icon_sm",
	md: "input_icon_md",
	lg: "input_icon_lg",
}

const descriptionSizeModifiers = {
	sm: "input_description_sm",
	md: "input_description_md",
	lg: "input_description_lg",
}

export function Input(props: InputProps) {
	const inputId = () => props.id || `input-${Math.random().toString(36).slice(2, 9)}`

	const size = () => props.size || "md"
	const variant = () => props.variant || "default"
	const shape = () => props.shape || "default"

	const hasError = () => !!props.error
	const hasSuccess = () => !!props.success && !hasError()

	const handleInput = (e: Event & { currentTarget: HTMLInputElement }) => {
		const value = e.currentTarget.value
		props.onInput?.(value)
	}

	const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
		const value = e.currentTarget.value
		props.onChange?.(value)
	}

	const getInputClasses = () => {
		return cn(
			"input",
			sizeModifiers[size()],
			variantModifiers[variant()],
			shapeModifiers[shape()],
			props.leftIcon && size() === "sm" && "input_with_left_icon_sm",
			props.leftIcon && size() === "md" && "input_with_left_icon",
			props.leftIcon && size() === "lg" && "input_with_left_icon_lg",
			(props.rightIcon || props.rightIconClickable) && size() === "sm" && "input_with_right_icon_sm",
			(props.rightIcon || props.rightIconClickable) && size() === "md" && "input_with_right_icon",
			(props.rightIcon || props.rightIconClickable) && size() === "lg" && "input_with_right_icon_lg",
			hasError() && "input_error",
			hasSuccess() && "input_success",
		)
	}

	const getLabelClasses = () => {
		return cn(
			"input_label",
			props.required && "input_label_required",
			labelSizeModifiers[size()],
		)
	}

	const getIconClasses = (position: "left" | "right") => {
		return cn(
			"input_icon",
			position === "left" ? "input_icon_left" : "input_icon_right",
			iconSizeModifiers[size()],
		)
	}

	const getDescriptionClasses = () => {
		return cn(
			"input_description",
			descriptionSizeModifiers[size()],
			hasError() && "input_description_error",
			hasSuccess() && "input_description_success",
		)
	}

	return (
		<div class={cn("input_group", props.class)}>
			{/* Label */}
			<Show when={props.label}>
				<label for={inputId()} class={getLabelClasses()}>
					{props.label}
				</label>
			</Show>

			{/* Input Wrapper */}
			<div class="input_wrapper">
				{/* Left Icon */}
				<Show when={props.leftIcon}>
					<div class={getIconClasses("left")}>{props.leftIcon}</div>
				</Show>

				{/* Input */}
				<input
					id={inputId()}
					ref={props.ref}
					type={props.type || "text"}
					value={props.value ?? ""}
					onInput={handleInput}
					onChange={handleChange}
					placeholder={props.placeholder}
					disabled={props.disabled}
					readonly={props.readonly}
					required={props.required}
					name={props.name}
					minLength={props.minLength}
					maxLength={props.maxLength}
					min={props.min}
					max={props.max}
					step={props.step}
					pattern={props.pattern}
					class={getInputClasses()}
				/>

				{/* Right Icon */}
				<Show when={props.rightIcon || props.rightIconClickable}>
					<div
						class={getIconClasses("right")}
						classList={{ "cursor-pointer": props.rightIconClickable }}
						onClick={props.onRightIconClick}
					>
						{props.rightIcon}
					</div>
				</Show>
			</div>

			{/* Description / Error / Success */}
			<Show when={props.description || props.error || props.success}>
				<div class={getDescriptionClasses()}>
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
								"shrink-0",
								hasError() && "text-red-500",
								hasSuccess() && "text-green-500",
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
					<span>{props.error || props.success || props.description}</span>
				</div>
			</Show>
		</div>
	)
}
