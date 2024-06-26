import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
	return (
		<div className='min-h-screen'>
			<Header />
			<main className="flex flex-col items-center justify-between py-2 md:p-6 xl:px-20 2xl:px-24">
				<h1 className='text-4xl font-bold mb-10'>Privacy Policy</h1>
				<object data="https://general-s3-public.s3.us-east-2.amazonaws.com/privacy-policy.pdf" type="application/pdf" width="100%" height="800px">
					<p className='px-8 2xl:px-24'>Your browser does not support PDFs. Please download the PDF to view it: <a href="https://general-s3-public.s3.us-east-2.amazonaws.com/privacy-policy.pdf">Download PDF</a>.</p>
				</object>
			</main>
			<Footer />
		</div>
	)
}
