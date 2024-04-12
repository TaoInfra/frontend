"use client"
import Link from 'next/link'
import {
	Network,
	ChevronRight,
	ChevronDown,
	Home
} from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
  

export default function DocsSidebar ({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const storedIsOpen = localStorage.getItem('sidebarCollapsed')
		if (storedIsOpen !== null) {
			setIsOpen(JSON.parse(storedIsOpen))
		}
	}, [])

	const toggleCollapse = () => {
		const newIsOpen = !isOpen
		setIsOpen(newIsOpen)
		localStorage.setItem('sidebarCollapsed', JSON.stringify(newIsOpen))
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] fixed left-0 top-20 overflow-y-auto">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2 overflow-y-auto">
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/docs"
								className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
							>
								<Home className="h-4 w-4" />
								Get Started
							</Link>
							<Collapsible open={isOpen} onOpenChange={toggleCollapse}>
								<CollapsibleTrigger className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
									<div className="flex items-center gap-2">
										<Network className="h-4 w-4" />
										Subnets
									</div>
									{isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
								</CollapsibleTrigger>
								<CollapsibleContent className='ml-4'>
									<Link href="/docs/subnet/1" className="block rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
										1: Text Prompting
									</Link>
								</CollapsibleContent>
							</Collapsible>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col overflow-y-auto">
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
					{children}
				</main>
			</div>
		</div>
	)
}

