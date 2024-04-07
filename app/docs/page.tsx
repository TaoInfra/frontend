import React from 'react'
import Header from '@/components/Header'
import DocsSidebar from '@/components/Docs/Sidebar'
import Footer from '@/components/Footer'

export default function Home () {
	return (
		<>
			<Header />
			<DocsSidebar>
				<div>Hello</div>
			</DocsSidebar>
			<Footer />
		</>
	)
}
