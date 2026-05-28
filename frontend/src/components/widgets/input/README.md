# Input Component

A flexible input component built with Tailwind CSS and SolidJS, using CSS component classes for better maintainability and consistency.

## Features

- ✨ Multiple size options (sm, md, lg)
- 🎨 Three variants (default, filled, outlined)
- 🔷 Shape options (default, rounded, square)
- 🎯 Enhanced icon support (left, right, clickable)
- ✔️ Built-in validation states (error, success)
- ♿ Accessible (labels, ARIA attributes)
- 🔒 Full keyboard support
- 🎨 Tailwind CSS component classes for consistent styling

## Architecture

The component uses Tailwind CSS component classes defined in `style.css` following the button component pattern:

```css
/* Component classes in style.css */
.input              { /* Base input styles */ }
.input_sm           { /* Small size modifier */ }
.input_lg           { /* Large size modifier */ }
.input_default      { /* Default variant */ }
.input_filled       { /* Filled variant */ }
.input_outlined     { /* Outlined variant */ }
.input_rounded      { /* Rounded shape */ }
.input_square       { /* Square shape */ }
.input_error        { /* Error state */ }
.input_success      { /* Success state */ }
.input_icon_left    { /* Left icon positioning */ }
.input_icon_right   { /* Right icon positioning */ }
```

## Usage

### Basic Input

```tsx
import { Input } from "@/components/widgets"
import { createSignal } from "solid-js"

function Example() {
  const [value, setValue] = createSignal("")

  return (
    <Input
      label="用户名"
      placeholder="请输入用户名"
      value={value()}
      onInput={setValue}
    />
  )
}
```

### With Validation

```tsx
const [email, setEmail] = createSignal("")
const [error, setError] = createSignal("")

<Input
  label="邮箱地址"
  type="email"
  placeholder="example@email.com"
  value={email()}
  onInput={(value) => {
    setEmail(value)
    if (!value) setError("请输入邮箱")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("邮箱格式不正确")
    } else setError("")
  }}
  error={error()}
  required
/>
```

### With Icons

```tsx
// Left icon only
<Input
  label="搜索"
  type="search"
  placeholder="搜索内容..."
  leftIcon={<SearchIcon />}
/>

// Right clickable icon
<Input
  label="密码"
  type="password"
  placeholder="请输入密码"
  rightIcon={<EyeIcon />}
  rightIconClickable
  onRightIconClick={() => setShowPassword(!showPassword())}
/>

// Both icons
<Input
  label="用户名"
  placeholder="请输入用户名"
  leftIcon={<UserIcon />}
  rightIcon={<CloseIcon />}
  rightIconClickable={!!value()}
  onRightIconClick={() => setValue("")}
/>
```

### With Shape

```tsx
// Fully rounded
<Input
  label="圆形输入框"
  shape="rounded"
  placeholder="Pill-shaped input"
/>

// Square corners
<Input
  label="方形输入框"
  shape="square"
  placeholder="Square corners"
/>
```

### With Size and Variant

```tsx
<Input
  size="sm"
  variant="filled"
  label="小尺寸填充风格"
  placeholder="Small filled input"
/>

<Input
  size="lg"
  variant="outlined"
  shape="rounded"
  label="大尺寸轮廓圆形"
  placeholder="Large outlined rounded"
/>
```

## CSS Component Classes

The component uses the following CSS classes defined in `style.css`:

### Base Classes

| Class | Description |
|-------|-------------|
| `.input` | Base input styles with default sizing and spacing |
| `.input_wrapper` | Wrapper for positioning icons |
| `.input_icon` | Base icon positioning |
| `.input_label` | Label styling with required indicator |
| `.input_description` | Helper text below input |
| `.input_group` | Container for label + input + description |

### Size Modifiers

| Class | Size |
|-------|------|
| `.input_sm` | Small input (reduced padding) |
| `.input_md` | Medium input (default) |
| `.input_lg` | Large input (increased padding) |

### Shape Modifiers

| Class | Shape |
|-------|-------|
| *(default)* | Rounded corners (default) |
| `.input_rounded` | Fully rounded/pill shape |
| `.input_square` | Square corners |

### Variant Modifiers

| Class | Style |
|-------|-------|
| `.input_default` | White background with subtle border |
| `.input_filled` | Gray filled background |
| `.input_outlined` | Transparent with outlined border |

### State Modifiers

| Class | State |
|-------|-------|
| `.input_error` | Error state (red border) |
| `.input_success` | Success state (green border) |
| `.input_with_left_icon` | Adjust padding for left icon |
| `.input_with_left_icon_sm` | Small left icon padding |
| `.input_with_left_icon_lg` | Large left icon padding |
| `.input_with_right_icon` | Adjust padding for right icon |
| `.input_with_right_icon_sm` | Small right icon padding |
| `.input_with_right_icon_lg` | Large right icon padding |

## Props

| Prop                  | Type                                              | Default       | Description                        |
| --------------------- | ------------------------------------------------- | ------------- | ---------------------------------- |
| `type`                | `"text" \| "password" \| "email" \| ...`          | `"text"`      | Input type                         |
| `value`               | `string`                                          | -             | Input value                        |
| `onInput`             | `(value: string) => void`                         | -             | Input callback (real-time)         |
| `onChange`            | `(value: string) => void`                         | -             | Change callback (on blur)          |
| `placeholder`         | `string`                                          | -             | Placeholder text                   |
| `disabled`            | `boolean`                                         | `false`       | Disabled state                     |
| `readonly`            | `boolean`                                         | `false`       | Readonly state                     |
| `required`            | `boolean`                                         | `false`       | Required field (shows `*`)         |
| `label`               | `string`                                          | -             | Field label                        |
| `description`         | `string`                                          | -             | Helper text below input            |
| `error`               | `string`                                          | -             | Error message (shows error state)  |
| `success`             | `string`                                          | -             | Success message (shows success)    |
| `leftIcon`            | `JSX.Element`                                     | -             | Icon on the left                   |
| `rightIcon`           | `JSX.Element`                                     | -             | Icon on the right                  |
| `rightIconClickable`  | `boolean`                                         | `false`       | Make right icon clickable          |
| `onRightIconClick`    | `() => void`                                      | -             | Right icon click handler           |
| `size`                | `"sm" \| "md" \| "lg"`                            | `"md"`        | Input size                         |
| `variant`             | `"default" \| "filled" \| "outlined"`             | `"default"`   | Visual style                       |
| `shape`               | `"default" \| "rounded" \| "square"`              | `"default"`   | Input shape                        |
| `class`               | `string`                                          | -             | Additional CSS classes             |
| `name`                | `string`                                          | -             | Form field name                    |
| `id`                  | `string`                                          | auto-generated | Input ID (for label)              |
| `minLength`           | `number`                                          | -             | Minimum length                     |
| `maxLength`           | `number`                                          | -             | Maximum length                     |
| `min`                 | `number`                                          | -             | Minimum value (for number type)    |
| `max`                 | `number`                                          | -             | Maximum value (for number type)    |
| `step`                | `number`                                          | -             | Step value (for number type)       |

## Size Options

| Size  | Input Class | Text Size | Label Class | Icon Class |
| ----- | ----------- | --------- | ----------- | ---------- |
| `sm`  | `.input_sm` | `text-sm` | `.input_label_sm` | `.input_icon_sm` |
| `md`  | `.input_md` | `text-sm` | `.input_label_md` | `.input_icon_md` |
| `lg`  | `.input_lg` | `text-base`| `.input_label_lg` | `.input_icon_lg`|

## Shape Options

| Shape | Class | Border Radius |
|-------|-------|--------------|
| `default` | *(base)* | `rounded-xl` (12px) |
| `rounded` | `.input_rounded` | `rounded-full` (pill) |
| `square` | `.input_square` | `rounded-lg` (8px) |

## Variant Styles

| Variant   | CSS Class | Background | Border | Focus Background |
| --------- | --------- | ---------- | ------ | --------------- |
| `default` | `.input_default` | White | `zinc-200` | White |
| `filled`  | `.input_filled` | `zinc-50` | Transparent | White |
| `outlined`| `.input_outlined`| Transparent| `zinc-300` | Transparent |

## Validation States

### Error State

```tsx
<Input
  label="邮箱"
  error="邮箱格式不正确"
  // Applies .input_error class
  // Shows red border and error icon
/>
```

### Success State

```tsx
<Input
  label="用户名"
  success="用户名可用"
  // Applies .input_success class
  // Shows green border and success icon
/>
```

## Examples

### Search Input with Icon

```tsx
<Input
  type="search"
  placeholder="搜索..."
  leftIcon={<SearchIcon />}
  variant="filled"
/>
```

### Password Input with Toggle

```tsx
const [showPassword, setShowPassword] = createSignal(false)

<Input
  type={showPassword() ? "text" : "password"}
  label="密码"
  placeholder="••••••••"
  rightIcon={showPassword() ? <EyeOffIcon /> : <EyeIcon />}
  rightIconClickable
  onRightIconClick={() => setShowPassword(!showPassword())}
/>
```

### Username with Clear Button

```tsx
const [username, setUsername] = createSignal("")

<Input
  label="用户名"
  placeholder="请输入用户名"
  value={username()}
  onInput={setUsername}
  leftIcon={<UserIcon />}
  rightIcon={<CloseIcon />}
  rightIconClickable={!!username()}
  onRightIconClick={() => setUsername("")}
/>
```

### URL Input with Enhanced Styling

```tsx
<Input
  type="url"
  label="网址"
  placeholder="https://example.com"
  variant="outlined"
  shape="rounded"
  leftIcon={<GlobeIcon />}
/>
```

### Number Input with Constraints

```tsx
<Input
  type="number"
  label="数量"
  placeholder="0"
  min={0}
  max={100}
  step={1}
  size="lg"
/>
```

### Disabled Input

```tsx
<Input
  label="用户ID"
  value="123456"
  disabled
  description="用户ID由系统自动生成，无法修改"
/>
```

### Readonly Input

```tsx
<Input
  label="用户名"
  value="admin"
  readonly
  description="用户名不可修改"
/>
```

## Icon System

The component provides flexible icon support:

### Left Icons
- Automatically positioned with proper spacing
- Size-adjusted based on input size
- Non-interactive (pointer events disabled)

### Right Icons
- Positioned with proper spacing
- Can be made clickable with `rightIconClickable`
- Includes hover states
- Often used for actions (clear, toggle visibility, etc.)

### Icon Size Adjustment
Icons automatically scale based on input size:
- Small inputs: 16px icons
- Medium inputs: 20px icons
- Large inputs: 20px icons

## Migration from Inline Classes

If you're migrating from the previous inline class approach:

**Before:**
```tsx
class="w-full border rounded-xl px-4 py-2 text-sm bg-white border-zinc-200"
```

**After:**
```tsx
// Uses predefined CSS component class
class="input input_md"
```

The component automatically applies the appropriate CSS classes based on props, reducing the need for inline Tailwind classes and ensuring consistency across your application.

## Design System Integration

The input component follows the same design patterns as other components:

- **Color System**: Uses `primary`, `zinc-*`, `red-500`, `green-500` from your theme
- **Spacing**: Consistent with button and other form components
- **Typography**: Scales with size modifiers
- **States**: Follows accessibility guidelines for focus, error, success states
- **Responsive**: Works with mobile and desktop layouts
