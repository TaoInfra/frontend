import React from 'react'
import Header from '@/components/Header'
import BadgeWithCopy from '@/components/Landing/JoinGlobal'
import Hero from '@/components/Landing/Hero'
import Footer from '@/components/Footer'

export default function Home () {
	return (
		<div className='min-h-screen'>
			<Header />
			<main className="flex flex-col items-center justify-between p-10 sm:p-24">
				<Hero />
				<div className='w-full md:max-w-[16rem]'>
					<BadgeWithCopy subtensor="public.subtensor.ws" animate={true}/>
				</div>
			</main>
			<Footer />
		</div>
	)
}
