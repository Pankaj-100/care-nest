"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonType {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const YellowButton = ({
  children,
  disabled,
  className,
  onClick,
}: ButtonType) => {
  const classes = cn(
    "hover:cursor-pointer rounded-3xl  bg-[var(--yellow)] px-4 py-5 text-xs text-[var(--navy)] font-semibold hover:bg-[var(--yellow-light)] transition-all duration-300 ease-in-out ",
    className
  );
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};

interface Props {
  path: string;
  title: string;
  className?: string;
  ButtonCompo?: React.JSX.ElementType;
}

export const RedirectButton = ({
  path,
  title,
  className,
  ButtonCompo,
}: Props) => {
  const router = useRouter();

  const RenderedButton = ButtonCompo || YellowButton;

  return (
    <RenderedButton className={className} onClick={() => router.push(path)}>
      {title}
    </RenderedButton>
  );
};

export const TransparentButton = ({
  children,
  disabled,
  className,
  onClick,
}: ButtonType) => {
  const classes = cn(
    "cursor-pointer rounded-3xl border-2 border-[var(--navy)] bg-transparent px-4 py-5 text-xs text-[var(--navy)] font-semibold hover:bg-[var(--navy)] hover:text-white transition-all duration-300 ease-in-out",
    className
  );
  return (
    <Button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
};
