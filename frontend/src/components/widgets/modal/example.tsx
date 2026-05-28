import { createSignal } from "solid-js"

import { Modal, ModalActions } from "."

export function ModalExample() {
	const [isOpen, setIsOpen] = createSignal(false)
	const [confirmOpen, setConfirmOpen] = createSignal(false)

	return (
		<div class="flex flex-col items-center gap-4 p-8">
			<button
				onClick={() => setIsOpen(true)}
				class="px-4 py-2 bg-primary text-white rounded-xl font-semibold text-sm"
			>
				打开 Modal
			</button>

			<button
				onClick={() => setConfirmOpen(true)}
				class="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold text-sm"
			>
				打开确认对话框
			</button>

			{/* Basic Modal */}
			<Modal
				open={isOpen()}
				onClose={() => setIsOpen(false)}
				title="基础 Modal"
				description="这是一个使用 Tailwind CSS 和 SolidJS state 控制的 Modal 组件"
				size="md"
			>
				<div class="space-y-4">
					<p class="text-sm text-zinc-600">Modal 组件支持以下特性：</p>
					<ul class="text-sm text-zinc-600 list-disc list-inside space-y-1">
						<li>自定义尺寸（sm, md, lg, xl, full）</li>
						<li>点击遮罩关闭（可配置）</li>
						<li>ESC 键关闭（可配置）</li>
						<li>自定义标题和描述</li>
						<li>自定义内容区域</li>
						<li>自定义底部操作按钮</li>
					</ul>
				</div>
				<ModalActions
					actions={[
						{
							label: "取消",
							variant: "secondary",
							onClick: () => setIsOpen(false),
						},
						{
							label: "确定",
							variant: "primary",
							onClick: () => {
								alert("点击了确定")
								setIsOpen(false)
							},
						},
					]}
				/>
			</Modal>

			{/* Confirm Modal */}
			<Modal
				open={confirmOpen()}
				onClose={() => setConfirmOpen(false)}
				title="确认操作"
				description="此操作无法撤销，请谨慎操作"
				size="sm"
			>
				<div class="text-sm text-zinc-600">您确定要执行此操作吗？</div>
				<ModalActions
					actions={[
						{ label: "取消", variant: "ghost", onClick: () => setConfirmOpen(false) },
						{
							label: "确认删除",
							variant: "danger",
							onClick: () => {
								alert("已删除")
								setConfirmOpen(false)
							},
						},
					]}
				/>
			</Modal>
		</div>
	)
}
