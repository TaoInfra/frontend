import React, { useMemo, useState } from 'react';
import { AlertData, ApiKeyData } from '@/types';
import { getApiKeys } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SingleAlertDropdownMenu } from '@/components/Dashboard/Home/alerts/SingleAlertDropdownMenu';
import { useToast } from '@/components/ui/use-toast';

export const SingleAlert = ({ alert, setAlerts, alerts }: { alert: AlertData, setAlerts: (alerts: AlertData[]) => void, alerts: AlertData[] }) => {
	const toast = useToast();
	const [deleting, setDeleting] = useState(false);
	const [scheduling, setScheduling] = useState(false);
	const key: ApiKeyData = getApiKeys('admin')[0];

	const headers = useMemo(() => {
		return {
			'Content-Type': 'application/json',
			"Taoinfra-Admin-Key": `${key.key}`
		}
	}, [key.key]);

	async function deleteAlert() {
		try {
			setDeleting(true);
			const body = {
				alert_id: alert._id
			}
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/alert/delete`, {
				method: 'POST',
				headers,
				body: JSON.stringify(body)
			});
			setDeleting(false);
			setAlerts(alerts.filter((item) => item._id !== alert._id));
			toast.toast({
				title: 'Alert Deleted',
				description: 'The alert has been deleted',
			});
		} catch (error) {
			setDeleting(false);
			toast.toast({
				title: 'Error',
				description: 'An error occurred while deleting the alert',
			});
		}
	}

	async function scheduleAlert(id: string) {
		try {
			setScheduling(true);
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/alert/schedule?alert_id=${id}`, {
				method: 'GET',
				headers
			});
			setScheduling(false);
		} catch (error) {
			setScheduling(false);
			toast.toast({
				title: "Error",
				description: "Failed to schedule alert",
			});
		}
	}

	return (
		<div className="mb-4 border rounded-lg relative">
			<div className="relative h-28 p-4 pr-0 sm:pr-4 flex justify-between items-center">
				<div>
					<h3 className="text-m mb-1.5 font-semibold">{alert.name}</h3>
					<p className='text-sm'>
            Subnet ID: {alert.metadata?.subnet_id} | Price Cutoff: {alert.metadata?.price_cutoff}
					</p>
				</div>
				{!alert.persistent && (
					<span className='hidden sm:inline absolute bottom-3 right-4 text-gray-400'>
						Triggered alert
					</span>
				)}
				<SingleAlertDropdownMenu
					alert={alert}
					deleteAlert={deleteAlert}
					scheduleAlert={scheduleAlert}
				/>
				<div className='hidden sm:flex flex-col gap-2 self-start'>
					<Button variant="destructive" onClick={deleteAlert} className="text-xs">
						{deleting ? 'Deleting...' : 'Delete'}
					</Button>
					{alert.persistent && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className="text-xs px-3"
									variant="outline"
									onClick={() => scheduleAlert(alert._id)}
								>
									{scheduling ? 'Scheduling...' : 'Schedule'}
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right">Schedules an alert to be checked</TooltipContent>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	);
}
