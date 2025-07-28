"use client";

import { useState } from "react";

import { GlobalTop } from "@/components/Top";

interface IsrInfoSectionProps {
  fetchedAt: string;
  dataLength: number;
}
export const PageInfoSection = (props: IsrInfoSectionProps) => {
  const [isIsrSectionOpened, setIsIsrSectionOpened] = useState(false);

  return (
    <button className="flex flex-col items-start" onClick={() => setIsIsrSectionOpened((prev) => !prev)}>
      <GlobalTop>The lines I like</GlobalTop>
      {isIsrSectionOpened && (
        <div className="mt-3 flex flex-col items-start gap-2 text-xs text-gray-500">
          <p>updated at (UTC) - {new Date(props.fetchedAt).toUTCString()}</p>
          <p>updated at (KST) - {new Date(props.fetchedAt).toLocaleString("ko", { timeZone: "Asia/Seoul" })}</p>
          <p>total items: {props.dataLength}</p>
        </div>
      )}
    </button>
  );
};
