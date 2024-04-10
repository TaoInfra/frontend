'use client'
import React from 'react'
import {
	Dialog,
	DialogTrigger,
} from "@/components/ui/dialog"
import JoinForm  from '../Join/Form'
function LandingHeroOne () {
	return (
		<div className="relative z-0 mx-auto max-w-3xl pb-24 pt-12 text-center absolute h-full w-full">
			<div className="absolute -top-4 -z-10 flex w-full justify-center">
				<div className="absolute w-screen h-full bg-[linear-gradient(to_right,#b1b1b12e_1px,transparent_1px),linear-gradient(to_bottom,#b1b1b12e_1px,transparent_1px)] bg-[size:18px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
				<div className="h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]" />
			</div>
			<div>
				<h1 className="mb-4 font-bold bg-gradient-to-t from-[#b1b1b1] to-[#b3b3b3] bg-clip-text text-4xl text-slate-800 md:text-5xl dark:text-transparent">
                Fastest way to get started with Bittensor
				</h1>
			</div>
			<span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-xl text-slate-500 dark:text-transparent">
			Globally distributed, resilient subtensors, mining utilities & more
			</span>
		
			{/* <Dialog>
				<DialogTrigger asChild> */}
			<div >
				<span className="relative inline-block overflow-hidden rounded-full p-[2px] mt-3">
					<span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
					<div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-5 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                        
                        Coming soon
					</div>
				</span>
			</div>
			{/* </DialogTrigger>
				<JoinForm />
			</Dialog> */}
		</div>
					
	)
}

export default LandingHeroOne
