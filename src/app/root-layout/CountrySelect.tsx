"use client";

import { Link, usePathname } from "@/i18n/navigation";

export const CountrySelect = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-2">
      <Link href={pathname} locale={"ko"}>
        <p>ko</p>
      </Link>
      <Link href={pathname} locale={"en"}>
        <p>en</p>
      </Link>
    </div>
  );
};
