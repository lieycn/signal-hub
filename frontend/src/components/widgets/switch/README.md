# Switch Component

A flexible switch/toggle component built with Tailwind CSS and SolidJS, following the CSS component architecture pattern.

## Features

- ✨ Multiple size options (sm, md, lg)
- 🎨 Multiple color variants (primary, success, danger, warning)
- 🎯 Controlled and uncontrolled modes
- ♿ Full accessibility support
- 🔒 Disabled and readonly states
- 📝 Optional labels and descriptions
- 🎨 Tailwind CSS component classes for consistency

## Architecture

The component uses Tailwind CSS component classes defined in `style.css`:

```css
.switch              { /* Base switch styles */ }
.switch_sm          { /* Small size variant */ }
.switch_md          { /* Medium size variant */ }
.switch_lg          { /* Large size variant */ }
.switch_primary     { /* Primary color variant */ }
.switch_success     { /* Success color variant */ }
.switch_danger      { /* Danger color variant */ }
.switch_warning     { /* Warning color variant */ }
```

## Usage

### Basic Switch

```tsx
import { Switch } from "@/components/widgets"
import { createSignal } from "solid-js"

function Example() {
  const [enabled, setEnabled] = createSignal(false)

  return <Switch checked={enabled()} onChange={setEnabled} label="Enable feature" />
}
```

### With Colors

```tsx
<Switch color="primary" label="Primary color" />
<Switch color="success" label="Success state" />
<Switch color="danger" label="Danger action" />
<Switch color="warning" label="Warning alert" />
```

### With Sizes

```tsx
<Switch size="sm" label="Small switch" />
<Switch size="md" label="Medium switch" />
<Switch size="lg" label="Large switch" />
```

### With Description

```tsx
<Switch
  checked={notifications()}
  onChange={setNotifications}
  label="Push notifications"
  description="Receive system notifications for new messages"
/>
```

### States

```tsx
// Disabled
<Switch checked={true} disabled label="Disabled switch" />

// Readonly
<Switch checked={true} readonly label="Readonly switch" />

// Uncontrolled
<Switch defaultChecked={true} label="Uncontrolled" />
```

## CSS Component Classes

The component uses the following CSS classes defined in `style.css`:

### Size Classes

| Class | Width | Height | Thumb Size | Transform |
|------|-------|--------|------------|-----------|
| `.switch_sm` | 36px | 20px | 14px | translateX(16px) |
| `.switch_md` | 44px | 24px | 18px | translateX(20px) |
| `.switch_lg` | 56px | 28px | 22px | translateX(24px) |

### Color Classes

| Class | Active Color |
|------|-------------|
| `.switch_primary` | `--color-primary` (#333) |
| `.switch_success` | green-500 |
| `.switch_danger` | red-500 |
| `.switch_warning` | orange-500 |

## Props

| Prop | Type | Default | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | - | Uncontrolled initial checked state |
| `disabled` | `boolean` | `false` | Disable the switch |
| `readonly` | `boolean` | `false` | Make switch read-only |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Switch size |
| `color` | `"primary" \| "success" \| "danger" \| "warning"` | - | Switch color theme |
| `class` | `string` | - | Additional CSS classes |
| `id` | `string` | - | Input element ID |
| `name` | `string` | - | Input element name |
| `onChange` | `(checked: boolean) => void` | - | Change callback |
| `onBlur` | `(e: FocusEvent) => void` | - | Blur callback |
| `label` | `string` | - | Label text |
| `labelClass` | `string` | - | Additional label classes |
| `description` | `string` | - | Helper text below switch |

## Examples

### Form Integration

```tsx
<form>
  <div class="flex items-center justify-between">
    <label>Dark mode</label>
    <Switch name="darkMode" />
  </div>
  <div class="flex items-center justify-between">
    <label>Notifications</label>
    <Switch name="notifications" color="success" defaultChecked />
  </div>
</form>
```

### With Validation

```tsx
const [value, setValue] = createSignal(false)
const [error, setError] = createSignal("")

const handleChange = (checked: boolean) => {
  if (checked && !validate()) {
    setError("Cannot enable without validation")
    return
  }
  setError("")
  setValue(checked)
}

<Switch
  checked={value()}
  onChange={handleChange}
  label="Advanced features"
  description={error() || "Enable advanced features"}
/>
```

### Size Variants

```tsx
<div class="flex items-center gap-4">
  <Switch size="sm" checked={small} onChange={setSmall} />
  <Switch size="md" checked={medium} onChange={setMedium} />
  <Switch size="lg" checked={large} onChange={setLarge} />
</div>
```

### Color Themes

```tsx
<Switch color="primary" label="Primary action" />
<Switch color="success" label="Success state" />
<Switch color="danger" label="Danger action" />
<Switch color="warning" label="Warning alert" />
```

## Accessibility

The switch component includes:
- Proper `name` attribute for form submission
- `id` attribute for label association
- Keyboard navigation support
- Focus visible states
- Disabled state indication
- ARIA-friendly structure

## Design Integration

The switch component follows the same design patterns as other components:

- **Color System**: Uses theme colors and semantic colors
- **Spacing**: Consistent with other form components
- **States**: Proper focus, disabled, and readonly states
- **Accessibility**: Full keyboard and screen reader support
- **Responsive**: Works with mobile and desktop layouts
