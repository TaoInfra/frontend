import React, { ReactNode } from 'react'
import { DocsSidebarItems } from '@/components/Docs/DocsSidebarItems';

export default function DocsSidebar({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed left-0 top-16 sm:top-20 pr-1.5 overflow-y-auto">
			<div className="hidden md:block border-r bg-muted/40">
				<DocsSidebarItems />
			</div>
			<div className="flex flex-col overflow-y-auto">
				<main className="flex flex-1 flex-col gap-3.5 p-5 lg:gap-6 lg:p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
					{children}
				</main>
			</div>
		</div>
	);
}
