"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { clsx } from 'clsx';
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import JoinForm from './Join/Form'
import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { IntercomScript, IntercomSettings } from './Embed'
import { getUser } from '@/lib/storage'

const Header: React.FC<{ isMobileNav?: boolean }> = ({ isMobileNav = false } ) => {
	const user = getUser();
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, []);

	return (
		<header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
			<div className="w-full mx-auto px-6 md:px-12 ">
				<div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start md:w-0 md:flex-1">
						<a href="/">
							<span className="sr-only">Taoinfra</span>
							<img
								className="h-8 w-auto sm:h-10"
								src="/taoinfra-logo.png"
								alt=""
							/>
						</a>
					</div>
					{isClient && <nav
						className={clsx(
							`[&>:not(a)]:hidden sm:[&>:not(a)]:block flex items-center space-x-6 sm:space-x-10`,
							!isMobileNav && 'hidden md:flex'
						)}
					>
						{!user && (
							<Dialog>
								<DialogTrigger asChild>
									<Link href="#" className="text-base font-medium text-slate-500 hover:text-black">
										Get Started
									</Link>
								</DialogTrigger>
								<JoinForm/>
							</Dialog>
						)}
						{user && (
							<Link
								href="/dashboard"
								className="text-base font-medium text-slate-500 hover:text-black"
							>
								Dashboard
							</Link>
						)}
						<Link
							href="/docs"
							className="text-base font-medium text-slate-500 hover:text-black"
						>
							Docs
						</Link>
						<DiscordLogoIcon className="text-base font-medium text-slate-500 hover:text-black cursor-pointer"
							style={{ height: '24px', width: '24px' }}
							onClick={() => window.open("https://discord.gg/Jg4wU3M6", "_blank")}
						/>
						<GitHubLogoIcon className="text-base font-medium text-slate-500 hover:text-black cursor-pointer"
							style={{ height: '24px', width: '24px' }}
							onClick={() => window.open("https://github.com/taoinfra/frontend", "_blank")}
						/>
					</nav>}
				</div>
			</div>
			<IntercomScript />
			<IntercomSettings user={{name:  null, id: null, email: null, createdAt: null}} />
		</header>
	)
}

export default Header
