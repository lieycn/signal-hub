import { createSignal, Show } from "solid-js"

import { Button } from "@/components/widgets"
import { Spin, SpinFullScreen, SpinnerOnly } from "./"

export function SpinExample() {
	const [loading, setLoading] = createSignal(false)
	const [fullScreenLoading, setFullScreenLoading] = createSignal(false)
	const [smallLoading, setSmallLoading] = createSignal(false)

	const handleLoadData = () => {
		setLoading(true)
		setTimeout(() => setLoading(false), 2000)
	}

	const handleFullScreen = () => {
		setFullScreenLoading(true)
		setTimeout(() => setFullScreenLoading(false), 3000)
	}

	const handleSmallLoad = () => {
		setSmallLoading(true)
		setTimeout(() => setSmallLoading(false), 1500)
	}

	return (
		<div class="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-sm">
			<div>
				<h2 class="text-xl font-semibold mb-4">Spin Component Examples</h2>
			</div>

			{/* Basic Usage */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Basic Usage</h3>
				<div class="flex items-center gap-4">
					<Spin />
					<Spin tip="Loading..." />
					<Spin size="small" />
					<Spin size="large" />
				</div>
			</div>

			{/* Wrapped Content */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Wrapped Content</h3>
				<div class="flex gap-4">
					<Spin spinning={loading()}>
						<div class="p-4 border border-gray-200 rounded w-48 h-24">
							<p class="text-sm text-gray-600">Content area</p>
						</div>
					</Spin>

					<Spin tip="Loading data..." spinning={smallLoading()}>
						<div class="p-4 border border-gray-200 rounded w-48 h-24">
							<p class="text-sm text-gray-600">Another content</p>
						</div>
					</Spin>
				</div>
				<div class="flex gap-2">
					<Button onClick={handleLoadData} size={"small"}>
						Toggle First
					</Button>
					<Button onClick={handleSmallLoad} size={"small"}>
						Toggle Second
					</Button>
				</div>
			</div>

			{/* Custom Sizes */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Different Sizes</h3>
				<div class="flex items-center gap-6">
					<SpinnerOnly size="small" />
					<SpinnerOnly size="default" />
					<SpinnerOnly size="large" />
				</div>
			</div>

			{/* Custom Colors */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Custom Colors</h3>
				<div class="flex items-center gap-6">
					<SpinnerOnly color="border-t-blue-500" />
					<SpinnerOnly color="border-t-green-500" />
					<SpinnerOnly color="border-t-red-500" />
					<SpinnerOnly color="border-t-purple-500" />
				</div>
			</div>

			{/* Full Screen Loading */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Full Screen Loading</h3>
				<Button onClick={handleFullScreen} variant="primary">
					Show Full Screen Loading
				</Button>
				<SpinFullScreen loading={fullScreenLoading()} tip="Processing..." />
			</div>

			{/* Inside Buttons */}
			<div class="space-y-3">
				<h3 class="text-lg font-medium">Inside Buttons</h3>
				<div class="flex gap-2">
					<Button loading size="default">
						Submit
					</Button>
					<Button loading size="large" variant="primary">
						Processing...
					</Button>
				</div>
			</div>
		</div>
	)
}
