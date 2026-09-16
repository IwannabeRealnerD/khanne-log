import type { FunctionComponent } from "react";
import type { Route } from "next";
import Link from "next/link";

interface NavItemProps {
  href: Route;
  label: string;
  description: string;
  disabled?: boolean;
}

export const NavItem: FunctionComponent<NavItemProps> = ({ href, label, description, disabled }) => {
  if (disabled) {
    return (
      <div className="relative rounded-md border border-edge bg-bg-subtle px-6 py-5">
        <span className="absolute top-3 right-3 rounded-full bg-bg-muted px-2 py-0.5 text-[10px] text-subtle">
          coming soon
        </span>
        <p className="text-body font-medium text-subtle">{label}</p>
        <p className="mt-1 text-caption text-subtle">{description}</p>
      </div>
    );
  }

  return (
    <Link
      className="rounded-md border border-edge bg-surface px-6 py-5 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out hover:border-edge-hover hover:bg-surface-hover hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-px active:bg-bg-muted active:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
      href={href}
    >
      <p className="text-body font-medium text-fg">{label}</p>
      <p className="mt-1 text-caption text-muted">{description}</p>
    </Link>
  );
};
