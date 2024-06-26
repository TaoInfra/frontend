'use client'

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Home, Network } from 'lucide-react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarItem {
  children: Record<string, SidebarItem> | null;
  link: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const sidebarItems: Record<string, SidebarItem> = {
	"Get Started": {
		"children": null,
		"link": "/",
		"icon": Home
	},
	"Subnets" : {
		"children": {
			"1: Text Prompting": {
				"children": null,
				"link": "/subnet/1",
				"icon": Network
			},
			"20: BitAgent": {
				"children": null,
				"link": "/subnet/20",
				"icon": Network
			}
		},
		"link": "/subnets",
		"icon": Network
	}
};

const SidebarItem: React.FC<{ item: SidebarItem, path?: string }> = ({ item, path = '' }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const storedIsOpen = localStorage.getItem(`sidebarCollapsed_${path}`);
		if (storedIsOpen !== null) {
			setIsOpen(JSON.parse(storedIsOpen));
		}
	}, [path]);

	const toggleCollapse = () => {
		const newIsOpen = !isOpen;
		setIsOpen(newIsOpen);
		localStorage.setItem(`sidebarCollapsed_${path}`, JSON.stringify(newIsOpen));
	};

	if (item.children) {
		return (
			<Collapsible open={isOpen} onOpenChange={toggleCollapse}>
				<CollapsibleTrigger className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
					<div className="flex items-center gap-2">
						{item.icon && <item.icon className="h-4 w-4" />}
						{path.split('/').pop()}
					</div>
					{isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
				</CollapsibleTrigger>
				<CollapsibleContent className='ml-4'>
					{Object.entries(item.children).map(([key, child]) => (
						<SidebarItem key={key} item={child} path={`${path}/${key}`} />
					))}
				</CollapsibleContent>
			</Collapsible>
		);
	}

	return (
		<Link href={`/docs${item.link}`} className="block rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
			{path.split('/').pop()}
		</Link>
	);
};

export const DocsSidebarItems = () => (
	<div className="flex h-full max-h-screen flex-col gap-2 overflow-y-auto">
		<div className="flex-1">
			<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
				{Object.entries(sidebarItems).map(([key, item]) => (
					<SidebarItem key={key} item={item} path={key}/>
				))}
			</nav>
		</div>
	</div>
);