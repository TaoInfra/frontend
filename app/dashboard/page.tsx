import DocsSidebar from "@/components/Dashboard/Layout";
import SubtensorList from "@/components/Dashboard/Home/AlertList";
import React from 'react'

const DashboardPage: React.FC = () => {
	return (
		<DocsSidebar breadcrumbList={[{label: "Dashboard", href: "/dashboard"}, { label: "Home"}]}>
			<div className="p-4">
				<SubtensorList />
			</div>
		</DocsSidebar>
	)
}

export default DashboardPage
