import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  target?: string;
  title?: string;
} & Pick<NextLinkProps, "href">;

export function Link({ children, className, ...rest }: LinkProps) {
  return (
    <NextLink
      className={twMerge("text-blue-600 hover:text-blue-800 text-small", className)}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
