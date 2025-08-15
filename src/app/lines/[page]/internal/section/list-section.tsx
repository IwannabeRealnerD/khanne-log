"use client";

import { FunctionComponent } from "react";

import { GlobalPagination } from "@/components/pagination";
import { GlobalLine } from "@/types/DatabaseScheme";

import { InternalComment } from "../comment";
import { InternalKeyPoints } from "../internal-key-points";
import { InternalOttBadge } from "../OttBadge";

import { InternalTitleSection } from "./title-section";

interface InternalListSectionProps {
  lineData: GlobalLine[];
  totalPageCount: number;
  currentPage: number;
}
export const InternalListSection: FunctionComponent<InternalListSectionProps> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-5">
        {props.lineData.map((item) => {
          return (
            <article key={`${item.id}`}>
              <p className="text-right text-xs text-gray-400">{new Date(item.added_date).toLocaleDateString("ko")}</p>
              <div className="rounded-xl border border-gray-300 p-3">
                <InternalTitleSection id={item.id} quote={item.quote} scene_description={item.scene_description} />
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
      <GlobalPagination currentPage={props.currentPage} totalPageCount={props.totalPageCount} />
    </div>
  );
};
