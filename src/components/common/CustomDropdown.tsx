import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { NavbarTypes } from './Header'
import Link from 'next/link'

export const NavbarDropdown = ({ isOpen, items }: { isOpen: boolean, items: NavbarTypes[] }) => {
    return (
        <DropdownMenu open={isOpen} modal={false}>
            <DropdownMenuTrigger />
            <DropdownMenuContent>
                {items.map((item, index) => (
                    <DropdownMenuItem key={index} className='text-sm  text-gray-500 hover:text-[var(--navy)] cursor-pointer'>
                        <Link href={item.link || '#'}>
                            {item.title}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}