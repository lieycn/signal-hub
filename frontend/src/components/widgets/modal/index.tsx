import { Index, Show, children, type JSX } from "solid-js"
import { Portal } from "solid-js/web"

import { cn } from "@/libs/utils"

export interface ModalProps {
	open: boolean
	onClose?: () => void
	title?: string
	description?: string
	children?: JSX.Element
	footer?: JSX.Element
	size?: "sm" | "md" | "lg" | "xl" | "full"
	showCloseButton?: boolean
	closeOnOverlayClick?: boolean
	closeOnEscape?: boolean
	class?: string
}

const sizeClasses = {
	sm: "max-w-md",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
	full: "max-w-6xl",
}

export function Modal(props: ModalProps) {
	const resolvedChildren = children(() => props.children)

	const handleOverlayClick = () => {
		if (props.closeOnOverlayClick !== false) {
			props.onClose?.()
		}
	}

	const handleEscape = (e: KeyboardEvent) => {
		if (props.closeOnEscape !== false && e.key === "Escape") {
			props.onClose?.()
		}
	}

	return (
		<Show when={props.open}>
			<Portal mount={document.body}>
				<div
					class="fixed inset-0 z-50 flex items-center justify-center"
					onKeyDown={handleEscape}
				>
					{/* Overlay */}
					<div
						class="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
						onClick={handleOverlayClick}
					/>

					{/* Modal */}
					<div
						class={cn(
							"-translate-y-1/2 relative w-full bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-200",
							sizeClasses[props.size || "md"],
							props.class,
						)}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Header */}
						<Show when={props.title || props.showCloseButton !== false}>
							<div class="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
								<Show when={props.title}>
									<div>
										<h3 class="text-lg font-bold text-zinc-900">
											{props.title}
										</h3>
										<Show when={props.description}>
											<p class="text-sm text-zinc-500 mt-0.5">
												{props.description}
											</p>
										</Show>
									</div>
								</Show>
								<Show when={props.showCloseButton !== false}>
									<button
										type="button"
										class="size-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
										onClick={() => props.onClose?.()}
									>
										<svg
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path d="M18 6L6 18M6 6l12 12"></path>
										</svg>
									</button>
								</Show>
							</div>
						</Show>

						{/* Body */}
						<div class="px-6 py-4">{resolvedChildren()}</div>

						{/* Footer */}
						<Show when={props.footer}>
							<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-100">
								{props.footer}
							</div>
						</Show>
					</div>
				</div>
			</Portal>
		</Show>
	)
}

export interface ModalActionProps {
	label: string
	variant?: "primary" | "secondary" | "danger" | "ghost"
	onClick?: () => void
	disabled?: boolean
	class?: string
}

const variantClasses = {
	primary:
		"px-4 py-2 bg-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
	secondary:
		"px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-semibold text-sm hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
	danger: "px-4 py-2 bg-red-500 text-white rounded-xl font-semibold text-sm hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
	ghost: "px-4 py-2 bg-transparent text-zinc-600 rounded-xl font-semibold text-sm hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
}

export function ModalAction(props: ModalActionProps) {
	return (
		<button
			type="button"
			class={cn(variantClasses[props.variant || "secondary"], props.class)}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.label}
		</button>
	)
}

export interface ModalActionsProps {
	actions: ModalActionProps[]
	class?: string
}

export function ModalActions(props: ModalActionsProps) {
	return <Index each={props.actions}>{(action) => <ModalAction {...action()} />}</Index>
}
