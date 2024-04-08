'use client'
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { getUser, setUser, getApiKeys } from "@/lib/storage"
import { Input } from "@/components/ui/input"
import Layout from "@/components/Dashboard/Layout"

export default function Setting() {
	const user = getUser()
	if (!user) {
		return <></>
	}
	const [name, setName] = useState(user.name)

	async function updateName() {
		const apiKeys = getApiKeys('admin')
		if (apiKeys.length === 0) {
			console.log("No api keys found")
			return
		}
		try {
			await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/user/update-name", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Taoinfra-Admin-Key": `${apiKeys[0].key}`
				},
				body: JSON.stringify({ name })
			})
			//@ts-ignore
			setUser({ ...user, name: name })

		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Layout breadcrumbList={[{label: "Dashboard", href: "/dashboard"}, { label: "Settings"}]}>
			<div className="flex min-h-screen w-full flex-col">
				<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
					<div className="mx-auto grid w-full max-w-6xl gap-2">
						<h1 className="text-3xl font-semibold">Settings</h1>
					</div>
					<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
						<nav
							className="grid gap-4 text-sm text-muted-foreground"
						>
							<Link href="#" className="font-semibold text-primary">
							General
							</Link>
							{/* <Link href="#">Security</Link>
							<Link href="#">Integrations</Link>
							<Link href="#">Support</Link>
							<Link href="#">Organizations</Link>
							<Link href="#">Advanced</Link> */}
						</nav>
						<div className="grid gap-6">
							<Card x-chunk="dashboard-04-chunk-1">
								<CardHeader>
									<CardTitle>Profile</CardTitle>
									{/* <CardDescription>
                  Your name
									</CardDescription> */}
								</CardHeader>
								<CardContent>
									<Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
									<Input placeholder="Email" value={user?.email_id} disabled  className="mt-2"/>
								</CardContent>
								<CardFooter className="border-t px-6 py-4">
									<Button
										onClick={updateName}
									>Save</Button>
								</CardFooter>
							</Card>
						
						</div>
					</div>
				</main>
			</div>
		</Layout>
	)
}
