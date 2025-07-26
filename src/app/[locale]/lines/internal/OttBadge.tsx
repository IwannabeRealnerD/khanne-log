import { FunctionComponent } from "react";

import { InferOutput } from "valibot";

import { GlobalOttServiceNameSchema } from "@/types/OttServiceName";

interface InternalOttBadgeProps {
  ottName: InferOutput<typeof GlobalOttServiceNameSchema>;
}

export const InternalOttBadge: FunctionComponent<InternalOttBadgeProps> = (props) => {
  return <div className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-500">{props.ottName}</div>;
};
