export function Empty() {
	return (
		<div class={"size-full flex items-center justify-center"}>
			<section class="flex flex-col items-center justify-center bg-linear-to-b from-white to-[#FDFDFD] px-10 text-center">
				<div class="w-full mb-8 bg-[radial-gradient(circle,rgba(151,224,143,0.1)_0%,rgba(255,255,255,0)_70%)] rounded-full flex items-center justify-center relative">
					<svg
						width="120"
						height="120"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-[#97E08F] opacity-80"
					>
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						<path d="M8 9h8"></path>
						<path d="M8 13h6"></path>
					</svg>
				</div>

				<h1 class="text-2xl font-bold text-[#333333] mb-3">欢迎使用聚合消息中心</h1>
				<p class="text-[15px] text-secondary max-w-100 leading-relaxed mb-10">
					从左侧列表中选择一个联系人开始对话。您可以实时管理来自 TikTok, Facebook,
					钉钉等多个平台的客户沟通。
				</p>

				<div class="flex gap-4">
					<div class="px-6 py-5 bg-white border border-[rgba(0,0,0,0.05)] rounded-2xl cursor-pointer transition-all w-[200px] flex flex-col items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:border-[#97E08F]">
						<div class="w-11 h-11 rounded-xl bg-[rgba(151,224,143,0.1)] flex items-center justify-center text-[#97E08F]">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<line x1="5" y1="12" x2="19" y2="12"></line>
							</svg>
						</div>
						<span class="text-sm font-semibold text-[#333333]">连接新平台</span>
					</div>

					<div class="px-6 py-5 bg-white border border-[rgba(0,0,0,0.05)] rounded-2xl cursor-pointer transition-all w-[200px] flex flex-col items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)] hover:border-[#97E08F]">
						<div class="w-11 h-11 rounded-xl bg-[rgba(24,119,242,0.1)] flex items-center justify-center text-[#1877F2]">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg>
						</div>
						<span class="text-sm font-semibold text-[#333333]">搜索联系人</span>
					</div>
				</div>
			</section>
		</div>
	)
}
