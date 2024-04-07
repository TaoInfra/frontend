import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from '@/components/ui/tooltip'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: {
		default: 'Taoinfra | Fastest way to get started with Bittensor',
		template: '%s | Taoinfra'
	},
	description: 'Subtensors, utilities & more for the Bittensor ecosystem',
	keywords: ['Taoinfra', 'Bittensor', 'Subtensors', 'Utilities'],
	openGraph: {
		title: 'Taoinfra | Fastest way to get started with Bittensor',
		description: 'Subtensors, utilities & more for the Bittensor ecosystem',
		url: 'https://taoinfra.com',
		type: 'website',
		images: [
			{
				url: 'https://res.cloudinary.com/dkpry5cup/image/upload/f_auto,q_auto/bszcjfghdtcygdm6fnnp',
				width: 1920,
				height: 1080,
				alt: 'Taoinfra | Fastest way to get started with Bittensor'
			}
		]
	}
}

export default function RootLayout ({
	children
}: Readonly<{
  children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body >
				<TooltipProvider>
					{children}
				</TooltipProvider>
				<Toaster />
			</body>
		</html>
	)
}
