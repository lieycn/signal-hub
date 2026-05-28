# Modal Component

A flexible modal component built with Tailwind CSS and SolidJS.

## Features

- ✨ Customizable sizes (sm, md, lg, xl, full)
- 🎯 Click outside to close (configurable)
- ⌨️ ESC key to close (configurable)
- 🎨 Clean, modern design with Tailwind CSS
- 📱 Fully responsive
- ♿ Accessible (keyboard navigation, focus management)
- 🎭 Portal rendering (renders outside component tree)

## Usage

### Basic Usage

```tsx
import { createSignal } from "solid-js"
import { Modal } from "@/components/widgets"

function Example() {
	const [isOpen, setIsOpen] = createSignal(false)

	return (
		<>
			<button onClick={() => setIsOpen(true)}>Open Modal</button>

			<Modal
				open={isOpen()}
				onClose={() => setIsOpen(false)}
				title="Modal Title"
				description="Optional description"
			>
				<p>Modal content goes here...</p>
			</Modal>
		</>
	)
}
```

### With Actions

```tsx
import { Modal, ModalActions } from "@/components/widgets"

;<Modal open={isOpen()} onClose={() => setIsOpen(false)} title="Confirm Action">
	<p>Are you sure?</p>

	<ModalActions
		actions={[
			{ label: "Cancel", variant: "secondary", onClick: () => setIsOpen(false) },
			{ label: "Confirm", variant: "primary", onClick: handleConfirm },
		]}
	/>
</Modal>
```

### Custom Footer

```tsx
<Modal
	open={isOpen()}
	onClose={() => setIsOpen(false)}
	title="Custom Footer"
	footer={
		<>
			<button onClick={handleCustomAction}>Custom Action</button>
		</>
	}
>
	<p>Content...</p>
</Modal>
```

### With Custom Classes

```tsx
<Modal
	open={isOpen()}
	onClose={() => setIsOpen(false)}
	title="Custom Styled Modal"
	class="border-2 border-primary"
	size="lg"
>
	<p>Content with custom modal styles...</p>

	<ModalActions
		actions={[
			{
				label: "Custom Button",
				variant: "primary",
				class="bg-green-500 hover:bg-green-600",
				onClick: handleCustom,
			},
		]}
	/>
</Modal>
```

## Props

### Modal Props

| Prop                  | Type                                     | Default      | Description                  |
| --------------------- | ---------------------------------------- | ------------ | ---------------------------- |
| `open`                | `boolean`                                | **required** | Controls modal visibility    |
| `onClose`             | `() => void`                             | -            | Callback when modal closes   |
| `title`               | `string`                                 | -            | Modal title                  |
| `description`         | `string`                                 | -            | Modal description (subtitle) |
| `children`            | `JSX.Element`                            | -            | Modal content                |
| `footer`              | `JSX.Element`                            | -            | Custom footer content        |
| `size`                | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"`       | Modal max-width              |
| `showCloseButton`     | `boolean`                                | `true`       | Show close button in header  |
| `closeOnOverlayClick` | `boolean`                                | `true`       | Close when clicking overlay  |
| `closeOnEscape`       | `boolean`                                | `true`       | Close when pressing ESC      |
| `class`               | `string`                                 | -            | Additional CSS classes       |

### ModalAction Props

| Prop       | Type                                              | Default       | Description            |
| ---------- | ------------------------------------------------- | ------------- | ---------------------- |
| `label`    | `string`                                          | **required**  | Button text            |
| `variant`  | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"secondary"` | Button style           |
| `onClick`  | `() => void`                                      | -             | Click handler          |
| `disabled` | `boolean`                                         | `false`       | Button disabled state  |
| `class`    | `string`                                          | -             | Additional CSS classes |

## Size Options

- `sm`: `max-width: 28rem` (448px)
- `md`: `max-width: 32rem` (512px)
- `lg`: `max-width: 42rem` (672px)
- `xl`: `max-width: 56rem` (896px)
- `full`: `max-width: 72rem` (1152px)

## Button Variants

- `primary`: Primary brand color
- `secondary`: White with border
- `danger`: Red for destructive actions
- `ghost`: Transparent with hover effect
