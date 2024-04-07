import DocsSidebar from "@/components/Dashboard/Layout";

import React from 'react'

const DashboardPage: React.FC = () => {
	return (
		<DocsSidebar>
			<div className="p-4">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<p>Welcome to your dashboard. Here you can manage your API keys, orders, products, customers, and analytics.</p>
			</div>
		</DocsSidebar>
	)
}

export default DashboardPage
