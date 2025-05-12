import React from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface ButtonType {
  children: React.ReactNode
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export const YellowButton = ({ children, disabled, className, onClick }: ButtonType) => {


  const classes = cn(
    "cursor-pointer rounded-3xl  bg-[var(--yellow)] px-4 py-5 text-xs text-[var(--navy)] font-semibold hover:bg-[var(--yellow-light)] transition-all duration-300 ease-in-out",
    className
  );
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
}
export const TransparentButton = ({ children, disabled, className, onClick }: ButtonType) => {

  const classes = cn(
    "cursor-pointer rounded-3xl border-2 border-[var(--navy)] bg-transparent px-4 py-5 text-xs text-[var(--navy)] font-semibold hover:bg-[var(--navy)] hover:text-white transition-all duration-300 ease-in-out",
    className
  );
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  )
}

