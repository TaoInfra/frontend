'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { getApiKeys } from '@/lib/storage';
import { ApiKeyData, AlertData } from '@/types';
import { Button } from '@/components/ui/button';
import CreateAlertDialog from '@/components/Dashboard/Home/alerts/CreateAlertDialog';
import {
	Dialog,
	DialogTrigger,
} from "@/components/ui/dialog"
import { SingleAlert } from '@/components/Dashboard/Home/alerts/SingleAlert';

const AlertList = () => {
	const [triggerGetAlerts, setTriggerGetAlerts] = useState(0);
	const [alerts, setAlerts] = useState<AlertData[]>([]);
	const [key, setKey] = useState<ApiKeyData | null>(null);

	useEffect(() => {
		const fetchedKey = getApiKeys('admin')[0];
		setKey(fetchedKey);
	}, []);

	async function getAlerts() {
		if (!key) return;
		const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/alert/retrieve`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				"Taoinfra-Admin-Key": `${key.key}`
			}
		});

		const data = await res.json();
		if (data.length > 0) {
			setAlerts(data);
		}
	}

	useEffect(() => {
		getAlerts();
	}, [triggerGetAlerts, key]);

	return (
		<div>
			<Card className='pr-5 '>
				<div className='w-full flex justify-between items-center'>
					<CardHeader>
						<CardTitle>Your Alerts</CardTitle>
						<CardDescription>You can make alerts to keep track of wallets, subnets, & more</CardDescription>
					</CardHeader>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Create Alert</Button>
						</DialogTrigger>
						<CreateAlertDialog setTriggerGetAlerts={setTriggerGetAlerts} />
					</Dialog>
				</div>
				<CardContent className='max-w-3xl'>
					{
						alerts.map((alert: AlertData) => (
							<SingleAlert key={alert._id} alert={alert} setAlerts={setAlerts} alerts={alerts} />
						))
					}
				</CardContent>
			</Card>
		</div>
	);
}

export default AlertList;