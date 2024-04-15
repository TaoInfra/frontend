"use client"
import React, { useState } from 'react';

const APIComponent = () => {
	const [prompt, setPrompt] = useState('');
	const [urls, setUrls] = useState(['']);
	const [datas, setDatas] = useState([{ source: '', context: '' }]);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) => {
		if (type === 'url') {
			const newUrls = [...urls];
			newUrls[index] = e.target.value;
			setUrls(newUrls);
		} else if (type === 'source' || type === 'context') {
			const newDatas = [...datas];
			newDatas[index] = { ...newDatas[index], [type]: e.target.value };
			setDatas(newDatas);
		} else {
			setPrompt(e.target.value);
		}
	};

	const addUrl = () => {
		setUrls([...urls, '']);
	};

	const addData = () => {
		setDatas([...datas, { source: '', context: '' }]);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setResponse(null);
		try {
			const res = await fetch('https://api.taoinfra.com/subnet/20/mining/util/context_and_citations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ urls, prompt, datas }),
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
		<div className="max-w-4xl p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-xl font-bold text-gray-900">Get Context and Citations for Subnet 20</h2>
			<p className="text-gray-600">This endpoint extracts relevant context and citations based on a given prompt, a list of URLs, and a list of datas.</p>

			<form onSubmit={handleSubmit} className="mt-4">
				<div className="mb-4">
					<label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt</label>
					<input
						type="text"
						id="prompt"
						value={prompt}
						onChange={(e) => handleInputChange(e, 0, 'prompt')}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						placeholder="Enter your prompt"
					/>
				</div>
				{urls.map((url, index) => (
					<div key={index} className="mb-4">
						<label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700">URL {index + 1}</label>
						<input
							type="text"
							id={`url-${index}`}
							value={url}
							onChange={(e) => handleInputChange(e, index, 'url')}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Enter URL"
						/>
					</div>
				))}
				<button type="button" onClick={addUrl} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add URL</button>
				{datas.map((data, index) => (
					<div key={index} className="mb-4">
						<label htmlFor={`source-${index}`} className="block text-sm font-medium text-gray-700">Data {index + 1}</label>
						<input
							type="text"
							id={`source-${index}`}
							value={data.source}
							onChange={(e) => handleInputChange(e, index, 'source')}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Enter source"
						/>
						<textarea
							id={`context-${index}`}
							value={data.context}
							onChange={(e) => handleInputChange(e as any, index, 'context')}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							placeholder="Enter context"
						/>
					</div>
				))}
				<button type="button" onClick={addData} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Add Data</button>
				<div>

					<button type="submit" className="px-4 py-2 bg-black text-white rounded">Get Context and Citations</button>
				</div>
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
