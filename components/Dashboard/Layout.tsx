"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
	Home,
} from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import DashboardHeader from "./Header"
import { BreadcrumbData } from "@/types"

export default function DashboardLayout ({ children, breadcrumbList }: { children: React.ReactNode, breadcrumbList: BreadcrumbData[] }) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return isClient ? (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
				<nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
					<Link
						href="#"
						className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-secondary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
					>
						<Image
							alt="Taoinfra"
							className="h-4 w-4 transition-all group-hover:scale-110"
							height={32}
							src="/taoinfra-logo.png"
							width={32}
						/>
						<span className="sr-only">Taoinfra </span>
					</Link>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Home className="h-5 w-5" />
								<span className="sr-only">Home</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Home</TooltipContent>
					</Tooltip>
					{/* <Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<ShoppingCart className="h-5 w-5" />
								<span className="sr-only">Orders</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Orders</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Package className="h-5 w-5" />
								<span className="sr-only">Products</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Products</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Users2 className="h-5 w-5" />
								<span className="sr-only">Customers</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Customers</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<LineChart className="h-5 w-5" />
								<span className="sr-only">Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Analytics</TooltipContent>
					</Tooltip>
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href="#"
								className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
							>
								<Settings className="h-5 w-5" />
								<span className="sr-only">Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side="right">Settings</TooltipContent>
    </Tooltip> */}
				</nav>
			</aside>
			<DashboardHeader breadcrumbList={breadcrumbList}>
				{children}
			</DashboardHeader>
		</div>
	) : null
}

