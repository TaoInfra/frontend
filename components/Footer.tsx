import React from 'react'

const Footer: React.FC = () => {
	const year = new Date().getFullYear()
	return (
		<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-2">
			<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
						<img src="/taoinfra-logo.png" className="h-8" alt="Taoinfra Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Taoinfra</span>
					</a>
					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<a href="/" className="hover:underline me-4 md:me-6">Home</a>
						</li>
						<li>
							<a href="/legal/privacy-policy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
						</li>
						<li>
							<a href="/legal/terms-of-service" className="hover:underline">Terms of Service</a>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Taoinfra is not affiliated with the Opentensor Foundation. </span>
				<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <a href="https://taoinfra.com/" className="hover:underline">Taoinfra™</a>. All Rights Reserved.</span>
			</div>
		</footer>)
}

export default Footer
