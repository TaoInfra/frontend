'use client'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { getApiKeys } from '@/lib/storage';
import { ApiKeyData, AlertData } from '@/types';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import CreateAlertDialog from './CreateAlertDialog';
import {
	Dialog,
	DialogTrigger,
} from "@/components/ui/dialog"

const SingleAlert = ({ alert, setAlerts, alerts }: { alert: AlertData, setAlerts: (alerts: AlertData[]) => void, alerts: AlertData[] }) => {

	const [deleting, setDeleting] = useState(false);
	const key: ApiKeyData = getApiKeys('admin')[0];
	
	async function deleteAlert() {
		setDeleting(true);
		await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/alert/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				"Taoinfra-Admin-Key": `${key.key}`
			},
			body: JSON.stringify({
				alert_id: alert._id
			})
		});
		setDeleting(false);
		setAlerts(alerts.filter((item) => item._id !== alert._id));
	}

	return (
		<div className="mb-4 mt-4 border rounded relative">
			<div className="p-4 flex justify-between items-start">
				<div>
					<h3 className="text-m font-semibold">{alert.name}</h3>
					<p className='text-sm'>
						Subnet ID: {alert.metadata?.subnet_id} | Price Cutoff: {alert.metadata?.price_cutoff}
					</p>
				</div>
				<Button onClick={deleteAlert} className="self-start text-xs">{deleting ? 'Deleting...' : 'Delete Alert'}</Button>
			</div>
		</div>
	);
}


const AlertListCard = () => {

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
				<CardContent className='w-1/2'>
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

export default AlertListCard;