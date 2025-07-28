import { FunctionComponent } from "react";

import { RiMovieLine } from "react-icons/ri";
import { SiAppletv, SiHbo, SiNetflix } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { InferOutput } from "valibot";

import { GlobalOttServiceNameSchema } from "@/types/OttServiceName";

interface InternalOttBadgeProps {
  ottName: InferOutput<typeof GlobalOttServiceNameSchema>;
}

export const InternalOttBadge: FunctionComponent<InternalOttBadgeProps> = (props) => {
  switch (props.ottName) {
    case "HBO max":
      return <SiHbo className="text-2xl" />;
    case "Netflix":
      return <SiNetflix className="text-2xl text-red-500" />;
    case "Apple TV+":
      return <SiAppletv className="text-2xl" />;
    case "Disney Plus":
      return <TbBrandDisney className="text-2xl text-teal-400" />;
    case "Movie":
      return <RiMovieLine className="text-2xl" />;
    default:
      return props.ottName;
  }
};
