import { cn } from "@/libs/utils"

export interface CheckboxProps {
	checked?: boolean
	defaultChecked?: boolean
	disabled?: boolean
	id?: string
	name?: string
	value?: string
	class?: string
	label?: string
	labelClass?: string
	onChange?: (checked: boolean) => void
	onBlur?: (e: FocusEvent) => void
	required?: boolean
}

export function Checkbox(props: CheckboxProps) {
	const handleChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		props.onChange?.(target.checked)
	}

	const handleBlur = (e: FocusEvent) => {
		props.onBlur?.(e)
	}

	return (
		<label
			class={cn(
				"inline-flex items-center gap-2 cursor-pointer bg-white",
				props.disabled && "cursor-not-allowed opacity-50",
				props.class,
			)}
		>
			<input
				type="checkbox"
				id={props.id}
				name={props.name}
				value={props.value}
				checked={props.checked}
				disabled={props.disabled}
				required={props.required}
				onChange={handleChange}
				onBlur={handleBlur}
				class="checkbox"
			/>
			{props.label && <span class={cn("text-sm", props.labelClass)}>{props.label}</span>}
		</label>
	)
}
