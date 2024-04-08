"use client"
import React from 'react'
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import JoinForm from './Join/Form'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { IntercomScript, IntercomSettings } from './Embed'

const Header: React.FC = () => {
	return (
		<header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
			<div className="w-full mx-auto px-12 ">
				<div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
					<div className="flex justify-start lg:w-0 lg:flex-1">
						<a href="/">
							<span className="sr-only">Taoinfra</span>
							<img
								className="h-8 w-auto sm:h-10"
								src="/taoinfra-logo.png"
								alt=""
							/>
						</a>
					</div>
					<nav className="hidden md:flex items-center space-x-10">
						<Dialog>
							<DialogTrigger asChild>
								<a href="#" className="text-base font-medium text-slate-500 hover:text-black">
									Get Started
								</a>
							</DialogTrigger>
							<JoinForm />
						</Dialog>
						<DiscordLogoIcon className="text-base font-medium text-slate-500 hover:text-black cursor-pointer h-8" 
							onClick={() => window.open("https://discord.gg/tXaSJS5S", "_blank")}
						/>
					</nav>
				</div>
			</div>
			<IntercomScript />
			<IntercomSettings user={{name:  null, id: null, email: null, createdAt: null}} />
		</header>
	)
}

export default Header
