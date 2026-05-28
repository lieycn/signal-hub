# Input Component

A flexible input component built with Tailwind CSS and SolidJS.

## Features

- ✨ Multiple size options (sm, md, lg)
- 🎨 Three variants (default, filled, outlined)
- ✔️ Built-in validation states (error, success)
- 🎯 Support for icons (left, right)
- ♿ Accessible (labels, ARIA attributes)
- 🔒 Full keyboard support

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
<Input
  label="搜索"
  type="search"
  placeholder="搜索内容..."
  leftIcon={<SearchIcon />}
  rightIcon={<CloseIcon />}
  rightIconClickable
  onRightIconClick={() => setValue("")}
/>
```

### Password Input with Toggle

```tsx
const [showPassword, setShowPassword] = createSignal(false)

<Input
  type={showPassword() ? "text" : "password"}
  label="密码"
  placeholder="••••••••"
  rightIcon={
    showPassword() ? <EyeOffIcon /> : <EyeIcon />
  }
  rightIconClickable
  onRightIconClick={() => setShowPassword(!showPassword())}
/>
```

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
| `class`               | `string`                                          | -             | Additional CSS classes             |
| `name`                | `string`                                          | -             | Form field name                    |
| `id`                  | `string`                                          | auto-generated | Input ID (for label)              |
| `minLength`           | `number`                                          | -             | Minimum length                     |
| `maxLength`           | `number`                                          | -             | Maximum length                     |
| `min`                 | `number`                                          | -             | Minimum value (for number type)    |
| `max`                 | `number`                                          | -             | Maximum value (for number type)    |
| `step`                | `number`                                          | -             | Step value (for number type)       |

## Size Options

| Size  | Input Padding | Text Size | Label Size | Icon Size |
| ----- | ------------- | --------- | ---------- | --------- |
| `sm`  | `px-3 py-1.5`  | `text-sm` | `text-xs`  | `size-4`  |
| `md`  | `px-4 py-2`    | `text-sm` | `text-sm`  | `size-5`  |
| `lg`  | `px-4 py-3`    | `text-base`| `text-base`| `size-5`|

## Variant Styles

| Variant   | Background | Border        | Focus Background |
| --------- | ---------- | ------------- | --------------- |
| `default` | White      | `zinc-200`    | White           |
| `filled`  | `zinc-50`  | Transparent  | White           |
| `outlined`| Transparent| `zinc-300`    | Transparent    |

## Validation States

### Error State

```tsx
<Input
  label="邮箱"
  error="邮箱格式不正确"
  // Shows red border and error icon
/>
```

### Success State

```tsx
<Input
  label="用户名"
  success="用户名可用"
  // Shows green border and success icon
/>
```

## Examples

### Search Input

```tsx
<Input
  type="search"
  placeholder="搜索..."
  leftIcon={<SearchIcon />}
  variant="filled"
/>
```

### Number Input

```tsx
<Input
  type="number"
  label="数量"
  placeholder="0"
  min={0}
  max={100}
  step={1}
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
