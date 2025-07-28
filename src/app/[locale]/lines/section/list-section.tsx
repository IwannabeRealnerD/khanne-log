"use client";

import { FunctionComponent } from "react";
import { useSearchParams } from "next/navigation";

import { GlobalPagination } from "@/components/pagination";
import { GLOBAL_PAGE_LENGTH } from "@/constants/page-length";
import { GlobalLineResponse } from "@/types/database-response";

import { InternalComment } from "../internal/comment";
import { InternalKeyPoints } from "../internal/internal-key-points";
import { InternalOttBadge } from "../internal/OttBadge";

import { TitleSection } from "./title-section";

interface LineSectionProps {
  databaseResponse: GlobalLineResponse;
}
export const ListSection: FunctionComponent<LineSectionProps> = ({ databaseResponse }) => {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-5">
        {databaseResponse.data.slice((page - 1) * GLOBAL_PAGE_LENGTH, page * GLOBAL_PAGE_LENGTH).map((item) => {
          return (
            <article key={`${item.id}`}>
              <p className="text-right text-xs text-gray-400">{new Date(item.added_date).toLocaleDateString("ko")}</p>
              <div className="rounded-xl border border-gray-300 p-3">
                <TitleSection id={item.id} quote={item.quote} scene_description={item.scene_description} />
                <div className="mb-5 flex flex-col justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="text-base font-semibold">{item.title}</p>
                      <span className="text-sm font-normal">{item.when}</span>
                    </div>
                    <InternalOttBadge ottName={item.from} />
                  </div>

                  <InternalKeyPoints keyPoints={item.key_points} />
                </div>
                <InternalComment comment={item.comment} id={item.id} />
              </div>
            </article>
          );
        })}
      </div>
      <GlobalPagination currentPage={page} totalDataCount={databaseResponse.data.length} />
    </div>
  );
};
