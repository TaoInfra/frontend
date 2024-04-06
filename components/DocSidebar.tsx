import Link from 'next/link'
import {
	Home,
	LineChart,
	Package,
	ShoppingCart,
	Users
} from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'

export default function DocsSidebar ({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed left-0 top-20">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2 overflow-y-auto">

					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Home className="h-4 w-4" />
                Dashboard
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<ShoppingCart className="h-4 w-4" />
                Orders
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
								</Badge>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
							>
								<Package className="h-4 w-4" />
                Products{' '}
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Users className="h-4 w-4" />
                Customers
							</Link>
							<Link
								href="#"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<LineChart className="h-4 w-4" />
                Analytics
							</Link>
						</nav>
					</div>

				</div>
			</div>
			<div className="flex flex-col">

				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	)
}
