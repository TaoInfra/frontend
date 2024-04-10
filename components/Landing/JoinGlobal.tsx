'use client'

import React, { useState, useRef } from 'react';
import { ClipboardCopyIcon, CheckCircledIcon } from '@radix-ui/react-icons';

const BadgeWithCopy = ({subtensor, animate}: {subtensor: string | null, animate: boolean}) => {
	if (!subtensor) {
		subtensor = 'public.subtensor.ws'
	}
	const [copySuccess, setCopySuccess] = useState(false);
	const badgeTextRef = useRef(null);

	const copyToClipboard = async () => {
		const badgeText = subtensor;
		try {
			await navigator.clipboard.writeText(badgeText || '');
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
		} catch (err) {
			console.error('Failed to copy!', err);
		}
	};

	return (
		<div className=" relative">
			<label htmlFor="badgeText" className="sr-only">Copy Badge Text</label>
			<input 
				ref={badgeTextRef}
				id="badgeText" 
				type="text" 
				className={`inline-flex h-full ${animate ? "animate-background-shine " : ""}cursor-pointer items-center justify-center rounded-full border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1 text-gray-300 col-span-6 bg-gray-50 border border-gray-300 text-white text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
				value={subtensor} 
				disabled 
				readOnly
			/>
			<button 
				onClick={copyToClipboard} 
				className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
			>
				{copySuccess ? (
					<span className="inline-flex items-center">
						<CheckCircledIcon className="w-3 h-3 text-black dark:text-white me-1.5" />
						<span className="text-xs font-bold text-black dark:text-white">Copied</span>
					</span>
				) : (
					<span className="inline-flex items-center">
						<ClipboardCopyIcon className="w-3 h-3 me-1.5" />
						<span className="text-xs font-semibold">Copy</span>
					</span>
				)}
			</button>
		</div>
	);
};

export default BadgeWithCopy;
