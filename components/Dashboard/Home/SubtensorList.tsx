'use client'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { getApiKeys } from '@/lib/storage';
import { ApiKeyData } from '@/types';
import BadgeWithCopy from '@/components/Landing/JoinGlobal';

const SubtensorCard = () => {

	const apiKeys = getApiKeys('api');

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