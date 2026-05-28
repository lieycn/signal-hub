# Textarea Component

A flexible textarea component built with Tailwind CSS and SolidJS.

## Features

- ✨ Multiple size options (sm, md, lg)
- 🎨 Three variants (default, filled, outlined)
- ✔️ Built-in validation states (error, success)
- 📐 Adjustable resize behavior
- ♿ Accessible (labels, ARIA attributes)
- 🔒 Full keyboard support

## Usage

### Basic Textarea

```tsx
import { Textarea } from "@/components/widgets"
import { createSignal } from "solid-js"

function Example() {
  const [value, setValue] = createSignal("")

  return (
    <Textarea
      label="留言"
      placeholder="请输入您的留言..."
      value={value()}
      onInput={setValue}
      rows={6}
    />
  )
}
```

### With Validation

```tsx
const [message, setMessage] = createSignal("")
const [error, setError] = createSignal("")

<Textarea
  label="留言内容"
  placeholder="请输入您的留言..."
  value={message()}
  onInput={(value) => {
    setMessage(value)
    if (value.length < 10) {
      setError("留言内容至少需要10个字符")
    } else {
      setError("")
    }
  }}
  error={error()}
  minLength={10}
  rows={5}
/>
```

### With Character Limit

```tsx
const [bio, setBio] = createSignal("")
const maxLength = 200

<Textarea
  label="个人简介"
  placeholder="介绍一下你自己..."
  value={bio()}
  onInput={setBio}
  description={`${bio().length}/${maxLength} 字符`}
  maxLength={maxLength}
  rows={4}
/>
```

### Custom Resize

```tsx
<Textarea
  label="详细描述"
  placeholder="请输入详细描述..."
  resize="horizontal"
  rows={4}
/>
```

### No Resize

```tsx
<Textarea
  label="固定大小文本框"
  placeholder="无法调整大小..."
  resize="none"
  rows={6}
/>
```

## Props

| Prop          | Type                                              | Default       | Description                        |
| ------------- | ------------------------------------------------- | ------------- | ---------------------------------- |
| `value`       | `string`                                          | -             | Textarea value                     |
| `onInput`     | `(value: string) => void`                         | -             | Input callback (real-time)         |
| `onChange`    | `(value: string) => void`                         | -             | Change callback (on blur)          |
| `placeholder` | `string`                                          | -             | Placeholder text                   |
| `disabled`    | `boolean`                                         | `false`       | Disabled state                     |
| `readonly`    | `boolean`                                         | `false`       | Readonly state                     |
| `required`    | `boolean`                                         | `false`       | Required field (shows `*`)         |
| `label`       | `string`                                          | -             | Field label                        |
| `description` | `string`                                          | -             | Helper text below textarea         |
| `error`       | `string`                                          | -             | Error message (shows error state)  |
| `success`     | `string`                                          | -             | Success message (shows success)    |
| `size`        | `"sm" \| "md" \| "lg"`                            | `"md"`        | Textarea size                      |
| `variant`     | `"default" \| "filled" \| "outlined"`             | `"default"`   | Visual style                       |
| `class`       | `string`                                          | -             | Additional CSS classes             |
| `name`        | `string`                                          | -             | Form field name                    |
| `id`          | `string`                                          | auto-generated | Textarea ID (for label)           |
| `minLength`   | `number`                                          | -             | Minimum length                     |
| `maxLength`   | `number`                                          | -             | Maximum length                     |
| `rows`        | `number`                                          | `4`           | Number of visible rows              |
| `resize`      | `"none" \| "vertical" \| "horizontal" \| "both"`  | `"vertical"`  | Resize behavior                    |

## Size Options

| Size  | Textarea Padding | Text Size | Label Size |
| ----- | --------------- | --------- | ---------- |
| `sm`  | `px-3 py-1.5`    | `text-sm` | `text-xs`  |
| `md`  | `px-4 py-2`      | `text-sm` | `text-sm`  |
| `lg`  | `px-4 py-3`      | `text-base`| `text-base`|

## Variant Styles

| Variant   | Background | Border        | Focus Background |
| --------- | ---------- | ------------- | --------------- |
| `default` | White      | `zinc-200`    | White           |
| `filled`  | `zinc-50`  | Transparent  | White           |
| `outlined`| Transparent| `zinc-300`    | Transparent    |

## Resize Options

| Option      | Description                      |
| ----------- | -------------------------------- |
| `none`      | Disables all resizing            |
| `vertical`  | Allows vertical resize only       |
| `horizontal`| Allows horizontal resize only     |
| `both`      | Allows resizing in both directions|

## Validation States

### Error State

```tsx
<Textarea
  label="留言"
  error="留言内容不能为空"
  // Shows red border and error icon
/>
```

### Success State

```tsx
<Textarea
  label="留言"
  success="留言内容格式正确"
  // Shows green border and success icon
/>
```

## Examples

### Product Description

```tsx
<Textarea
  label="产品描述"
  placeholder="请详细描述产品特性..."
  variant="filled"
  rows={6}
/>
```

### Comment Box

```tsx
<Textarea
  label="评论"
  placeholder="写下你的评论..."
  description="请文明发言"
  variant="outlined"
  rows={4}
/>
```

### Bio Input

```tsx
<Textarea
  label="个人简介"
  placeholder="介绍一下你自己..."
  maxLength={200}
  description={`${bio().length}/200`}
  rows={4}
/>
```

### Disabled Textarea

```tsx
<Textarea
  label="系统日志"
  value="System initialized..."
  disabled
  rows={8}
  description="日志内容无法修改"
/>
```

### Readonly Textarea

```tsx
<Textarea
  label="生成内容"
  value={generatedContent()}
  readonly
  rows={6}
  description="此内容由 AI 自动生成"
/>
```
