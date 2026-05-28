import { createSignal } from "solid-js"

import { Switch } from "./"

export function SwitchExample() {
	const [enabled, setEnabled] = createSignal(false)
	const [darkMode, setDarkMode] = createSignal(false)
	const [notifications, setNotifications] = createSignal(true)
	const [autoSave, setAutoSave] = createSignal(true)
	const [smallEnabled, setSmallEnabled] = createSignal(false)
	const [largeEnabled, setLargeEnabled] = createSignal(true)

	return (
		<div class="flex flex-col gap-8 p-6 bg-white rounded-lg shadow-sm">
			<div>
				<h2 class="text-2xl font-semibold mb-2">Switch 组件示例</h2>
				<p class="text-sm text-zinc-600">
					增强型开关组件，支持多种尺寸、颜色和状态
				</p>
			</div>

			{/* Basic Usage */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">基础用法</h3>
				<div class="flex items-center gap-6">
					<Switch checked={enabled()} onChange={setEnabled} label="启用功能" />
					<Switch checked={darkMode()} onChange={setDarkMode} label="深色模式" />
					<Switch
						checked={notifications()}
						onChange={setNotifications}
						label="推送通知"
						description="接收系统推送通知"
					/>
				</div>
			</div>

			{/* Size Variants */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">不同尺寸</h3>
				<div class="flex items-center gap-6">
					<div class="flex items-center gap-2">
						<Switch size="sm" checked={smallEnabled()} onChange={setSmallEnabled} />
						<span class="text-sm text-zinc-600">小号</span>
					</div>
					<div class="flex items-center gap-2">
						<Switch size="md" checked={enabled()} onChange={setEnabled} />
						<span class="text-sm text-zinc-600">默认</span>
					</div>
					<div class="flex items-center gap-2">
						<Switch size="lg" checked={largeEnabled()} onChange={setLargeEnabled} />
						<span class="text-sm text-zinc-600">大号</span>
					</div>
				</div>
			</div>

			{/* Color Variants */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">不同颜色</h3>
				<div class="flex items-center gap-6">
					<Switch color="primary" label="主要颜色" />
					<Switch color="success" label="成功状态" />
					<Switch color="danger" label="危险操作" />
					<Switch color="warning" label="警告提示" />
				</div>
			</div>

			{/* States */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">不同状态</h3>
				<div class="space-y-3">
					<div class="flex items-center gap-4">
						<Switch checked={enabled()} onChange={setEnabled} label="正常状态" />
					</div>
					<div class="flex items-center gap-4">
						<Switch checked={autoSave()} onChange={setAutoSave} label="已禁用" disabled />
						<span class="text-sm text-zinc-500">(禁用状态)</span>
					</div>
					<div class="flex items-center gap-4">
						<Switch checked={autoSave()} label="只读状态" readonly />
						<span class="text-sm text-zinc-500">(只读状态)</span>
					</div>
				</div>
			</div>

			{/* Controlled vs Uncontrolled */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">受控 vs 非受控</h3>
				<div class="flex items-center gap-6">
					<Switch label="受控组件" checked={enabled()} onChange={setEnabled} />
					<Switch label="非受控组件" defaultChecked={true} />
				</div>
			</div>

			{/* With Descriptions */}
			<div class="space-y-4">
				<h3 class="text-lg font-medium">带描述信息</h3>
				<div class="space-y-3">
					<Switch
						checked={notifications()}
						onChange={setNotifications}
						label="邮件通知"
						description="接收新邮件时的系统通知"
					/>
					<Switch
						checked={autoSave()}
						onChange={setAutoSave}
						label="自动保存"
						description="编辑时自动保存内容到云端"
					/>
				</div>
			</div>

			{/* Form Integration */}
			<div class="p-4 bg-zinc-50 rounded-lg">
				<h3 class="text-lg font-medium mb-4">表单集成</h3>
				<form class="space-y-4">
					<div class="flex items-center justify-between">
						<label class="text-sm font-medium">接收营销邮件</label>
						<Switch name="marketing" defaultChecked={false} />
					</div>
					<div class="flex items-center justify-between">
						<label class="text-sm font-medium">启用双重认证</label>
						<Switch name="2fa" color="success" />
					</div>
					<div class="flex items-center justify-between">
						<label class="text-sm font-medium">公开个人资料</label>
						<Switch name="public" color="warning" />
					</div>
				</form>
			</div>
		</div>
	)
}
