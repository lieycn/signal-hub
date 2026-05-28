import { createSignal } from "solid-js"

import { Checkbox } from "./"

export function CheckboxExample() {
	const [checked, setChecked] = createSignal(false)
	const [disabledChecked, setDisabledChecked] = createSignal(true)

	return (
		<div class="flex flex-col gap-4 p-4">
			<div>
				<h3 class="text-lg font-semibold mb-2">Checkbox Examples</h3>
			</div>

			{/* Basic checkbox */}
			<Checkbox
				label="Accept terms and conditions"
				checked={checked()}
				onChange={setChecked}
			/>

			{/* Uncontrolled checkbox with defaultChecked */}
			<Checkbox
				label="Subscribe to newsletter"
				defaultChecked={false}
			/>

			{/* Disabled checkbox */}
			<Checkbox
				label="Disabled option"
				checked={disabledChecked()}
				onChange={setDisabledChecked}
				disabled
			/>

			{/* Required checkbox */}
			<Checkbox
				label="Required field"
				required
			/>

			{/* Custom styled checkbox */}
			<Checkbox
				label="Custom styled checkbox"
				labelClass="text-primary font-semibold"
				class="gap-3"
			/>

			{/* Checkbox without label */}
			<Checkbox />

			<div class="mt-4 p-3 bg-slate-100 rounded">
				<p class="text-sm">
					<strong>Current state:</strong> First checkbox is {checked() ? "checked" : "unchecked"}
				</p>
			</div>
		</div>
	)
}
