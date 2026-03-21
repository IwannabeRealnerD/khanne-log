import type { FunctionComponent } from "react";
import type { Route } from "next";
import Link from "next/link";

interface NavItemProps {
  href: Route;
  label: string;
  description: string;
  disabled?: boolean;
}

export const GlobalNavItem: FunctionComponent<NavItemProps> = ({ href, label, description, disabled }) => {
  if (disabled) {
    return (
      <div className="relative rounded-md border border-border bg-bg-subtle px-6 py-5">
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
      className="group rounded-md border border-border bg-surface px-6 py-5 shadow-sm transition-all hover:border-border-accent hover:bg-bg-accent hover:shadow-md"
      href={href}
    >
      <p className="text-body font-medium text-fg group-hover:text-accent">{label}</p>
      <p className="mt-1 text-caption text-muted">{description}</p>
    </Link>
  );
};
