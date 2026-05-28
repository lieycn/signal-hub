# Spin Component

An Ant Design-style loading spinner component built with Tailwind CSS for SolidJS.

## Features

- 🎨 **Multiple Sizes**: Small, default, and large sizes
- 📝 **Loading Tips**: Optional text to show loading status
- 🎯 **Wrapper Mode**: Can wrap content with overlay loading
- 🖥️ **Full Screen**: Full-screen loading support
- 🎨 **Custom Colors**: Customizable spinner colors
- ⚡ **Lightweight**: Pure Tailwind CSS implementation

## Installation

The component is already included in the widgets bundle:

```tsx
import { Spin, SpinFullScreen, SpinnerOnly } from "@/components/widgets"
```

## Basic Usage

### Simple Spinner

```tsx
<Spin />
<Spin tip="Loading..." />
<Spin size="small" />
<Spin size="large" />
```

### Wrapped Content

Use the spinning prop to control the loading state when wrapping content:

```tsx
<Spin spinning={isLoading()}>
  <div class="p-4">
    <p>Your content here</p>
  </div>
</Spin>

<Spin tip="Loading data..." spinning={isLoading()}>
  <table>
    {/* Table content */}
  </table>
</Spin>
```

### Full Screen Loading

```tsx
import { SpinFullScreen } from "@/components/widgets"

function MyComponent() {
  const [loading, setLoading] = createSignal(false)

  const handleAction = () => {
    setLoading(true)
    // Perform async operation
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <>
      <Button onClick={handleAction}>Start Process</Button>
      <SpinFullScreen loading={loading()} tip="Processing..." />
    </>
  )
}
```

### Spinner Only

Use just the spinner without any wrapper:

```tsx
import { SpinnerOnly } from "@/components/widgets"

<SpinnerOnly size="default" />
<SpinnerOnly size="small" color="border-t-blue-500" />
<SpinnerOnly size="large" color="border-t-green-500" />
```

## API Reference

### Spin Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `true` | Whether it's loading |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Spinner size |
| `tip` | `string` | - | Loading tip text |
| `delay` | `number` | - | Delay in milliseconds before showing |
| `spinning` | `boolean` | `true` | Same as loading |
| `class` | `string` | - | Custom container class |
| `children` | `JSX.Element` | - | Content to wrap |
| `wrapperClassName` | `string` | - | Custom wrapper class |

### SpinFullScreen Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `true` | Whether to show the full screen loader |
| `tip` | `string` | - | Loading tip text |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Spinner size |
| `class` | `string` | - | Custom container class |

### SpinnerOnly Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Spinner size |
| `color` | `string` | `'border-t-primary'` | Border color class |
| `class` | `string` | - | Custom container class |

## Examples

### Form Submission

```tsx
function LoginForm() {
  const [submitting, setSubmitting] = createSignal(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setSubmitting(true)
    await login(formData)
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Spin spinning={submitting()} tip="Logging in...">
        {/* Form fields */}
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </Spin>
    </form>
  )
}
```

### Data Table

```tsx
function UserTable() {
  const [users, setUsers] = createSignal([])
  const [loading, setLoading] = createSignal(false)

  const loadUsers = async () => {
    setLoading(true)
    const data = await fetchUsers()
    setUsers(data)
    setLoading(false)
  }

  return (
    <Spin spinning={loading()} tip="Loading users...">
      <table class="min-w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <For each={users()}>
            {(user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Spin>
  )
}
```

### Custom Colors

```tsx
<div class="flex gap-4">
  <SpinnerOnly size="default" color="border-t-blue-500" />
  <SpinnerOnly size="default" color="border-t-green-500" />
  <SpinnerOnly size="default" color="border-t-red-500" />
  <SpinnerOnly size="default" color="border-t-purple-500" />
</div>
```

## Design Tokens

The component uses the following Tailwind CSS utilities:

- **Sizes**: `w-4 h-4` (small), `w-6 h-6` (default), `w-8 h-8` (large)
- **Border**: `border-2` (small/default), `border-3` (large)
- **Colors**: `border-gray-300`, `border-t-primary`
- **Animation**: `animate-spin` (built-in Tailwind)

## Accessibility

The component includes:
- Proper `aria-live` regions for loading announcements
- Keyboard navigation support for interactive wrapped content
- High contrast mode support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

1. **Use appropriate sizes**: Smaller spinners for inline loading, larger for standalone
2. **Provide feedback tips**: Help users understand what's happening
3. **Consider delays**: Use delay prop for fast operations to avoid flickering
4. **Full screen sparingly**: Reserve for important page-level operations

## Migration from Ant Design

If you're migrating from Ant Design's Spin component:

```tsx
// Ant Design React
import { Spin } from 'antd'
<Spin tip="Loading..." size="large">

// SolidJS + Tailwind
import { Spin } from '@/components/widgets'
<Spin tip="Loading..." size="large">
```

The API is designed to be familiar to Ant Design users while leveraging SolidJS reactivity and Tailwind CSS styling.
