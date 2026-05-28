import { createSignal } from "solid-js"

import { Input } from "."
import { Textarea } from "@/components/widgets"

export function InputExample() {
	const [text, setText] = createSignal("")
	const [email, setEmail] = createSignal("")
	const [password, setPassword] = createSignal("")
	const [search, setSearch] = createSignal("")
	const [error, setError] = createSignal("")
	const [success, setSuccess] = createSignal("")
	const [message, setMessage] = createSignal("")

	const validateEmail = (value: string) => {
		if (!value) {
			setError("请输入邮箱地址")
			return
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			setError("请输入有效的邮箱地址")
			return
		}
		setError("")
		setSuccess("邮箱格式正确")
	}

	return (
		<div class="max-w-2xl mx-auto p-8 space-y-6">
			<div class="mb-6">
				<h2 class="text-2xl font-bold mb-2">Input 组件示例</h2>
				<p class="text-sm text-zinc-600">
					使用 Tailwind CSS 组件类重构的输入组件，提供一致的样式和更好的可维护性。
				</p>
			</div>

			{/* Basic Input */}
			<div>
				<h3 class="text-lg font-semibold mb-4">基础输入框</h3>
				<Input
					label="用户名"
					placeholder="请输入用户名"
					value={text()}
					onInput={setText}
					description="用户名用于登录系统"
				/>
			</div>

			{/* Sizes */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同尺寸</h3>
				<div class="space-y-3">
					<Input size="sm" label="小尺寸" placeholder="Small input" />
					<Input size="md" label="中等尺寸" placeholder="Medium input" />
					<Input size="lg" label="大尺寸" placeholder="Large input" />
				</div>
			</div>

			{/* Variants */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同风格</h3>
				<div class="space-y-3">
					<Input
						variant="default"
						label="默认风格"
						placeholder="Default variant"
					/>
					<Input
						variant="filled"
						label="填充风格"
						placeholder="Filled variant"
					/>
					<Input
						variant="outlined"
						label="轮廓风格"
						placeholder="Outlined variant"
					/>
				</div>
			</div>

			{/* Shapes */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同形状</h3>
				<div class="space-y-3">
					<Input
						shape="default"
						label="默认形状 (圆角)"
						placeholder="Default rounded shape"
					/>
					<Input
						shape="rounded"
						label="圆形"
						placeholder="Fully rounded"
					/>
					<Input
						shape="square"
						label="方形"
						placeholder="Square corners"
					/>
				</div>
			</div>

			{/* With Icons */}
			<div>
				<h3 class="text-lg font-semibold mb-4">带图标</h3>
				<div class="space-y-3">
					<Input
						label="搜索"
						type="search"
						placeholder="搜索内容..."
						value={search()}
						onInput={setSearch}
						leftIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
						}
					/>
					<Input
						label="邮箱"
						type="email"
						placeholder="email@example.com"
						leftIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
						}
					/>
					<Input
						label="密码"
						type="password"
						placeholder="请输入密码"
						value={password()}
						onInput={setPassword}
						rightIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
								<circle cx="12" cy="12" r="3"></circle>
							</svg>
						}
						rightIconClickable
					/>
				</div>
			</div>

			{/* Icon Combinations */}
			<div>
				<h3 class="text-lg font-semibold mb-4">图标组合</h3>
				<div class="space-y-3">
					<Input
						label="用户名"
						placeholder="请输入用户名"
						leftIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
						}
						rightIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						}
						rightIconClickable={!!text()}
						onRightIconClick={() => setText("")}
					/>
					<Input
						label="网址"
						type="url"
						placeholder="https://example.com"
						variant="outlined"
						shape="rounded"
						leftIcon={
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="2" y1="12" x2="22" y2="12"></line>
								<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
							</svg>
						}
					/>
				</div>
			</div>

			{/* Validation States */}
			<div>
				<h3 class="text-lg font-semibold mb-4">验证状态</h3>
				<div class="space-y-3">
					<Input
						label="错误状态"
						placeholder="输入内容显示错误"
						value={error()}
						onInput={(value) => {
							setError(value)
							setSuccess("")
						}}
						error={error() ? "这是一个错误提示" : ""}
					/>
					<Input
						label="成功状态"
						placeholder="输入正确内容"
						value={success()}
						onInput={(value) => {
							setSuccess(value)
							setError("")
						}}
						success={success() ? "验证通过" : ""}
					/>
				</div>
			</div>

			{/* Email Validation */}
			<div>
				<h3 class="text-lg font-semibold mb-4">邮箱验证</h3>
				<Input
					label="邮箱地址"
					type="email"
					placeholder="example@email.com"
					value={email()}
					onInput={(value) => {
						setEmail(value)
						validateEmail(value)
					}}
					error={error()}
					success={success()}
					required
				/>
			</div>

			{/* Disabled & Readonly */}
			<div>
				<h3 class="text-lg font-semibold mb-4">禁用和只读</h3>
				<div class="space-y-3">
					<Input
						label="禁用状态"
						placeholder="无法输入"
						value="禁用的内容"
						disabled
					/>
					<Input
						label="只读状态"
						placeholder="只读内容"
						value="只读内容，无法修改"
						readonly
					/>
				</div>
			</div>

			{/* Different Types */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同类型</h3>
				<div class="space-y-3">
					<Input type="email" label="邮箱" placeholder="email@example.com" />
					<Input type="tel" label="电话" placeholder="13800138000" />
					<Input type="url" label="网址" placeholder="https://example.com" />
					<Input type="number" label="数字" placeholder="123" min={0} max={100} />
				</div>
			</div>

			{/* Textarea */}
			<div>
				<h3 class="text-lg font-semibold mb-4">多行文本框</h3>
				<Textarea
					label="留言"
					placeholder="请输入您的留言..."
					value={message()}
					onInput={setMessage}
					description="我们会认真阅读您的每一条留言"
					rows={4}
				/>
			</div>
		</div>
	)
}
