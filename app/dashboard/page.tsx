import DocsSidebar from "@/components/Dashboard/Layout";
import AlertList from '@/components/Dashboard/Home/alerts/AlertList';
import React from 'react'

const DashboardPage: React.FC = () => {
	return (
		<DocsSidebar breadcrumbList={[{ label: "Dashboard", href: "/dashboard" }, { label: "Home" }]}>
			<div className="p-4">
				<AlertList />
			</div>
		</DocsSidebar>
	)
}

export default DashboardPage
