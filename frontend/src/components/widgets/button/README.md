# Button Component

A flexible button component built with Tailwind CSS and SolidJS.

## Features

- ✨ Multiple variants (default, outline, primary)
- 📏 Multiple sizes (default, large)
- ⏳ Built-in loading state with spinner
- 🎯 Support for icons (left, right)
- 🔘 Different button types (button, submit, reset)
- 🚫 Disabled state support
- 👥 Button group support (horizontal/vertical)

## Usage

### Basic Button

```tsx
import { Button } from "@/components/widgets"

<Button>点击我</Button>
```

### With Variants

```tsx
<Button variant="default">默认按钮</Button>
<Button variant="primary">主要按钮</Button>
<Button variant="outline">轮廓按钮</Button>
```

### With Sizes

```tsx
<Button size="default">默认尺寸</Button>
<Button size="large">大尺寸按钮</Button>
```

### With Icons

```tsx
<Button
  variant="primary"
  leftIcon={<SaveIcon />}
  rightIcon={<ArrowRightIcon />}
>
  保存文档
</Button>
```

### Loading State

```tsx
function Example() {
  const [loading, setLoading] = createSignal(false)

  const handleClick = () => {
    setLoading(true)
    // 执行异步操作
    doSomething().finally(() => setLoading(false))
  }

  return (
    <Button loading={loading()} onClick={handleClick}>
      保存
    </Button>
  )
}
```

### Button Group

```tsx
import { Button, ButtonGroup } from "@/components/widgets"

// Horizontal (default)
<ButtonGroup>
  <Button>选项 1</Button>
  <Button>选项 2</Button>
  <Button>选项 3</Button>
</ButtonGroup>

// Vertical
<ButtonGroup vertical>
  <Button>选项 1</Button>
  <Button>选项 2</Button>
  <Button>选项 3</Button>
</ButtonGroup>
```

## Props

### Button Props

| Prop          | Type                                           | Default       | Description                         |
| ------------- | ---------------------------------------------- | ------------- | ----------------------------------- |
| `variant`     | `"default" \| "outline" \| "primary"`          | `"default"`   | Button style                        |
| `size`        | `"default" \| "large"`                         | `"default"`   | Button size                         |
| `loading`     | `boolean`                                      | `false`       | Show loading spinner                |
| `disabled`    | `boolean`                                      | `false`       | Disabled state                      |
| `type`        | `"button" \| "submit" \| "reset"`              | `"button"`    | Button type                         |
| `leftIcon`    | `JSX.Element`                                  | -             | Icon on the left                    |
| `rightIcon`   | `JSX.Element`                                  | -             | Icon on the right                   |
| `class`       | `string`                                       | -             | Additional CSS classes             |
| `children`    | `JSX.Element`                                  | **required**  | Button content                      |
| `onClick`     | `(e: MouseEvent) => void`                      | -             | Click handler                      |
| `onMouseDown` | `(e: MouseEvent) => void`                      | -             | Mouse down handler                  |
| `onMouseUp`   | `(e: MouseEvent) => void`                      | -             | Mouse up handler                    |
| `name`        | `string`                                       | -             | Button name (for forms)            |
| `id`          | `string`                                       | -             | Button ID                           |
| `form`        | `string`                                       | -             | Associated form ID                 |

### ButtonGroup Props

| Prop       | Type        | Default | Description                  |
| ---------- | ----------- | ------- | ---------------------------- |
| `children` | `JSX.Element` | **required** | Button elements               |
| `class`    | `string`     | -       | Additional CSS classes       |
| `vertical` | `boolean`    | `false` | Vertical arrangement         |

## Variant Styles

| Variant   | Description                             |
| --------- | --------------------------------------- |
| `default` | Default button style                   |
| `primary` | Primary action button (theme color)    |
| `outline` | Outlined button with border            |

## Size Options

| Size      | Description                              |
| --------- | ---------------------------------------- |
| `default` | `py-2 px-4 text-xs`                      |
| `large`   | `py-3 px-6 text-sm` (with larger icons)   |

## Loading State

When `loading={true}`:
- Shows a spinner animation
- Disables button interaction
- Hides left/right icons temporarily
- Adds opacity to button text

```tsx
<Button loading={loading()} onClick={handleSubmit}>
  {loading() ? "保存中..." : "保存"}
</Button>
```

## Examples

### Form Submit Button

```tsx
<form onSubmit={handleSubmit}>
  <Input name="email" type="email" label="邮箱" />
  <Button type="submit" variant="primary">
    提交表单
  </Button>
</form>
```

### Action Buttons

```tsx
<div class="flex gap-2">
  <Button leftIcon={<EditIcon />}>编辑</Button>
  <Button variant="outline" leftIcon={<CopyIcon />}>复制</Button>
  <Button variant="outline" leftIcon={<TrashIcon />}>删除</Button>
</div>
```

### Navigation Button

```tsx
<Button
  variant="primary"
  rightIcon={<ArrowRightIcon />}
  onClick={() => navigate("/next")}
>
  下一步
</Button>
```

### Confirmation Button

```tsx
const [confirming, setConfirming] = createSignal(false)

<Button
  variant={confirming() ? "primary" : "outline"}
  onClick={() => {
    if (confirming()) {
      deleteItem()
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }}
>
  {confirming() ? "确认删除" : "删除"}
</Button>
```

### With Form Association

```tsx
<form id="myForm">
  {/* form fields */}
</form>

<Button form="myForm" type="submit">
  提交
</Button>
```

## CSS Styles

The component uses CSS classes defined in `/assets/styles/style.css`:

```css
.btn {
  transition: all;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline {
  background: none;
  border: 1px solid theme("colors.slate.200");
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}
```
