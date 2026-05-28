import { createSignal } from "solid-js"

import { Button, ButtonGroup } from "."

export function ButtonExample() {
	const [loading, setLoading] = createSignal(false)

	const handleClick = () => {
		setLoading(true)
		setTimeout(() => setLoading(false), 2000)
	}

	return (
		<div class="max-w-2xl mx-auto p-8 space-y-8">
			<h2 class="text-2xl font-bold">Button 组件示例</h2>

			{/* Variants */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同风格</h3>
				<ButtonGroup>
					<Button variant="default">默认按钮</Button>
					<Button variant="primary">主要按钮</Button>
					<Button variant="outline">轮廓按钮</Button>
				</ButtonGroup>
			</div>

			{/* Sizes */}
			<div>
				<h3 class="text-lg font-semibold mb-4">不同尺寸</h3>
				<ButtonGroup>
					<Button size="default">默认尺寸</Button>
					<Button size="large">大尺寸按钮</Button>
					<Button size="large" variant="primary">
						大号主按钮
					</Button>
				</ButtonGroup>
			</div>

			{/* With Icons */}
			<div>
				<h3 class="text-lg font-semibold mb-4">带图标</h3>
				<ButtonGroup>
					<Button
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
								<polyline points="17 21 17 13 7 13 7 21"></polyline>
							</svg>
						}
					>
						保存文档
					</Button>
					<Button
						variant="primary"
						rightIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						}
					>
						下一步
					</Button>
					<Button
						variant="outline"
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<polyline points="1 4 1 10 7 14 23 18 23 18 17 14 1 10 1 4"></polyline>
								<path d="M15 4v7a4 4 0 0 1-4 4H9"></path>
							</svg>
						}
						rightIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<polyline points="12 6 12 12 16 14"></polyline>
							</svg>
						}
					>
						撤销
					</Button>
				</ButtonGroup>
			</div>

			{/* Loading State */}
			<div>
				<h3 class="text-lg font-semibold mb-4">加载状态</h3>
				<ButtonGroup>
					<Button loading={loading()} onClick={handleClick}>
						点击加载
					</Button>
					<Button variant="primary" loading={loading()} onClick={handleClick}>
						提交中...
					</Button>
					<Button variant="outline" loading={loading()} onClick={handleClick}>
						处理中
					</Button>
				</ButtonGroup>
			</div>

			{/* Disabled State */}
			<div>
				<h3 class="text-lg font-semibold mb-4">禁用状态</h3>
				<ButtonGroup>
					<Button disabled>默认禁用</Button>
					<Button variant="primary" disabled>
						主要禁用
					</Button>
					<Button variant="outline" disabled>
						轮廓禁用
					</Button>
				</ButtonGroup>
			</div>

			{/* Button Types */}
			<div>
				<h3 class="text-lg font-semibold mb-4">按钮类型</h3>
				<ButtonGroup>
					<Button type="button">Button</Button>
					<Button type="submit">Submit</Button>
					<Button type="reset">Reset</Button>
				</ButtonGroup>
			</div>

			{/* Vertical Button Group */}
			<div>
				<h3 class="text-lg font-semibold mb-4">按钮组</h3>
				<div class="space-x-4">
					<h4 class="text-sm font-medium text-zinc-600">水平排列</h4>
					<ButtonGroup>
						<Button>选项 1</Button>
						<Button>选项 2</Button>
						<Button>选项 3</Button>
					</ButtonGroup>
				</div>
				<div class="mt-4">
					<h4 class="text-sm font-medium text-zinc-600">垂直排列</h4>
					<ButtonGroup vertical>
						<Button>选项 1</Button>
						<Button>选项 2</Button>
						<Button>选项 3</Button>
					</ButtonGroup>
				</div>
			</div>

			{/* Common Actions */}
			<div>
				<h3 class="text-lg font-semibold mb-4">常用操作</h3>
				<ButtonGroup>
					<Button
						variant="primary"
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
								<polyline points="17 21 17 13 7 13 7 21"></polyline>
							</svg>
						}
					>
						保存
					</Button>
					<Button
						variant="outline"
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
						}
					>
						搜索
					</Button>
					<Button
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
								<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
							</svg>
						}
					>
						编辑
					</Button>
					<Button
						variant="outline"
						leftIcon={
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
							</svg>
						}
					>
						删除
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}
