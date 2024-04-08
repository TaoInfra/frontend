'use client'
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { getApiKeys } from '@/lib/storage';
import { ApiKeyData } from '@/types';
import BadgeWithCopy from '@/components/Landing/JoinGlobal';
import { useState, useEffect } from 'react';

const SubtensorCard = () => {

	const [apiKeys, setApiKeys] = useState<ApiKeyData[]>([]);

	useEffect(() => {
		const keys = getApiKeys('api');
		setApiKeys(keys);
	}, []);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Subtensor</CardTitle>
				<CardDescription>You can use the following dedicated subtensor for up to 10 mines with unlimited requests</CardDescription>
			</CardHeader>
			<CardContent>
				{apiKeys.map((key: ApiKeyData) => (
					<div key={key._id}>
						<BadgeWithCopy subtensor={"ws://subtensor.ws/" + key.key} animate={false}/>
					</div>
				))}
			</CardContent>
     
		</Card>
	);
}

export default SubtensorCard;