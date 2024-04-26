import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getApiKeys } from "@/lib/storage";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CreateAlertDialog = ({ setTriggerGetAlerts }: { setTriggerGetAlerts: (triggerGetAlerts: number) => void }) => {
	const [alertType, setAlertType] = useState('registration_fee');
	const [name, setName] = useState('');
	const [subnetId, setSubnetId] = useState('');
	const [priceCutoff, setPriceCutoff] = useState('');
	const [persistent, setPersistent] = useState(false);
	const [loading, setLoading] = useState(false);

	const { toast } = useToast();

	const handleSubmit = async () => {
		setLoading(true);
		const apiKeys = getApiKeys('admin');
		if (apiKeys.length === 0) {
			toast({
				title: "Error",
				description: "No API keys found",
			});
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/alert/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					"Taoinfra-Admin-Key": `${apiKeys[0].key}`,
				},
				body: JSON.stringify({
					alert_type: alertType,
					name: name,
					cron: '*/20 * * * *',
					persistent: persistent,
					metadata: {
						subnet_id: parseInt(subnetId),
						price_cutoff: parseFloat(priceCutoff),
					},
				}),
			});

			if (response.ok) {
				toast({
					title: "Success",
					description: "Alert created successfully",
				});
				setTriggerGetAlerts(Math.random());
			} else {
				toast({
					title: "Error",
					description: "Failed to create alert",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to create alert",
			});
		}
		setLoading(false);
	};

	return (
		<DialogContent className="mx-auto max-w-sm">
			<DialogHeader>
				<DialogTitle>Create Alert</DialogTitle>
			</DialogHeader>
			<div className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="name">Alert Name</Label>
					<Input
						id="name"
						type="text"
						placeholder="My Alert"
						required
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="subnetId">Subnet ID</Label>
					<Input
						id="subnetId"
						type="number"
						placeholder="1"
						required
						value={subnetId}
						onChange={e => setSubnetId(e.target.value)}
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="priceCutoff">Price Cutoff</Label>
					<Input
						id="priceCutoff"
						type="text"
						placeholder="0.5"
						required
						value={priceCutoff}
						onChange={e => setPriceCutoff(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<input
						id="persistent"
						type="checkbox"
						checked={persistent}
						onChange={e => setPersistent(e.target.checked)}
					/>
					<Label htmlFor="persistent">Persistent</Label>
				</div>
				<DialogClose>
					<Button type="button" onClick={handleSubmit} disabled={loading} aria-label="Close">
						{loading ? "Creating..." : "Create Alert"}
					</Button>
				</DialogClose>
			</div>
		</DialogContent>
	);
};

export default CreateAlertDialog;
