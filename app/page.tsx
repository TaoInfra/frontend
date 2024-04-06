import React from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Landing/Hero'
import Footer from '@/components/Footer'

export default function Home () {
	return (

		<div className='min-h-screen'>

			<Header />
			<main className="flex flex-col items-center justify-between p-24">
				<Hero />
			</main>
			<Footer />
		</div>
	)
}
