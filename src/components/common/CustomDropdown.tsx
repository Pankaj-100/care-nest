import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NavbarTypes } from './Header'
import Link from 'next/link'

export const NavbarDropdown = ({ isOpen, items }: { isOpen: boolean; items: NavbarTypes[] }) => {
    return (
        <DropdownMenu open={isOpen} modal={false}>
            <DropdownMenuTrigger />
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="min-w-[230px] rounded-2xl bg-white text-[var(--navy)] p-0 overflow-hidden shadow-xl border border-black/5"
            >
                {items.map((item, index) => {
                    const isFirst = index === 0
                    return (
                        <React.Fragment key={index}>
                            <DropdownMenuItem
                                asChild
                                className={`px-3 py-3 text-md font-semibold
                                    } cursor-pointer hover:bg-[var(--navy)]/5 focus:bg-[var(--navy)]/5`}
                            >
                                <Link href={item.link || '#'}>{item.title}</Link>
                            </DropdownMenuItem>

                            {index < items.length - 1 && (
                                <DropdownMenuSeparator className="mx-5 bg-[var(--navy)]/10" />
                            )}
                        </React.Fragment>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}