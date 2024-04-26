import React from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { AlertData } from '@/types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const SingleAlertDropdownMenu = ({ alert, deleteAlert, scheduleAlert }: { alert: AlertData, deleteAlert: () => void, scheduleAlert: (id: string) => void }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="self-start sm:hidden"
				>
					<DotsVerticalIcon className="w-5 h-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{alert.persistent && (<>
					<DropdownMenuItem onClick={() => scheduleAlert(alert._id)}>
            Schedule
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</>)}
				<DropdownMenuItem className='text-red-500' onClick={deleteAlert}>
          Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}