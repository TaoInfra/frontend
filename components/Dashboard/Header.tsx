"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
	Home,
	PanelLeft,
	// Search,
} from "lucide-react"
import { getUser } from "@/lib/storage"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { IntercomScript, IntercomSettings } from "../Embed"
import { BreadcrumbData } from '@/types'


export default function DashboardHeader ({ children, breadcrumbList }: { children: React.ReactNode, breadcrumbList: BreadcrumbData[] }) {
	const user = getUser();

	if (!user) {
		window.location.href = '/';
	}


	function handleLogout() {
		// Clear everything from local storage
		localStorage.clear();
		// Redirect to the login page
		window.location.href = '/';
	}


	function handleIntercomSupportOpen() {
		//@ts-ignore
		window.Intercom('show')
	}
	return (
		<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" variant="outline" className="sm:hidden">
							<PanelLeft className="h-5 w-5" />
							<span className="sr-only">Toggle Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="sm:max-w-xs">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="#"
								className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
							>
								<Image src="/taoinfra-logo.png" alt="Taoinfra" width={32} height={32} className="h-4 w-4 transition-all group-hover:scale-110" />
								<span className="sr-only">Taoinfra</span>
							</Link>
							<Link
								href="#"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Home className="h-5 w-5" />
                  Home
							</Link>
							{/* <Link
									href="#"
									className="flex items-center gap-4 px-2.5 text-foreground"
								>
									<ShoppingCart className="h-5 w-5" />
                  Orders
								</Link>
								<Link
									href="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Package className="h-5 w-5" />
                  Products
								</Link>
								<Link
									href="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Users2 className="h-5 w-5" />
                  Customers
								</Link>
								<Link
									href="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LineChart className="h-5 w-5" />
                  Settings
								</Link> */}
						</nav>
					</SheetContent>
				</Sheet>
				<Breadcrumb className="hidden md:flex">
					<BreadcrumbList>
						{breadcrumbList.map((item, index) => (
							<>
								{index > 0 && <BreadcrumbSeparator />}
								<BreadcrumbItem key={index}>
                            
									{
										item.href ? (
											<BreadcrumbLink asChild>
                                    
												<Link href={item.href || '#'}>{item.label}</Link>
											</BreadcrumbLink>
										) : (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										)
									}
								</BreadcrumbItem>
							</>
						))}
					</BreadcrumbList>
				</Breadcrumb>
				<div className="relative ml-auto flex-1 md:grow-0">
					{/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search..."
						className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
					/> */}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="overflow-hidden rounded-full"
						>
							<img
								src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${user?._id}`}
								width={36}
								height={36}
								alt="Avatar"
								className="overflow-hidden rounded-full"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {window.location.href = '/dashboard/settings'}}
						>Settings</DropdownMenuItem>
						<DropdownMenuItem
							onClick={handleIntercomSupportOpen}
						>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
						>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
			<main className="">
				{children}
			</main>
			<IntercomScript />
			<IntercomSettings user={null} />
		</div>

	)}
