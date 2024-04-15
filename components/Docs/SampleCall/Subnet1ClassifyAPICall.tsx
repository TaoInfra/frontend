"use client"
import React, { useState } from 'react';

const APIComponent = () => {
	const [prompt, setPrompt] = useState('');
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrompt(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setResponse(null);
		try {
			const res = await fetch('https://api.taoinfra.com/subnet/1/mining/util/classify_prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ prompt }),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.detail.map((d: { msg: string }) => d.msg).join(', '));
			}
			setResponse(data);
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="max-w-4xl  p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-bold text-gray-900">Classify Prompt for Subnet 1</h2>
			<p className="text-gray-600">This endpoint classifies a prompt into categories: &apos;date&apos;, &apos;qa&apos;, or &apos;math&apos;.</p>

			<form onSubmit={handleSubmit} className="mt-4">
				<div className="mb-4">
					<label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
					<input
						type="text"
						id="prompt"
						value={prompt}
						onChange={handleInputChange}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Enter your prompt"
					/>
				</div>
				<button type="submit" className="px-4 py-2 bg-black text-white rounded">Classify Prompt</button>
			</form>

			{response && (
				<div className="mt-4 p-3 bg-green-100 rounded">
					<h3 className="text-lg font-semibold text-gray-800">Response</h3>
					<pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
				</div>
			)}

			{error && (
				<div className="mt-4 p-3 bg-red-100 rounded">
					<h3 className="text-lg font-semibold text-gray-800">Error</h3>
					<p className="text-sm">{error}</p>
				</div>
			)}
		</div>
	);
};

export default APIComponent;
