import { cn } from "@/libs/utils"

export interface SwitchProps {
	checked?: boolean
	defaultChecked?: boolean
	disabled?: boolean
	size?: "sm" | "md" | "lg"
	color?: "primary" | "success" | "danger" | "warning"
	class?: string
	id?: string
	name?: string
	onChange?: (checked: boolean) => void
	onBlur?: (e: FocusEvent) => void
	label?: string
	labelClass?: string
	description?: string
	readonly?: boolean
}

const sizeClasses = {
	sm: "switch-sm",
	md: "switch-md",
	lg: "switch-lg",
}

const colorClasses = {
	primary: "switch-primary",
	success: "switch-success",
	danger: "switch-danger",
	warning: "switch-warning",
}

export function Switch(props: SwitchProps) {
	const handleChange = (e: Event & { currentTarget: HTMLInputElement }) => {
		const checked = e.currentTarget.checked
		props.onChange?.(checked)
	}

	const handleBlur = (e: FocusEvent) => {
		props.onBlur?.(e)
	}

	const getSwitchClasses = () => {
		return cn(
			"switch",
			sizeClasses[props.size || "md"],
			props.color && colorClasses[props.color],
			props.class,
		)
	}

	return (
		<>
			{props.label || props.description ? (
				<div
					class={cn("flex flex-col gap-1.5", props.label && props.description && "gap-2")}
				>
					<div class="flex items-center gap-2">
						<label
							class={getSwitchClasses()}
							style={props.checked !== undefined ? {} : { display: "contents" }}
						>
							<input
								type="checkbox"
								id={props.id}
								name={props.name}
								checked={props.checked}
								disabled={props.disabled}
								readonly={props.readonly}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<span class="slider" />
						</label>
						{props.label && (
							<span class="text-sm font-medium text-zinc-700">{props.label}</span>
						)}
					</div>
					{props.description && <p class="text-sm text-zinc-500">{props.description}</p>}
				</div>
			) : (
				<label class={getSwitchClasses()}>
					<input
						type="checkbox"
						id={props.id}
						name={props.name}
						checked={props.checked}
						disabled={props.disabled}
						readonly={props.readonly}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<span class="slider" />
				</label>
			)}
		</>
	)
}
